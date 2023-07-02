import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Script from "next/script";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryProvider } from "./ReactQueryProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Edel File Upload App",
  description: "Upload your files to Cloudinary using this App",
};

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReactQueryProvider>
            <div className="">
              <Navbar />
              {children}
              <Script
                strategy="beforeInteractive"
                src="https://product-gallery.cloudinary.com/all.js"
              />
            </div>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
