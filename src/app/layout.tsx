import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import { TriggerResizeProvider } from "@/context/triggerResize";
import Loading from "./components/ui/loading/loading";
import { TriggerLoadingProvider } from "@/context/triggerLoading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puraçai",
  description: "Açai original do norte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TriggerLoadingProvider>
          <TriggerResizeProvider>
            <Loading />
            {children}
          </TriggerResizeProvider>
        </TriggerLoadingProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
