import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import { Toaster } from 'react-hot-toast';
import "./style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MeowMart",
  description: "เว็บไซต์ขายของออนไลนฺสำหรับคนรักแมว",
  icons: {
    icon: "/assets/Logo/LogoMeowMart.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
       <Toaster />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
