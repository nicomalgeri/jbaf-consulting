# JBAF LIMITED Website

A modern, professional website for JBAF LIMITED built with Next.js 14, TypeScript, and Tailwind CSS. This website showcases the company's services, values, and provides functionality for contact and CV submissions.

## Features

- **Modern Design**: Clean, minimalistic design with a professional color palette
- **Responsive**: Fully responsive across all devices and screen sizes
- **Performance Optimized**: Built with Next.js 14 App Router for optimal performance
- **SEO Friendly**: Proper meta tags, semantic HTML, and Open Graph tags
- **Form Handling**: Contact form and CV submission with file upload
- **Email Integration**: Automated email notifications using Resend
- **Type Safe**: Full TypeScript implementation
- **Accessible**: WCAG AA compliant with proper ARIA labels and keyboard navigation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Inter (headings) & Source Sans Pro (body)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Email**: Resend

## Project Structure

```
jbaf-consulting/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   ├── contact/         # Contact form endpoint
│   │   └── submit-cv/       # CV submission endpoint
│   ├── careers/             # Careers page
│   ├── contact/             # Contact page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   └── Card.tsx
│   ├── Hero.tsx             # Hero section
│   ├── Services.tsx         # Services section
│   ├── MissionVisionGoals.tsx
│   ├── Values.tsx           # Core values section
│   ├── Testimonials.tsx     # Client testimonials
│   ├── CallToAction.tsx     # CTA section
│   ├── Header.tsx           # Site header
│   ├── Footer.tsx           # Site footer
│   ├── CVSubmissionForm.tsx # CV submission form
│   └── ContactForm.tsx      # Contact form
├── lib/                     # Utility functions
│   ├── utils.ts             # General utilities
│   └── validations.ts       # Zod schemas
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jbaf-consulting
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your configuration:
```env
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=info@jbafconsult.com
EMAIL_TO=info@jbafconsult.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | API key from Resend for email functionality | Yes |
| `EMAIL_FROM` | Sender email address | Yes |
| `EMAIL_TO` | Recipient email address for form submissions | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the website | Yes |

## Email Configuration

This project uses [Resend](https://resend.com) for email functionality. To set up:

1. Create an account at [resend.com](https://resend.com)
2. Generate an API key
3. Add the API key to your `.env.local` file
4. Configure your domain for production use

## Key Pages

### Home Page (`/`)
- Hero section with company tagline
- Mission, Vision, and Goals
- Services overview with expandable details
- Core values
- Client testimonials
- Call-to-action section

### Careers Page (`/careers`)
- Why join JBAF section
- Benefits overview
- CV submission form with file upload

### Contact Page (`/contact`)
- Contact information
- Contact form
- Business hours

## Forms

### Contact Form
- Fields: Name, Email, Phone, Service Interest, Message
- Validation: Client and server-side with Zod
- Email notification sent to configured address

### CV Submission Form
- Fields: Full Name, Email, Phone, LinkedIn, Current Position, CV Upload, Cover Letter
- File upload: PDF only, max 5MB
- GDPR consent checkbox
- Email with CV attachment sent to careers team

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
- Primary colors (navy/blue)
- Accent colors (green)
- Gray scale

### Fonts
Fonts are configured in `app/layout.tsx`:
- Inter for headings
- Source Sans Pro for body text

### Content
All content is stored in component files and can be easily updated:
- Hero content: `components/Hero.tsx`
- Services: `components/Services.tsx`
- Values: `components/Values.tsx`
- Testimonials: `components/Testimonials.tsx`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Build the project:
```bash
npm run build
```

The output will be in the `.next` directory. Follow your hosting platform's instructions for deploying Next.js applications.

## Performance

Target Lighthouse scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a private project for JBAF LIMITED. For internal contributions:

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Wait for review and approval

## License

Private and confidential. All rights reserved by JBAF LIMITED.

## Contact

For technical issues or questions:
- Email: info@jbafconsult.com

---

Built with ❤️ for JBAF LIMITED
