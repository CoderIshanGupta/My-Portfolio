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
  metadataBase: new URL('https://www.ishangupta.works'), // TODO: replace with your real URL
  openGraph: {
    title: 'Ishan Gupta | Full-Stack & Mobile Developer',
    description:
      'Portfolio of Ishan Gupta, a full-stack and mobile developer building scalable web and mobile apps.',
    url: 'https://www.ishangupta.works', // TODO: replace
    siteName: 'Ishan Gupta Portfolio',
    images: [
      {
        url: '/og-image.png', // TODO: add image in /public or remove this
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
    icon: '/favicon.ico',
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}