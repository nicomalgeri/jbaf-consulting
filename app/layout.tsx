import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "JBAF Consulting - Partner for Lasting Change and Impactful Results",
  description: "UK-based consultancy partnering with organisations navigating complexity, change, and growth. We deliver strategic delivery, leadership development, staffing, digital transformation, and stakeholder engagement solutions.",
  keywords: ["consulting", "UK consulting", "strategic delivery", "leadership development", "digital transformation", "programme management", "business consulting"],
  authors: [{ name: "JBAF Consulting" }],
  openGraph: {
    title: "JBAF Consulting - Partner for Lasting Change and Impactful Results",
    description: "We don't just advise—we deliver. Partner with JBAF Consulting for sustainable organisational transformation.",
    url: "https://jbafconsult.com",
    siteName: "JBAF Consulting",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
