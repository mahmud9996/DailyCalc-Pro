import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.dailycalcpro.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DailyCalc Pro — Free Online Calculators for Daily Life",
    template: "%s | DailyCalc Pro",
  },
  description:
    "Free, fast, accurate calculators for finance, health, and everyday life — Age, BMI, Mortgage, VAT, Prayer Times, and more. Built for the US, UK, and Bangladesh.",
  keywords: [
    "online calculator",
    "age calculator",
    "bmi calculator",
    "mortgage calculator",
    "vat calculator",
    "prayer time calculator",
  ],
  openGraph: {
    type: "website",
    siteName: "DailyCalc Pro",
    title: "DailyCalc Pro — Free Online Calculators for Daily Life",
    description:
      "All-in-one smart calculator platform for finance, health, and lifestyle.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "DailyCalc Pro — Free Online Calculators for Daily Life",
    description:
      "All-in-one smart calculator platform for finance, health, and lifestyle.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevents theme flash-of-wrong-mode before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('dcp-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6673310179249665"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
