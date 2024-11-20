import type { Metadata } from "next"
import "./globals.css"
import "@mantine/core/styles.css"
import "mantine-datatable/styles.css"
import "@mantine/dates/styles.css"
import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"

export const metadata: Metadata = {
  title: "Eventsage",
  description: "Events webapp",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <ModalsProvider>{children}</ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
