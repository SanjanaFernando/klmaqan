import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "KL MAQAN | Dubai Luxury Real Estate & Off-Plan Properties",
  description: "Discover exclusive luxury villas, penthouses, and high-yield off-plan developments across Dubai's most prestigious locations with KL MAQAN.",
  keywords: "Dubai Real Estate, Luxury Villas Palm Jumeirah, Downtown Dubai Penthouses, Off Plan Dubai, Emaar Properties, KL MAQAN",
  openGraph: {
    title: "KL MAQAN | Luxury Real Estate Dubai",
    description: "Curated portfolio of Dubai's finest residential and off-plan properties.",
    url: "https://klmaqan.w3icon.com",
    siteName: "KL MAQAN",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 selection:bg-[#c5a880] selection:text-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
