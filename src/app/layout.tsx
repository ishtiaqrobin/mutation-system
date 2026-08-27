import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./Providers";

const SolaimanLipi = localFont({
  src: [
    {
      path: "../fonts/SolaimanLipi.ttf",
      weight: "400",
      style: "normal",
    }
  ],
  variable: "--font-solaiman",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ভূমি ব্যবস্থাপনা অটোমেশন সিস্টেম - নামজারি খতিয়ান",
  description: "ভূমি মন্ত্রণালয়ের ডিজিটাল ই-মিউটেশন সিস্টেম, নামজারি খতিয়ান অনলাইন লাইভ এডিটর ও প্রিন্ট ব্যবস্থা",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${SolaimanLipi.variable} bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen antialiased transition-colors duration-200`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
