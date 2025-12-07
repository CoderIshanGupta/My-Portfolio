import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ishan Gupta | Full-Stack & Mobile Developer',
    template: '%s | Ishan Gupta',
  },
  description:
    'Portfolio of Ishan Gupta, a full-stack and mobile developer building performant web and Flutter applications.',
  metadataBase: new URL('https://www.ishangupta.works'),
  openGraph: {
    title: 'Ishan Gupta | Full-Stack & Mobile Developer',
    description:
      'Portfolio of Ishan Gupta, a full-stack and mobile developer building scalable web and mobile apps.',
    url: 'https://www.ishangupta.works',
    siteName: 'Ishan Gupta Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ishan Gupta – Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ishan Gupta | Full-Stack & Mobile Developer',
    description:
      'Portfolio of Ishan Gupta, a full-stack and mobile developer building scalable web and mobile apps.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/ishan-favicon.ico?v=1' }, // renamed favicon with cache-busting
      { url: '/favicon-96x96.png?v=1', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg?v=1', type: 'image/svg+xml' },
      { url: '/apple-touch-icon.png?v=1', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/ishan-favicon.ico?v=1',
    apple: '/apple-touch-icon.png?v=1',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <link rel="manifest" href="/site.webmanifest?v=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
