import unittest

from validate_docs import missing_sections


class DocsTests(unittest.TestCase):
    def test_index_has_required_sections(self):
        from pathlib import Path
        self.assertEqual(missing_sections(Path("docs/INDEX.md").read_text()), [])


if __name__ == "__main__":
    unittest.main()
