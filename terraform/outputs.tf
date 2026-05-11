output "bucket_name" {
  description = "The name of the S3 bucket"
  value       = aws_s3_bucket.website.id
}

output "bucket_arn" {
  description = "The ARN of the S3 bucket"
  value       = aws_s3_bucket.website.arn
}

output "bucket_website_endpoint" {
  description = "The website endpoint of the S3 bucket"
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website.id
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution"
  value       = aws_cloudfront_distribution.website.domain_name
}

output "cloudfront_url" {
  description = "The URL of the CloudFront distribution"
  value       = "https://${aws_cloudfront_distribution.website.domain_name}"
}

output "website_url" {
  description = "The URL of the website (custom domain if configured, CloudFront otherwise)"
  value       = var.enable_https ? "https://${var.domain_name}" : "http://${aws_cloudfront_distribution.website.domain_name}"
}

output "certificate_arn" {
  description = "The ARN of the ACM certificate"
  value       = var.enable_https ? aws_acm_certificate.website[0].arn : null
}
