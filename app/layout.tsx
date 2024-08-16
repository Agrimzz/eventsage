import type { Metadata } from "next"
import { Inter, Teko, Urbanist } from "next/font/google"
import "./globals.css"

const teko = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Event Sage",
  description: "Your place for all your events",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={teko.className}>{children}</body>
    </html>
  )
}
