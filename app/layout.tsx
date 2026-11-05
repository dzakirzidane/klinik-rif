import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import SplashScreen from "./components/SplashScreen";
import { ThemeProvider } from "./components/theme-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klinik RIF - Klinik Gigi & Umum di Kelapa Dua, Tangerang",
  description:
    "Klinik RIF, klinik gigi dan umum yang profesional dan nyaman di Kelapa Dua, Tangerang.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-splash="on"
      suppressHydrationWarning
      className={`${playfair.variable} ${montserrat.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SplashScreen />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}