import type { Metadata } from 'next';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'DRC Carbon Registry',
  description:
    'National carbon credit registry and MRV platform for the Democratic Republic of Congo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="h-full bg-background text-foreground font-sans">
        <Sidebar />
        <div className="pl-64 flex h-full flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
