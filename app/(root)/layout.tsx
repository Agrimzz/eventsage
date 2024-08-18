"use client"
import Footer from "@/components/shared/Footer"
import GridLines from "@/components/shared/GridLines"
import Header from "@/components/shared/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen flex-col">
        <GridLines />
        <main className="flex-1">
          <Header />
          {children}
          <Footer />
        </main>
      </div>
    </QueryClientProvider>
  )
}
