import unittest

from andy8_commands.commands import CommandCenter, CommandError


class CommandTests(unittest.TestCase):
    def test_create_and_acknowledge(self):
        center = CommandCenter()
        command = center.create("operator-1", ["drone-1", "drone-2"], "hold")
        self.assertEqual(center.acknowledge(command.command_id), command)

    def test_unsupported_action_is_rejected(self):
        with self.assertRaises(CommandError):
            CommandCenter().create("operator-1", ["drone-1"], "disable_safety")


if __name__ == "__main__":
    unittest.main()
