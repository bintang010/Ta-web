import { ColorSchemeScript } from '@mantine/core';

import '@/app/styles/globals.css';
import 'animate.css/animate.min.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import ServerProviders from './providers/server';
import ClientProviders from './providers/client';

export const metadata = {
  title: 'Jeketi 48',
  description: 'Website Alexander Nova',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet"/>
        <ColorSchemeScript/>
      </head>
      <body>
        <ServerProviders>
          <ClientProviders>{children}</ClientProviders>
        </ServerProviders>
      </body>
    </html>
  )
}
