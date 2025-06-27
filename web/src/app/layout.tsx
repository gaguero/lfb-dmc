import type { Metadata } from "next";
import { Epilogue, Karla } from "next/font/google";
import "./globals.css";
import { DestinationProvider } from "@/contexts/DestinationContext";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-epilogue",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Local From Bocas | DMC",
  description: "Your trusted local gateway to Panama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} ${karla.variable} font-sans bg-gray-50`}>
        <DestinationProvider>
          {/* Main Container with Elegant Overlay Effect */}
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-[1400px] bg-white rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.15)] backdrop-blur-sm border border-white/20 overflow-hidden">
              {/* Content Container */}
              <div className="relative">
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 pointer-events-none rounded-3xl"></div>
                
                {/* Main Content */}
                <div className="relative z-10">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </DestinationProvider>
      </body>
    </html>
  );
}
