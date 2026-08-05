import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { StickyProgress } from "@/components/shared/sticky-progress";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alpha Digital | Full-Service Digital Marketing Agency",
  description:
    "Alpha Digital plans and runs SEO, PPC, branding, and AI automation strategies that bring qualified traffic to your website and turn it into real leads.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${inter.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <StickyProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
