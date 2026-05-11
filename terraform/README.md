# Terraform Infrastructure for grantredfearn.com

This Terraform module creates:
- S3 bucket for static website hosting
- CloudFront distribution for CDN and HTTPS
- ACM certificate for SSL/TLS
- Route53 DNS records (optional)

## Prerequisites

1. AWS CLI configured with credentials
2. Terraform installed (>= 1.0)
3. (Optional) Route53 hosted zone for your domain

## Quick Start

### 1. Configure Variables

```bash
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
```

### 2. Initialize Terraform

```bash
cd terraform
terraform init
```

### 3. Plan and Apply

```bash
terraform plan
terraform apply
```

### 4. Deploy Your Site

After Terraform creates the infrastructure:

```bash
cd ..
npm run build
aws s3 sync build/ s3://$(terraform -chdir=terraform output -raw bucket_name) --delete
```

### 5. Invalidate CloudFront Cache (after updates)

```bash
aws cloudfront create-invalidation \
  --distribution-id $(terraform -chdir=terraform output -raw cloudfront_distribution_id) \
  --paths "/*"
```

## Configuration Options

### Basic Setup (No Custom Domain)

```hcl
domain_name        = "grantredfearn.com"
enable_https       = false
create_dns_records = false
```

Access via: CloudFront domain (e.g., `d1234567890.cloudfront.net`)

### With Custom Domain (Manual DNS)

```hcl
domain_name        = "grantredfearn.com"
enable_https       = true
create_dns_records = false
```

After apply, manually create DNS records:
- Point `grantredfearn.com` CNAME to CloudFront domain
- Point `www.grantredfearn.com` CNAME to CloudFront domain
- Add DNS validation records for ACM certificate

### With Route53 (Fully Automated)

```hcl
domain_name        = "grantredfearn.com"
enable_https       = true
create_dns_records = true
route53_zone_id    = "Z1234567890ABC"
```

Everything is automated, including DNS and SSL certificate validation.

## Outputs

After applying, get your website URLs:

```bash
terraform output website_url
terraform output cloudfront_url
terraform output bucket_name
```

## Cost Optimization

### Cheapest Configuration
```hcl
price_class = "PriceClass_100"  # US, Canada, Europe only
```
**Estimated cost: $1-5/month** for typical personal site traffic

### Global Configuration
```hcl
price_class = "PriceClass_All"  # All CloudFront edge locations
```
**Estimated cost: $3-10/month** depending on traffic distribution

## Deploy Script

Add to your `package.json`:

```json
"scripts": {
  "deploy": "npm run build && aws s3 sync build/ s3://$(cd terraform && terraform output -raw bucket_name) --delete && aws cloudfront create-invalidation --distribution-id $(cd terraform && terraform output -raw cloudfront_distribution_id) --paths '/*'"
}
```

Then deploy with:
```bash
npm run deploy
```

## Cleanup

To destroy all infrastructure:

```bash
# Empty the S3 bucket first
aws s3 rm s3://$(terraform -chdir=terraform output -raw bucket_name) --recursive

# Destroy infrastructure
cd terraform
terraform destroy
```

## Troubleshooting

### Certificate Validation Pending

If using manual DNS (create_dns_records = false), you must add the DNS validation records shown in the ACM console.

### CloudFront Not Serving Latest Content

CloudFront caches content. After deploying, create an invalidation:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### S3 Bucket Already Exists

S3 bucket names are globally unique. Change the `bucket_name` variable to something unique.
