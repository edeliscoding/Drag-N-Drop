import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Edel File Upload App",
  description: "Upload your files to Cloudinary using this App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="">
          <Navbar />
          {children}
          <Script
            strategy="beforeInteractive"
            src="https://product-gallery.cloudinary.com/all.js"
          />
        </div>
      </body>
    </html>
  );
}
