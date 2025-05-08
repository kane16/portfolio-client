import type { Metadata } from "next"
import { Roboto_Mono } from "next/font/google"
import "./globals.css"
import { ReactNode } from "react"
import Header from "./(header)/header"
import ReactQueryProviders from "./ReactQueryProvider"
import Footer from "./(footer)/footer"
import { StoreProvider } from "./StoreProvider"

const geistMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Portfolio view",
  description: "General user portfolio view",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <StoreProvider>
          <ReactQueryProviders>
            <Header />
            {children}
            <Footer />
          </ReactQueryProviders>
        </StoreProvider>
      </body>
    </html>
  )
}
