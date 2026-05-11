# Default provider (use your default region)
provider "aws" {
  # Configure with AWS credentials
  # You can set these via environment variables:
  # export AWS_ACCESS_KEY_ID="your_access_key"
  # export AWS_SECRET_ACCESS_KEY="your_secret_key"
  # export AWS_REGION="us-east-1"
}

# Provider for us-east-1 (required for ACM certificates used with CloudFront)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
