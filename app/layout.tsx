import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"




import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Sultan and Sons - Advanced Solar Inverter Systems",
  description:
    "Next-generation solar inverter systems with multiple power ratings for residential and commercial applications.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen`}
      >
        
        
        <main className="flex-1 font-sans">
          {children}
        </main>

        

        
        <Analytics />
      </body>
    </html>
  )
}
