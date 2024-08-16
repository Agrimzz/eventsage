"use client"
import { IconMenu4 } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import React from "react"

function Header() {
  const router = useRouter()
  return (
    <div className="w-full grid grid-cols-12 py-8 items-center fixed z-50">
      <div className="col-span-1 mx-auto text-center">
        <IconMenu4 size={32} />
      </div>
      <div className="col-span-10 pl-8 flex justify-between">
        <h1
          className="h4-medium cursor-pointer"
          onClick={() => router.push("/")}
        >
          EVENTSAGE
        </h1>
        <button
          className="rounded-full bg-primary-500 px-12 py-4 cursor-pointer"
          onClick={() => router.push("/signin")}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Header
