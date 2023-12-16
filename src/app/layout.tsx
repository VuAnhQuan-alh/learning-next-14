import '@mantine/core/styles.css'
import './globals.css'

import { Inter } from 'next/font/google'

import { ColorSchemeScript } from '@mantine/core'

import type { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning next14",
  description: "Lorem ahi do ngo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

      <body className={inter.className}>{children}</body>
    </html>
  );
}
