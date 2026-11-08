# Architecture

The mobile application shares event and command contracts with the desktop ground station but keeps a smaller field-operator state model. Connectivity and offline state are explicit, selected-node context is stable, and command actions are delegated to the command center rather than implemented in the UI.
