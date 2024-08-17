"use client"
import { IconMenu4, IconPower } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

function Header() {
  const router = useRouter()

  const [token, setToken] = useState<string>("")
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) setToken(storedToken)
  }, [])
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
        {token === "" ? (
          <button
            className="rounded-full bg-primary-500 px-12 py-4 cursor-pointer"
            onClick={() => router.push("/signin")}
          >
            Login
          </button>
        ) : (
          <div className="flex gap-4 items-center">
            <h3 className="p-bold-20">{token}</h3>
            <button
              className="rounded-full bg-primary-500 px-8 py-4 cursor-pointer"
              onClick={() => {
                localStorage.clear()
                router.push("/signin")
              }}
            >
              LogOut
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
