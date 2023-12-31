import type { Metadata } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/Providers";
import { fontMono, fontSans } from "@/lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "SpotSync - Create a free unique Spotify profile",
  description: "Create a free unique Spotify profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-primarybg font-sans antialiased",
            fontSans.variable,
            fontMono.variable
          )}
        >
          <Providers attribute="class" enableSystem defaultTheme="light">
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
