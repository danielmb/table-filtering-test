import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from './theme-provider';
import Navbar from './(components)/navbar';
import { ClerkProvider } from '@clerk/nextjs';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js Table Demo',
  description: 'A demo of a table built with Next.js',
};

export default function RootLayout({
  children,
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  const now = new Date();
  const themes = ['light', 'dark', 'high-contrast', 'dracula', 'radical'];
  const isHalloween = now.getMonth() === 9 && now.getDate() === 31;
  if (isHalloween) {
    themes.push('halloween');
  }
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            themes={themes}
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
          >
            <NuqsAdapter>
              <Navbar />
              {children}
              {auth}
            </NuqsAdapter>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
