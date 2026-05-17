import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Самал · Қыз ұзату · 23.08.2026",
  description: "Сіздерді аяулы қызымыз Самалдың ұзату тойының қадірлі қонағы болуға шақырамыз! 23 тамыз 2026 жылы, сағат 16:30, Prestige Palace мейрамханасында.",
  keywords: "wedding, қыз ұзату, свадьба, Самал, приглашение, шақыру",
  openGraph: {
    title: "Самал · Қыз ұзату · 23.08.2026",
    description: "Свадебное приглашение. Приглашаем разделить радость торжественного дня — проводы нашей дочери Самал.",
    type: "website",
    locale: "kk_KZ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Самал · 23.08.2026"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Самал · Қыз ұзату · 23.08.2026",
    description: "Свадебное приглашение",
  },
  robots: {
    index: false,
    follow: false,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
