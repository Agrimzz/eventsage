import Link from "next/link"
import React from "react"

const Navbar = () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm fixed w-full">
      <nav className="flex-between">
        <Link href="./">
          <span className="text-3xl font-bold">
            Event<span className="text-primary">Sage</span>
          </span>
        </Link>
        <p className="text-lg">Login</p>
      </nav>
    </header>
  )
}

export default Navbar
