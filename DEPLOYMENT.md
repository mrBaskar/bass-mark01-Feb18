# 🚀 Deployment Guide

Complete guide to deploy Baskar's Portfolio Website to production.

## Table of Contents

1. [Netlify Deployment](#netlify-deployment)
2. [Vercel Deployment](#vercel-deployment)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [Docker Deployment](#docker-deployment)
5. [Traditional Web Hosting](#traditional-web-hosting)
6. [Custom Domain Setup](#custom-domain-setup)
7. [SSL Certificate](#ssl-certificate)
8. [Performance Optimization](#performance-optimization)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Troubleshooting](#troubleshooting)

---

## Netlify Deployment (Recommended)

### Best For: Easy, automatic deploys with good performance

### Prerequisites
- GitHub account with your repository
- Netlify account (free at netlify.com)

### Steps

1. **Push your code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select GitHub and authorize
   - Choose your repository
   - Click "Deploy"

3. **Configure Settings**
   - Build command: (leave empty - no build needed)
   - Publish directory: `.` (root directory)
   - Click "Deploy site"

4. **Automatic Deploys**
   - Every push to main branch auto-deploys
   - Preview builds for pull requests

### Add Custom Domain
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Update DNS records at your domain registrar

### Environment Variables (if needed)
1. Site settings → Build & deploy → Environment
2. Add environment variables
3. Redeploy site

### Example netlify.toml Configuration
```toml
[build]
  publish = "."
  command = ""

[context.production]
  environment = { NODE_ENV = "production" }

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## Vercel Deployment

### Best For: High performance, Next.js optimizations

### Steps

1. **Push to GitHub** (same as Netlify)

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository
   - Configure project
   - Click "Deploy"

3. **Configure vercel.json**
```json
{
  "buildCommand": "",
  "outputDirectory": "public",
  "env": {
    "NODE_ENV": "production"
  }
}
```

4. **Automatic Deploys**
   - Similar to Netlify
   - Excellent performance metrics

### Custom Domain
1. Project settings → Domains
2. Add custom domain
3. Update DNS (auto-suggested)

---

## GitHub Pages Deployment

### Best For: Completely free, GitHub-hosted

### Steps

1. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "GitHub Pages"
   - Select main branch as source
   - Click "Save"

2. **Site URL**
   - `https://yourusername.github.io/bass-mark01-Feb18`

3. **Custom Domain (Optional)**
   - Create CNAME file in root:
```
yourdomain.com
```
   - Update DNS to point to GitHub Pages

### GitHub Actions (Auto-Deploy)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        run: |
          mkdir -p build
          cp -r index.html css js assets build/ || true
```

---

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Hub account (optional)

### Create Dockerfile

In project root, create `Dockerfile`:
```dockerfile
FROM nginx:alpine

# Copy website files
COPY --chown=nginx:nginx . /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
```

### Create nginx.conf

```nginx
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript;
    
    # Cache headers
    location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

### Build and Run

```bash
# Build image
docker build -t baskar-portfolio .

# Run container locally
docker run -p 8000:80 baskar-portfolio

# Visit http://localhost:8000
```

### Push to Docker Hub

```bash
# Login
docker login

# Tag image
docker tag baskar-portfolio yourusername/baskar-portfolio:latest

# Push
docker push yourusername/baskar-portfolio:latest
```

### Deploy on Docker Container Service

- **AWS ECS**: Push to ECR, create task definition
- **Google Cloud Run**: Push to GCR, deploy
- **Azure Container Instances**: Push to ACR, deploy
- **DigitalOcean App Platform**: Connect GitHub repo

---

## Traditional Web Hosting

### Using FTP/SFTP

1. **Connect via FTP Client**
   - Use FileZilla or WinSCP
   - Enter FTP credentials from hosting provider
   - Navigate to public_html or www folder

2. **Upload Files**
   - Upload all files from project root
   - Ensure permissions are correct (644 for files, 755 for folders)

3. **Access Your Site**
   - Visit your domain

### Using SSH/Terminal

```bash
# Connect via SSH
ssh username@your-domain.com

# Navigate to website directory
cd public_html

# Upload files
scp -r /local/path/to/files username@your-domain.com:~/public_html/
```

### Using cPanel

1. Login to cPanel
2. Go to File Manager
3. Navigate to public_html
4. Upload files directly via web interface
5. Extract ZIP if needed

---

## Custom Domain Setup

### 1. Buy a Domain
- GoDaddy
- Namecheap
- Bluehost
- Google Domains

### 2. Update DNS Records

For Netlify/Vercel/GitHub Pages:
- Type: CNAME
- Name: www (or subdomain)
- Value: provided by platform

For Traditional Hosting:
- Type: A Record
- Name: @ (root)
- Value: your server IP

Example DNS Configuration:
```
Type     | Name    | Value
---------|---------|--------------------------------
A        | @       | 123.45.67.89 (server IP)
CNAME    | www     | yourdomain.com
CNAME    | mail    | (email provider)
TXT      | @       | (verification records)
```

### 3. Propagation
- Usually takes 24-48 hours
- Check status: [whatsmydns.net](https://whatsmydns.net)

---

## SSL Certificate

### Automatic (Recommended)

**Netlify/Vercel**: Automatic free SSL
- Auto-generated Let's Encrypt certificate
- Auto-renewal

**GitHub Pages**: Automatic HTTPS
- Enforced for GitHub domains

### Manual Setup

**Let's Encrypt (Free)**

```bash
# Using Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

**Self-Signed (Testing Only)**

```bash
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```

---

## Performance Optimization

### Before Deployment

1. **Minify Assets** (Optional with current setup)
```bash
npm install -g terser csso-cli

# Minify CSS
csso css/styles.css -o css/styles.min.css

# Minify JS
terser js/script.js -o js/script.min.js
```

2. **Optimize Images**
```bash
# Using ImageMagick
convert image.png -resize 1200x -quality 85 image-optimized.png
```

3. **Enable Gzip Compression**
   - Netlify: Automatic
   - Vercel: Automatic
   - Traditional: Add to .htaccess or nginx config

### Lighthouse Audit

1. Open site in Chrome
2. DevTools → Lighthouse
3. Generate report
4. Fix warnings and errors

### Core Web Vitals

Monitor at:
- [PageSpeed Insights](https://pagespeed.web.dev)
- [Web.dev](https://web.dev/vitals)

---

## Monitoring & Analytics

### Google Analytics Setup

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get tracking ID: UA-XXXXXXXXX-X
3. Add to HTML:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXXX-X');
</script>
```

### Sentry (Error Tracking)

```html
<script src="https://browser.sentry-cdn.com/7.0.0/bundle.min.js" integrity="..." crossorigin="anonymous"></script>
<script>
  Sentry.init({ dsn: "YOUR_DSN_HERE" });
</script>
```

### Uptime Monitoring

- **UptimeRobot** (Free): Monitor site availability
- **StatusIO**: Status page for incidents
- **PagerDuty**: Alert notifications

---

## Troubleshooting

### Site Won't Load

**Check:**
- DNS propagation status
- Browser cache (Ctrl+Shift+Delete)
- Console errors (F12)
- Network requests (F12 → Network)

**Common Issues:**
```
ERR_NAME_NOT_RESOLVED → DNS not updated
ERR_CONNECTION_REFUSED → Server down
ERR_SSL_PROTOCOL_ERROR → SSL certificate issue
```

### Styles Not Loading

**Check:**
- File paths are correct
- CSS file exists on server
- Browser cache cleared
- No CORS issues

**Fix:**
```html
<!-- Absolute paths -->
<link rel="stylesheet" href="/css/styles.css">

<!-- Or with full URL -->
<link rel="stylesheet" href="https://yourdomain.com/css/styles.css">
```

### JavaScript Errors

**Debug:**
1. Open DevTools (F12)
2. Check Console tab
3. Check Network tab for failed requests
4. Look for CSP errors

**Common Fixes:**
```javascript
// Add error handling
window.addEventListener('error', (event) => {
  console.error('Error:', event.error);
  // Send to error tracking service
});
```

### Form Not Working

**Check:**
1. Form action is set correctly
2. Backend service is configured
3. CORS headers are correct
4. API endpoint is accessible

**Test Form:**
```bash
# Test endpoint
curl -X POST https://your-form-endpoint.com/submit
```

### Slow Performance

**Optimize:**
1. Use CDN for assets
2. Enable gzip compression
3. Minify CSS/JS
4. Optimize images
5. Cache static files
6. Use lazy loading

**Analyze:**
- GTmetrix.com
- PageSpeed Insights
- WebPageTest

### SSL Certificate Error

**Causes:**
- Expired certificate
- Wrong domain
- Mixed content (HTTP/HTTPS)

**Fix:**
```html
<!-- Upgrade insecure requests -->
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

---

## Monitoring Checklist

- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] Links work
- [ ] Form submission works
- [ ] SSL certificate valid
- [ ] Analytics tracking
- [ ] Error tracking active
- [ ] Uptime monitoring enabled
- [ ] Backups configured

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Form validation active
- [ ] No sensitive data exposed
- [ ] Dependencies up to date
- [ ] .env files not committed
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Backups automated
- [ ] Incident response plan

---

## Support & Resources

### Documentation
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Guide](https://pages.github.com)
- [Docker Docs](https://docs.docker.com)

### Tools
- [SSL Labs](https://www.ssllabs.com/ssltest)
- [Security Headers](https://securityheaders.com)
- [Mozilla Observatory](https://observatory.mozilla.org)

### Contact & Help
- Check platform docs
- Open support ticket
- Community forums
- Stack Overflow

---

**Deployment Complete!** 🎉

Your portfolio is now live on the internet. Keep updating your skills and projects, and redeploy regularly.
