# Setup

Install deps with:
```bash
npm i
```

Run dev server:

```bash
npm run dev
```

Deploy to S3:

```bash
npm run deploy
```

Deploy and Invalidate Cloudfront Cache

```bash
npm run release
```

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

### 4. Deploy The Site

After Terraform creates the infrastructure:

```bash
cd ..
npm run deploy
```

### 5. Invalidate CloudFront Cache (after updates)

```bash
aws cloudfront create-invalidation \
  --distribution-id $(terraform -chdir=terraform output -raw cloudfront_distribution_id) \
  --paths "/*"
```

Everything is automated, including DNS and SSL certificate validation.

## Color Palette
- Dark Slate Grey #36453B
- Dim Grey #596869
- Ebony #515751
- Ivory #F5F9E9
- Dry Sage #C2C1A5
