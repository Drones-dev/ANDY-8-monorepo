#include "andy8/routing.hpp"

#include <cstdlib>
#include <iostream>

using namespace andy8::routing;

namespace {

void expect(bool condition, const char* message) {
  if (!condition) {
    std::cerr << "FAIL: " << message << '\n';
    std::exit(EXIT_FAILURE);
  }
}

void testDirectAndMultiHopRoute() {
  RoutingEngine node0(0);
  expect(node0.observeNeighbor(1, 1, 0), "observe direct neighbor");
  expect(node0.learnRoute(1, {3, 2, 10, 1000}, 10), "learn route through relay");
  const auto route = node0.routeTo(3, 20);
  expect(route && route->nextHop == 1 && route->metric == 3,
         "select learned multi-hop route");

  const auto decision = node0.decide(3, {9, 1}, 4, 20);
  expect(decision.action == Action::Forward && decision.nextHop == 1 &&
             decision.nextTtl == 3,
         "forward with decremented ttl");
}

void testDuplicateAndLocalDelivery() {
  RoutingEngine node0(0);
  const auto first = node0.decide(0, {2, 44}, 0, 0);
  expect(first.action == Action::DeliverLocal, "deliver local packet");
  const auto duplicate = node0.decide(0, {2, 44}, 0, 1);
  expect(duplicate.action == Action::Drop &&
             duplicate.reason == DropReason::Duplicate,
         "drop duplicate packet");
}

void testNoRouteAndTtl() {
  RoutingEngine node0(0);
  const auto noRoute = node0.decide(3, {2, 1}, 4, 0);
  expect(noRoute.reason == DropReason::NoRoute, "drop when route is absent");
  node0.observeNeighbor(1, 1, 0);
  node0.learnRoute(1, {3, 1, 1, 1000}, 0);
  const auto expired = node0.decide(3, {2, 2}, 0, 1);
  expect(expired.reason == DropReason::TtlExpired, "drop expired ttl");
}

void testFreshnessAndDeterministicTieBreak() {
  RoutingEngine node0(0);
  node0.observeNeighbor(1, 2, 0);
  node0.observeNeighbor(2, 1, 0);
  expect(node0.learnRoute(1, {3, 2, 4, 1000}, 1), "learn first route");
  expect(node0.learnRoute(2, {3, 2, 4, 1000}, 2), "learn alternate route");
  auto route = node0.routeTo(3, 3);
  expect(route && route->nextHop == 2, "select lower metric route");
  expect(node0.learnRoute(1, {3, 1, 5, 1000}, 4), "select fresher route");
  route = node0.routeTo(3, 5);
  expect(route && route->nextHop == 1, "fresher route wins");
}

void testFailureInvalidatesAndRecovery() {
  RoutingConfig config;
  config.failureThreshold = 2;
  RoutingEngine node0(0, config);
  node0.observeNeighbor(1, 1, 0);
  node0.observeNeighbor(2, 1, 0);
  node0.learnRoute(1, {3, 2, 4, 1000}, 0);
  node0.learnRoute(2, {3, 3, 4, 1000}, 0);
  expect(node0.routeTo(3, 1)->nextHop == 1, "initial best relay");
  node0.noteForwardResult(1, false, 1);
  node0.noteForwardResult(1, false, 2);
  const auto recovered = node0.routeTo(3, 3);
  expect(recovered && recovered->nextHop == 2, "reroute after relay failure");
  node0.observeNeighbor(1, 1, 4);
  expect(node0.neighbor(1)->active, "failed relay can recover");
}

void testNeighborTimeout() {
  RoutingConfig config;
  config.neighborTimeoutMs = 100;
  RoutingEngine node0(0, config);
  node0.observeNeighbor(1, 1, 0);
  node0.learnRoute(1, {3, 1, 1, 1000}, 0);
  node0.tick(101);
  expect(!node0.neighbor(1), "expire silent neighbor");
  expect(!node0.routeTo(3, 101), "remove route through expired neighbor");
}

}  // namespace

int main() {
  testDirectAndMultiHopRoute();
  testDuplicateAndLocalDelivery();
  testNoRouteAndTtl();
  testFreshnessAndDeterministicTieBreak();
  testFailureInvalidatesAndRecovery();
  testNeighborTimeout();
  std::cout << "All routing tests passed\n";
}
