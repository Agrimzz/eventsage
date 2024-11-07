import Navbar from "@/components/Navbar"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {/* <div className="h-[60px]" /> */}
      {children}
    </main>
  )
}

export default Layout
