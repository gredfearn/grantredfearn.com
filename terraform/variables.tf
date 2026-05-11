variable "domain_name" {
  description = "The domain name for the website (e.g., grantredfearn.com)"
  type        = string
}

variable "bucket_name" {
  description = "The name of the S3 bucket (defaults to domain_name)"
  type        = string
  default     = ""
}

variable "create_dns_records" {
  description = "Whether to create Route53 DNS records (requires hosted zone)"
  type        = bool
  default     = false
}

variable "route53_zone_id" {
  description = "Route53 hosted zone ID (required if create_dns_records is true)"
  type        = string
  default     = ""
}

variable "enable_https" {
  description = "Whether to enable HTTPS with ACM certificate"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}

variable "price_class" {
  description = "CloudFront price class (PriceClass_100, PriceClass_200, or PriceClass_All)"
  type        = string
  default     = "PriceClass_100"
}
