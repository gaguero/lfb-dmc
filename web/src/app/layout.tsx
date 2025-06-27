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
          {/* Main Container with Subtle Overlay Effect - Maintaining Original Width */}
          <div className="w-full pt-10">
            <div className="mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl border border-white/10 overflow-hidden pb-80" style={{ width: '90%' }}>
              {/* Subtle gradient overlay for depth */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-black/2 pointer-events-none"></div>
                
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
