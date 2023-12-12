import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/Providers';
import { fontMono, fontSans } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'SpotSync - Create a free unique Spotify profile',
  description: 'Create a free unique Spotify profile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers attribute='class' defaultTheme='light' enableSystem>
          {children}
        </Providers>
      </body>
    </html>
  );
}
