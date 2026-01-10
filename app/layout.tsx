import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import CookieBanner, { CookiePreferencesModal } from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteUrl = "https://jbafconsult.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3b82f6",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JBAF Consulting | UK Business Consultancy for Leadership, Digital Transformation & Staffing",
    template: "%s | JBAF Consulting",
  },
  description: "JBAF LIMITED is a leading UK consultancy delivering leadership development, digital transformation, staffing solutions, and stakeholder engagement. Partner with us for lasting organisational change and measurable results.",
  keywords: [
    "UK business consulting",
    "management consultancy UK",
    "leadership development programmes",
    "executive coaching UK",
    "digital transformation consulting",
    "staffing solutions UK",
    "workforce planning",
    "corporate communications",
    "stakeholder engagement",
    "change management consultancy",
    "team development workshops",
    "programme management",
    "strategic consulting UK",
    "business transformation",
    "organisational development",
    "talent acquisition UK",
    "data analytics consulting",
    "Ware Hertfordshire consultancy",
  ],
  authors: [{ name: "JBAF LIMITED", url: siteUrl }],
  creator: "JBAF LIMITED",
  publisher: "JBAF LIMITED",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-GB": siteUrl,
    },
  },
  openGraph: {
    title: "JBAF LIMITED | Partner for Lasting Change and Impactful Results",
    description: "UK-based consultancy delivering leadership development, digital transformation, staffing, and stakeholder engagement solutions. We don't just advise—we deliver sustainable organisational transformation.",
    url: siteUrl,
    siteName: "JBAF LIMITED",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "JBAF LIMITED - UK Business Consultancy",
        type: "image/jpeg",
      },
      {
        url: `${siteUrl}/Logo.png`,
        width: 200,
        height: 60,
        alt: "JBAF LIMITED Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JBAF LIMITED | UK Business Consultancy",
    description: "Leadership development, digital transformation, staffing & stakeholder engagement solutions. Partner for lasting organisational change.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@jbafconsulting",
    site: "@jbafconsulting",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have the verification codes
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "business",
  classification: "Business Consulting",
  other: {
    "geo.region": "GB-HRT",
    "geo.placename": "Ware, Hertfordshire",
    "geo.position": "51.8095;-0.0295",
    "ICBM": "51.8095, -0.0295",
    "og:locale:alternate": "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JBAF LIMITED" />
        <StructuredData />
      </head>
      <body>
        <CookieConsentProvider>
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
          {children}
          <CookieBanner />
          <CookiePreferencesModal />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
