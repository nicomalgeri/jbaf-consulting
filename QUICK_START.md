# Quick Start Guide - JBAF LIMITED Website

## Get Up and Running in 5 Minutes

### 1. Environment Setup

Copy the environment template and add your configuration:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
```env
RESEND_API_KEY=re_your_actual_key_here
EMAIL_FROM=info@jbafconsult.com
EMAIL_TO=info@jbafconsult.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Setting Up Email (Resend)

For the contact and CV submission forms to work, you need to set up Resend:

1. **Sign up** at [resend.com](https://resend.com)
2. **Create an API Key**:
   - Go to API Keys in your dashboard
   - Click "Create API Key"
   - Copy the key
3. **Add to .env.local**:
   ```env
   RESEND_API_KEY=re_your_key_here
   ```

### Testing Without Resend (Development)

If you don't have a Resend account yet, the site will still run but form submissions will fail. You can:
- Test all UI elements and navigation
- Develop and modify components
- Build the project

The forms will only work once you add a valid Resend API key.

## What You Get

✅ **Home Page** with:
- Professional hero section
- Mission, Vision, Goals
- 5 expandable service cards
- Core values section
- 4 client testimonials
- Call-to-action section

✅ **Careers Page** with:
- Why join us section
- CV upload form
- File validation (PDF only, 5MB max)

✅ **Contact Page** with:
- Contact information
- Contact form with service selection

✅ **Fully Responsive** design for mobile, tablet, and desktop

## Project Structure Overview

```
jbaf-consulting/
├── app/               # Pages and API routes
│   ├── page.tsx      # Home page
│   ├── careers/      # Careers page
│   ├── contact/      # Contact page
│   └── api/          # Form submission endpoints
├── components/        # All React components
│   ├── ui/           # Reusable UI components
│   ├── Hero.tsx      # Hero section
│   ├── Services.tsx  # Services section
│   └── ...
└── lib/              # Utilities and validations
```

## Customizing Content

### Update Company Information

Edit `components/Footer.tsx` to change:
- Phone numbers
- Email address
- Physical address
- Social media links

### Modify Services

Edit `components/Services.tsx` to:
- Add/remove services
- Change service descriptions
- Update icons

### Change Testimonials

Edit `components/Testimonials.tsx` to:
- Update client quotes
- Add real testimonials
- Change company names

### Update Colors

Edit `tailwind.config.ts` to customize:
- Primary colors
- Accent colors
- Typography

## Common Tasks

### Add a New Page

1. Create file: `app/your-page/page.tsx`
2. Add to navigation: `components/Header.tsx`
3. Add to footer: `components/Footer.tsx`

### Change Fonts

Edit `app/layout.tsx` to import different Google Fonts

### Update Meta Tags (SEO)

Edit the `metadata` object in:
- `app/layout.tsx` (global)
- `app/careers/page.tsx` (careers)
- `app/contact/page.tsx` (contact)

## Building for Production

```bash
npm run build
npm start
```

## Deployment Checklist

- [ ] Update `.env.local` with production values
- [ ] Set up Resend API key
- [ ] Configure production domain in Resend
- [ ] Update `NEXT_PUBLIC_SITE_URL` in environment variables
- [ ] Test contact form
- [ ] Test CV submission form
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit

## Troubleshooting

### Forms not submitting?
- Check `RESEND_API_KEY` in `.env.local`
- Verify Resend account is active
- Check browser console for errors

### Build failing?
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors
- Verify all environment variables are set

### Styling issues?
- Clear `.next` directory: `rm -rf .next`
- Restart dev server: `npm run dev`

## Need Help?

- Read the full [README.md](./README.md)
- Check [Next.js documentation](https://nextjs.org/docs)
- Review [Tailwind CSS docs](https://tailwindcss.com/docs)

---

Happy building! 🚀
