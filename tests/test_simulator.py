import unittest

from andy8_simulation.simulator import Link, Simulation


class SimulationTests(unittest.TestCase):
    def test_perfect_link_delivers_everything(self):
        sim = Simulation()
        sim.add_link(Link("drone-3", "drone-2", latency_ms=40))
        result = sim.transmit("drone-3", "drone-2", 10)
        self.assertEqual((result.delivered, result.lost, result.average_latency_ms), (10, 0, 40))

    def test_failed_link_delivers_nothing(self):
        sim = Simulation()
        sim.add_link(Link("drone-2", "drone-1", active=False))
        self.assertEqual(sim.transmit("drone-2", "drone-1", 5).delivered, 0)


if __name__ == "__main__":
    unittest.main()
