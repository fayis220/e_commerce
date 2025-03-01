"use client";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./globals.css";
import Header from "@/components/Header";
import Aos from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init();
    return () => {
      Aos.refresh();
    };
  }, []);
  return (
    <html lang="en">
      <head>
        <Script
          src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
          strategy="beforeInteractive" // Choose strategy: beforeInteractive, afterInteractive, lazyOnload
        />
      </head>
      <body>
        <WishlistProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
