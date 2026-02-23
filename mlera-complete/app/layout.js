import { Syne, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/lib/ThemeProvider";
import "../styles/globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "MLera — Machine Learning, Finally Made Clear",
  description:
    "MLera is a structured Machine Learning teaching platform built at IIIT Dharwad Research Park. Structured paths, concept clarity, and a built-in lexicon.",
  keywords: ["machine learning", "ML education", "structured learning", "IIIT Dharwad", "MLera"],
  authors: [{ name: "MLera" }],
  openGraph: {
    title: "MLera — Machine Learning, Finally Made Clear",
    description: "Stop drowning in scattered tutorials. MLera gives you structured paths and concept clarity.",
    type: "website",
    siteName: "MLera",
  },
  twitter: {
    card: "summary_large_image",
    title: "MLera — Machine Learning, Finally Made Clear",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} data-theme="dark">
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
