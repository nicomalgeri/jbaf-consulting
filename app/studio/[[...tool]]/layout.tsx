export const metadata = {
  title: 'JBAF Consulting - Content Studio',
  description: 'Content management for JBAF Consulting website',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
