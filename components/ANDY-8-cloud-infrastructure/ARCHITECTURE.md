# Architecture

Infrastructure is separated into environment configuration, reusable modules, and provider resources. Development and production must have separate state and credentials. The initial Terraform contract exposes only an environment variable so provider-specific resources are not invented before deployment, retention, and security choices are confirmed.
