# Architecture

Analysis consumes immutable exported records from the test lab and telemetry server. `summarize` produces reproducible metrics while preserving raw data outside the analysis layer. Plotting and report generation can be added without changing the measurement calculations.
