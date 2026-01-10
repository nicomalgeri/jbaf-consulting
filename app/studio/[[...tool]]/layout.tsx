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
    <div style={{ margin: 0, height: '100vh' }}>{children}</div>
  );
}
