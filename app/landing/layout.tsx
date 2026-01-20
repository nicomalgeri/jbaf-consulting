import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Strategy Call | JBAF Consulting',
  description: 'Schedule your free 30-minute strategy call with JBAF Consulting. We help UK businesses transform stalled projects into measurable results.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
