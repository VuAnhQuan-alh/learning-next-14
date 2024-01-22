import '@mantine/core/styles.css';
import './globals.css';

import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import { theme } from '@config/theme';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { QueryProvider } from '@oc/contexts/query-client';

import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CRM Template OC',
  description: 'HOLA Tech member created template crm.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <QueryProvider>{children}</QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
