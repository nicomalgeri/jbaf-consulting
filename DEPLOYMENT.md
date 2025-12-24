# JBAF Consulting Website - Deployment Guide

## Pre-Deployment Checklist

### ✅ Development Complete
- [x] All pages built and tested
- [x] Forms working locally
- [x] Build succeeds without errors
- [x] All content migrated
- [x] Responsive design verified

## Deployment Steps

### Step 1: Set Up Resend (Email Service)

1. **Create Account**
   - Go to [resend.com](https://resend.com)
   - Sign up with your email
   - Verify your email address

2. **Generate API Key**
   - Navigate to "API Keys" in dashboard
   - Click "Create API Key"
   - Name it "JBAF Production"
   - Copy the key (starts with `re_`)
   - **Save it immediately** (you won't see it again)

3. **Add Domain** (For production)
   - Go to "Domains" in dashboard
   - Click "Add Domain"
   - Enter `jbafconsult.com`
   - Follow DNS configuration instructions
   - Verify domain

### Step 2: Configure Environment Variables

Create `.env.local` in project root:

```env
# Resend Configuration
RESEND_API_KEY=re_your_actual_api_key_here

# Email Configuration
EMAIL_FROM=info@jbafconsult.com
EMAIL_TO=info@jbafconsult.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://jbafconsult.com
```

**Important**:
- Never commit `.env.local` to git (it's in `.gitignore`)
- Use different keys for development and production
- Keep your API keys secure

### Step 3: Choose Deployment Platform

We recommend **Vercel** (creators of Next.js), but you can also use:
- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted

## Option A: Deploy to Vercel (Recommended)

### Via GitHub (Easiest)

1. **Push to GitHub**
   ```bash
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit: JBAF Consulting website"

   # Create repository on GitHub
   # Then push
   git remote add origin https://github.com/yourusername/jbaf-consulting.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Import Project"
   - Select your repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel project settings
   - Go to "Environment Variables"
   - Add each variable:
     - `RESEND_API_KEY`
     - `EMAIL_FROM`
     - `EMAIL_TO`
     - `NEXT_PUBLIC_SITE_URL`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live site!

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy: Y
# - Which scope: [your account]
# - Link to existing project: N
# - What's your project's name: jbaf-consulting
# - In which directory: ./
# - Override settings: N

# Add environment variables
vercel env add RESEND_API_KEY
vercel env add EMAIL_FROM
vercel env add EMAIL_TO
vercel env add NEXT_PUBLIC_SITE_URL

# Deploy to production
vercel --prod
```

## Option B: Deploy to Netlify

1. **Build Configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy**
   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli

   # Login
   netlify login

   # Deploy
   netlify deploy --prod
   ```

3. **Add Environment Variables**
   - Go to Site settings
   - Navigate to "Environment variables"
   - Add all required variables

## Step 4: Custom Domain Setup

### For Vercel:

1. **Add Domain**
   - Go to project settings
   - Click "Domains"
   - Add `jbafconsult.com` and `www.jbafconsult.com`

2. **Configure DNS**
   At your domain registrar, add:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for Propagation**
   - DNS changes can take 24-48 hours
   - Use [dnschecker.org](https://dnschecker.org) to verify

### SSL Certificate
- Vercel automatically provisions SSL
- Your site will be HTTPS within minutes

## Step 5: Post-Deployment Testing

### Functionality Tests
- [ ] Visit homepage
- [ ] Navigate to all pages
- [ ] Test mobile menu
- [ ] Submit contact form
- [ ] Upload CV on careers page
- [ ] Verify emails arrive
- [ ] Test all links

### Performance Tests
- [ ] Run [Lighthouse](https://pagespeed.web.dev/) audit
- [ ] Check mobile performance
- [ ] Verify images load
- [ ] Test page load speed

### Browser Tests
Test on:
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Email Tests
- [ ] Contact form sends email
- [ ] CV submission sends email with attachment
- [ ] Emails arrive at correct address
- [ ] Email formatting is correct

## Step 6: Analytics & Monitoring (Optional)

### Add Google Analytics

1. **Get Tracking ID**
   - Create GA4 property
   - Copy Measurement ID (G-XXXXXXXXXX)

2. **Add to Project**
   Edit `app/layout.tsx`:
   ```tsx
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
     `}
   </Script>
   ```

3. **Add Environment Variable**
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

## Common Deployment Issues

### Build Fails
**Solution**: Check error messages, ensure all dependencies are installed
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Forms Don't Work
**Solution**: Verify environment variables are set correctly
- Check Resend API key is valid
- Verify email addresses are correct
- Check API routes are deployed

### Images Not Loading
**Solution**: Ensure images are in `public/` directory

### Styling Issues
**Solution**: Clear build cache
```bash
rm -rf .next
npm run build
```

## Rollback Plan

If something goes wrong:

### Vercel
- Go to "Deployments"
- Find previous working deployment
- Click "..." menu
- Select "Promote to Production"

### Via Git
```bash
# Revert to previous commit
git revert HEAD
git push

# Redeploy
vercel --prod
```

## Maintenance

### Updating Content
1. Edit component files locally
2. Test changes: `npm run dev`
3. Commit and push to GitHub
4. Vercel auto-deploys on push

### Updating Dependencies
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Test locally
npm run build
npm run dev

# Deploy
git commit -am "Update dependencies"
git push
```

## Support

If you encounter issues:

1. **Check Logs**
   - Vercel: Function logs in dashboard
   - Local: Terminal output

2. **Common Resources**
   - [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
   - [Vercel Documentation](https://vercel.com/docs)
   - [Resend Documentation](https://resend.com/docs)

3. **Get Help**
   - Vercel Discord
   - Stack Overflow
   - GitHub Discussions

## Security Checklist

Before going live:
- [ ] Environment variables are secure
- [ ] No API keys in code
- [ ] `.env` files not committed
- [ ] HTTPS enabled
- [ ] CORS configured if needed
- [ ] Rate limiting on forms (Vercel does this automatically)

## SEO Checklist

- [ ] Sitemap generated (Next.js does this automatically)
- [ ] Meta tags on all pages
- [ ] Open Graph images
- [ ] robots.txt configured
- [ ] Google Search Console setup
- [ ] Submit sitemap to Google

## Final Steps

1. **Update README**
   - Add production URL
   - Update deployment status

2. **Notify Team**
   - Share production URL
   - Provide admin credentials if needed

3. **Monitor**
   - Watch for errors in first 24 hours
   - Check email delivery
   - Monitor form submissions

---

**Deployment Complete! 🚀**

Your JBAF Consulting website is now live and ready to receive inquiries!
