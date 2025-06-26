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
      <body className={`${epilogue.variable} ${karla.variable} font-sans`}>
        <DestinationProvider>
          <div className="w-full">
            <div className="mx-auto bg-white shadow-sm" style={{ width: '90%' }}>
              {children}
            </div>
          </div>
        </DestinationProvider>
      </body>
    </html>
  );
}
