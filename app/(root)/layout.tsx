import Footer from "@/components/shared/Footer"
import GridLines from "@/components/shared/GridLines"
import Header from "@/components/shared/Header"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen flex-col">
      <GridLines />
      <main className="flex-1">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  )
}
