
import type { Metadata } from 'next';
import './globals.css';
import { Inter, Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';
import Script from 'next/script';


const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Montserrat({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700', '800'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foundation.256estates.com';
const logoUrl = 'https://i.imgur.com/wqfSmsa.png';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '256 Estates Foundation | Preserving Heritage, Empowering Futures',
    template: '%s | 256 Estates Foundation',
  },
  description: "256 Estates Foundation is a Ugandan NGO preserving cultural heritage while building sustainable communities through education, arts, and multimedia storytelling.",
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: '256 Estates Foundation | Preserving Heritage, Empowering Futures',
    description: "A Ugandan NGO preserving cultural heritage and empowering communities.",
    url: siteUrl,
    siteName: '256 Estates Foundation',
    images: [
      {
        url: logoUrl,
        width: 512,
        height: 512,
        alt: '256 Estates Foundation Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '256 Estates Foundation | Preserving Heritage, Empowering Futures',
    description: "A Ugandan NGO preserving cultural heritage and empowering communities through storytelling, education, and art.",
    creator: '@256Estates',
    images: [logoUrl], 
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "256 Estates Foundation",
  "url": "https://foundation.256estates.com",
  "logo": "https://pbs.twimg.com/profile_images/1983132276138364928/65CEsWwK_400x400.jpg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+256-792-583-150",
    "contactType": "Customer Service"
  },
  "sameAs": [
    "https://www.facebook.com/kulturefoundationuganda",
    "https://twitter.com/KultureFoundUG",
    "https://instagram.com/kulturefoundation",
    "https://youtube.com/@kulturefoundationuganda",
    "https://www.linkedin.com/company/kulture-foundation/",
    "https://tiktok.com/@kulturefoundation"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KT5BP5ZM');
          `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-58K6BP01Q1"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-58K6BP01Q1');
          `}
        </Script>
      </head>
      <body className={cn("min-h-screen bg-background antialiased", fontBody.variable, fontHeadline.variable)}>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KT5BP5ZM"
        height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
