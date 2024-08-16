import { IconMenu4 } from "@tabler/icons-react"
import React from "react"

function Header() {
  return (
    <div className="w-full grid grid-cols-12 py-8 items-center pointer-events-none select-none fixed z-20">
      <div className="col-span-1 mx-auto text-center">
        <IconMenu4 size={32} />
      </div>
      <div className="col-span-2 px-8">
        <h1 className="h4-medium">EVENTSAGE</h1>
      </div>
      <div className="col-start-11 flex justify-end ">
        <button className="rounded-full bg-primary-500 px-12 py-4 ">
          Login
        </button>
      </div>
    </div>
  )
}

export default Header
