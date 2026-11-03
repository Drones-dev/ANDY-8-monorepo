#pragma once

#include <array>
#include <cstddef>
#include <cstdint>
#include <optional>

namespace andy8::routing {

using NodeId = std::uint8_t;
using SequenceNumber = std::uint32_t;
using TimeMs = std::uint32_t;

constexpr std::size_t kMaxNeighbors = 16;
constexpr std::size_t kMaxRoutes = 32;
constexpr std::size_t kMaxSeenPackets = 64;

struct PacketId {
  NodeId source{0};
  SequenceNumber sequence{0};
  friend constexpr bool operator==(PacketId a, PacketId b) {
    return a.source == b.source && a.sequence == b.sequence;
  }
};

struct Neighbor {
  NodeId node{0};
  std::uint16_t linkCost{1};
  TimeMs lastSeen{0};
  std::uint8_t failedForwards{0};
  bool active{false};
};

struct Route {
  NodeId destination{0};
  NodeId nextHop{0};
  std::uint16_t metric{0};
  SequenceNumber sequence{0};
  TimeMs learnedAt{0};
  TimeMs expiresAt{0};
  bool valid{false};
};

struct RouteAdvertisement {
  NodeId destination{0};
  std::uint16_t metric{0};
  SequenceNumber sequence{0};
  TimeMs lifetimeMs{0};
};

enum class Action { DeliverLocal, Forward, Drop };

enum class DropReason {
  None,
  Duplicate,
  NoRoute,
  TtlExpired,
  InactiveNextHop,
  InvalidPacket,
};

struct ForwardDecision {
  Action action{Action::Drop};
  DropReason reason{DropReason::None};
  NodeId nextHop{0};
  std::uint8_t nextTtl{0};
};

struct RoutingConfig {
  TimeMs neighborTimeoutMs{5000};
  TimeMs defaultRouteLifetimeMs{10000};
  std::uint8_t failureThreshold{3};
};

struct RoutingCounters {
  std::uint32_t delivered{0};
  std::uint32_t forwarded{0};
  std::uint32_t duplicatesDropped{0};
  std::uint32_t noRouteDropped{0};
  std::uint32_t ttlDropped{0};
  std::uint32_t failedForwards{0};
};

class RoutingEngine {
 public:
  explicit RoutingEngine(NodeId localNode, RoutingConfig config = {});

  NodeId localNode() const { return localNode_; }

  // Refresh or create a direct neighbor. A direct route is installed with
  // metric equal to the link cost.
  bool observeNeighbor(NodeId node, std::uint16_t linkCost, TimeMs now);

  // Mark expired neighbors and routes. Call this from the host or firmware
  // scheduler; no thread or heap allocation is required.
  void tick(TimeMs now);

  // Learn a destination through the neighbor that sent the advertisement.
  // Fresher sequence numbers win; equal sequence numbers use lower metric and
  // then lower next-hop ID as deterministic tie breakers.
  bool learnRoute(NodeId fromNeighbor, const RouteAdvertisement& advertisement,
                  TimeMs now);

  // Record the result of a forwarding attempt. Repeated failures invalidate
  // routes through that relay, allowing a later decision to use an alternate.
  void noteForwardResult(NodeId nextHop, bool success, TimeMs now);

  ForwardDecision decide(NodeId destination, PacketId packet, std::uint8_t ttl,
                         TimeMs now);

  std::optional<Route> routeTo(NodeId destination, TimeMs now) const;
  std::optional<Neighbor> neighbor(NodeId node) const;
  const RoutingCounters& counters() const { return counters_; }

 private:
  struct SeenPacket {
    PacketId id{};
    TimeMs seenAt{0};
    bool occupied{false};
  };

  static bool timeReached(TimeMs now, TimeMs deadline);
  Neighbor* findNeighbor(NodeId node);
  const Neighbor* findNeighbor(NodeId node) const;
  Route* findRoute(NodeId destination);
  const Route* findRoute(NodeId destination) const;
  Route* findRouteVia(NodeId destination, NodeId nextHop);
  Route* allocateRoute(NodeId destination);
  bool rememberPacket(PacketId packet, TimeMs now);
  void invalidateRoutesVia(NodeId nextHop);

  NodeId localNode_;
  RoutingConfig config_;
  std::array<Neighbor, kMaxNeighbors> neighbors_{};
  std::array<Route, kMaxRoutes> routes_{};
  std::array<SeenPacket, kMaxSeenPackets> seen_{};
  std::size_t nextSeenSlot_{0};
  RoutingCounters counters_{};
};

}  // namespace andy8::routing
