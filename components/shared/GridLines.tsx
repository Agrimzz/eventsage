import React from "react"

export default function GridLines() {
  return (
    <div className="w-full h-full grid grid-cols-12 fixed z-30 opacity-10 pointer-events-none cursor-none select-none">
      <div className="border-l border-white h-full col-span-2 col-start-2"></div>
      <div className="border-l border-white h-full col-span-2"></div>
      <div className="border-l border-white h-full col-span-2"></div>
      <div className="border-l border-white h-full col-span-2"></div>
      <div className="border-x border-white h-full col-span-2"></div>
    </div>
  )
}
