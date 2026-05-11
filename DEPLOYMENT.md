# Deployment Guide

## Prerequisites
1. AWS CLI installed and configured with credentials
2. An S3 bucket created (e.g., `grantredfearn.com`)
3. (Optional) CloudFront distribution for HTTPS and CDN

## Deploy to S3

### 1. Build the site
```bash
npm run build
```

### 2. Create S3 bucket (if not exists)
```bash
aws s3 mb s3://grantredfearn.com
```

### 3. Configure bucket for static website hosting
```bash
aws s3 website s3://grantredfearn.com \
  --index-document index.html \
  --error-document index.html
```

### 4. Set bucket policy for public read
Create a file `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::grantredfearn.com/*"
    }
  ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy \
  --bucket grantredfearn.com \
  --policy file://bucket-policy.json
```

### 5. Upload the built site
```bash
aws s3 sync build/ s3://grantredfearn.com --delete
```

### 6. Access your site
Your site will be available at:
`http://grantredfearn.com.s3-website-us-east-1.amazonaws.com`
(Replace `us-east-1` with your bucket's region)

## Optional: CloudFront + Custom Domain

### 1. Create CloudFront distribution
```bash
aws cloudfront create-distribution \
  --origin-domain-name grantredfearn.com.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html
```

### 2. Configure Route 53
- Create A record pointing to CloudFront distribution
- Request SSL certificate in ACM for your domain

## Quick Deploy Script

Add this to your `package.json`:
```json
"scripts": {
  "deploy": "npm run build && aws s3 sync build/ s3://grantredfearn.com --delete"
}
```

Then deploy with:
```bash
npm run deploy
```

## Estimated Costs
- S3 Storage: ~$0.023/GB/month
- S3 Requests: ~$0.0004 per 1000 GET requests
- CloudFront (optional): First 1TB free, then ~$0.085/GB
- **Total**: ~$1-5/month for a typical personal site
