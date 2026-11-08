terraform {
  required_version = ">= 1.5.0"
}

variable "environment" {
  type    = string
  default = "development"
}

output "environment" {
  value = var.environment
}

# Provider-specific databases, queues, storage, and networking are added only
# after the hosting provider and retention/security requirements are approved.
