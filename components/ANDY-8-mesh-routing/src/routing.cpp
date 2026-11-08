#include "andy8/routing.hpp"

#include <algorithm>
#include <limits>

namespace andy8::routing {
namespace {

constexpr std::uint16_t kInfinity = std::numeric_limits<std::uint16_t>::max();

std::uint16_t addCost(std::uint16_t left, std::uint16_t right) {
  if (left == kInfinity || right > kInfinity - left) return kInfinity;
  return static_cast<std::uint16_t>(left + right);
}

bool fresherOrBetter(const Route& candidate, const Route& current) {
  if (!current.valid) return true;
  if (candidate.sequence != current.sequence)
    return candidate.sequence > current.sequence;
  if (candidate.metric != current.metric)
    return candidate.metric < current.metric;
  return candidate.nextHop < current.nextHop;
}

}  // namespace

RoutingEngine::RoutingEngine(NodeId localNode, RoutingConfig config)
    : localNode_(localNode), config_(config) {}

bool RoutingEngine::timeReached(TimeMs now, TimeMs deadline) {
  return static_cast<std::int32_t>(now - deadline) >= 0;
}

Neighbor* RoutingEngine::findNeighbor(NodeId node) {
  for (auto& entry : neighbors_)
    if (entry.active && entry.node == node) return &entry;
  return nullptr;
}

const Neighbor* RoutingEngine::findNeighbor(NodeId node) const {
  for (const auto& entry : neighbors_)
    if (entry.active && entry.node == node) return &entry;
  return nullptr;
}

Route* RoutingEngine::findRoute(NodeId destination) {
  for (auto& route : routes_)
    if (route.valid && route.destination == destination) return &route;
  return nullptr;
}

const Route* RoutingEngine::findRoute(NodeId destination) const {
  for (const auto& route : routes_)
    if (route.valid && route.destination == destination) return &route;
  return nullptr;
}

Route* RoutingEngine::findRouteVia(NodeId destination, NodeId nextHop) {
  for (auto& route : routes_)
    if (route.valid && route.destination == destination &&
        route.nextHop == nextHop)
      return &route;
  return nullptr;
}

Route* RoutingEngine::allocateRoute(NodeId destination) {
  for (auto& route : routes_) {
    if (!route.valid) {
      route = {};
      route.destination = destination;
      return &route;
    }
  }
  // Evict the oldest route when the bounded table is full.
  auto it = std::min_element(routes_.begin(), routes_.end(),
                             [](const Route& a, const Route& b) {
                               return a.learnedAt < b.learnedAt;
                             });
  *it = {};
  it->destination = destination;
  return &*it;
}

bool RoutingEngine::observeNeighbor(NodeId node, std::uint16_t linkCost,
                                    TimeMs now) {
  if (node == localNode_ || linkCost == 0 || linkCost == kInfinity)
    return false;

  Neighbor* entry = findNeighbor(node);
  if (!entry) {
    for (auto& candidate : neighbors_) {
      if (!candidate.active) {
        entry = &candidate;
        *entry = {};
        entry->node = node;
        entry->active = true;
        break;
      }
    }
  }
  if (!entry) return false;

  entry->linkCost = linkCost;
  entry->lastSeen = now;
  entry->failedForwards = 0;
  entry->active = true;

  Route* direct = findRouteVia(node, node);
  if (!direct) direct = allocateRoute(node);
  Route candidate{node, node, linkCost, 0, now,
                  static_cast<TimeMs>(now + config_.defaultRouteLifetimeMs),
                  true};
  if (fresherOrBetter(candidate, *direct) || direct->nextHop == node) {
    *direct = candidate;
  }
  return true;
}

void RoutingEngine::tick(TimeMs now) {
  for (auto& neighbor : neighbors_) {
    if (neighbor.active && timeReached(now, neighbor.lastSeen + config_.neighborTimeoutMs)) {
      neighbor.active = false;
      invalidateRoutesVia(neighbor.node);
    }
  }
  for (auto& route : routes_) {
    if (route.valid && timeReached(now, route.expiresAt)) route.valid = false;
  }
  for (auto& seen : seen_) {
    if (seen.occupied && timeReached(now, seen.seenAt + config_.defaultRouteLifetimeMs))
      seen.occupied = false;
  }
}

bool RoutingEngine::learnRoute(NodeId fromNeighbor,
                               const RouteAdvertisement& advertisement,
                               TimeMs now) {
  const Neighbor* neighborEntry = findNeighbor(fromNeighbor);
  if (!neighborEntry || advertisement.destination == localNode_ ||
      advertisement.destination == fromNeighbor || advertisement.metric == kInfinity)
    return false;

  const std::uint16_t metric = addCost(neighborEntry->linkCost, advertisement.metric);
  if (metric == kInfinity) return false;
  Route candidate{advertisement.destination, fromNeighbor, metric,
                  advertisement.sequence, now,
                  static_cast<TimeMs>(now + (advertisement.lifetimeMs == 0
                                                   ? config_.defaultRouteLifetimeMs
                                                   : advertisement.lifetimeMs)),
                  true};
  Route* current = findRouteVia(candidate.destination, fromNeighbor);
  if (!current) current = allocateRoute(candidate.destination);
  if (current->valid && !fresherOrBetter(candidate, *current)) return false;
  *current = candidate;
  return true;
}

void RoutingEngine::invalidateRoutesVia(NodeId nextHop) {
  for (auto& route : routes_)
    if (route.valid && route.nextHop == nextHop) route.valid = false;
}

void RoutingEngine::noteForwardResult(NodeId nextHop, bool success, TimeMs now) {
  Neighbor* entry = findNeighbor(nextHop);
  if (!entry) return;
  if (success) {
    entry->failedForwards = 0;
    entry->lastSeen = now;
    return;
  }
  ++counters_.failedForwards;
  if (entry->failedForwards < std::numeric_limits<std::uint8_t>::max())
    ++entry->failedForwards;
  if (entry->failedForwards >= config_.failureThreshold)
    invalidateRoutesVia(nextHop);
}

bool RoutingEngine::rememberPacket(PacketId packet, TimeMs now) {
  for (const auto& seen : seen_)
    if (seen.occupied && seen.id == packet) return false;
  seen_[nextSeenSlot_] = {packet, now, true};
  nextSeenSlot_ = (nextSeenSlot_ + 1) % seen_.size();
  return true;
}

ForwardDecision RoutingEngine::decide(NodeId destination, PacketId packet,
                                      std::uint8_t ttl, TimeMs now) {
  tick(now);
  if (packet.source == localNode_ && packet.sequence == 0)
    return {Action::Drop, DropReason::InvalidPacket, 0, ttl};
  if (!rememberPacket(packet, now)) {
    ++counters_.duplicatesDropped;
    return {Action::Drop, DropReason::Duplicate, 0, ttl};
  }
  if (destination == localNode_) {
    ++counters_.delivered;
    return {Action::DeliverLocal, DropReason::None, localNode_, ttl};
  }
  if (ttl == 0) {
    ++counters_.ttlDropped;
    return {Action::Drop, DropReason::TtlExpired, 0, ttl};
  }
  const auto route = routeTo(destination, now);
  if (!route) {
    ++counters_.noRouteDropped;
    return {Action::Drop, DropReason::NoRoute, 0, ttl};
  }
  if (!findNeighbor(route->nextHop)) {
    ++counters_.noRouteDropped;
    return {Action::Drop, DropReason::InactiveNextHop, 0, ttl};
  }
  ++counters_.forwarded;
  return {Action::Forward, DropReason::None, route->nextHop,
          static_cast<std::uint8_t>(ttl - 1)};
}

std::optional<Route> RoutingEngine::routeTo(NodeId destination, TimeMs now) const {
  const Route* best = nullptr;
  for (const auto& route : routes_) {
    if (!route.valid || route.destination != destination ||
        timeReached(now, route.expiresAt) || !findNeighbor(route.nextHop))
      continue;
    if (!best || fresherOrBetter(route, *best)) best = &route;
  }
  if (!best) return std::nullopt;
  return *best;
}

std::optional<Neighbor> RoutingEngine::neighbor(NodeId node) const {
  const Neighbor* entry = findNeighbor(node);
  if (!entry) return std::nullopt;
  return *entry;
}

}  // namespace andy8::routing
