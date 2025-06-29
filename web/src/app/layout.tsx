import type { Metadata, Viewport } from "next";
import { Epilogue, Karla } from "next/font/google";
import "./globals.css";
import { OptimizedDestinationProvider } from "@/contexts/OptimizedDestinationProvider";
import Footer from "@/components/Footer";
import { LayoutErrorBoundary } from "@/components/ErrorBoundary";
import GlobalErrorHandlerProvider from "@/components/GlobalErrorHandlerProvider";
import ErrorBoundaryDemo from "@/components/ErrorBoundaryDemo";

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F4C75' },
    { media: '(prefers-color-scheme: dark)', color: '#0F4C75' }
  ],
}

export const metadata: Metadata = {
  title: "Local From Bocas | DMC",
  description: "Your trusted local gateway to Panama.",
  keywords: ["Panama", "DMC", "Destinations", "Bocas del Toro", "Travel", "Tourism"],
  authors: [{ name: "Local From Bocas" }],
  creator: "Local From Bocas",
  publisher: "Local From Bocas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://localfrombocas.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Local From Bocas | DMC",
    description: "Your trusted local gateway to Panama.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} ${karla.variable} font-sans bg-gray-50 antialiased touch-manipulation`}>
        <GlobalErrorHandlerProvider>
          <LayoutErrorBoundary>
            <OptimizedDestinationProvider>
              {/* Mobile-First Responsive Container */}
              <div className="w-full px-4 pt-4 sm:pt-6 md:pt-10">
                <div className="mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl border border-white/10 overflow-hidden" 
                     style={{ width: '100%', maxWidth: '90%' }}>
                  {/* Subtle gradient overlay for depth */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-black/2 pointer-events-none"></div>
                    
                    {/* Main Content */}
                    <div className="relative z-10">
                      {children}
                      <Footer />
                    </div>
                  </div>
                </div>
              </div>
            </OptimizedDestinationProvider>
            
            {/* Development Error Testing Tool */}
            <ErrorBoundaryDemo />
          </LayoutErrorBoundary>
        </GlobalErrorHandlerProvider>
      </body>
    </html>
  );
}