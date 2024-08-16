import Image from "next/image"
import React from "react"

function Hero() {
  return (
    <div className="grid grid-cols-12 z-10 relative">
      <div className="col-span-1 flex items-center justify-center gap-24 -rotate-90">
        <p className="underline">Instagram</p>
        <p className="underline">Facebook</p>
        <p className="underline">Twitter</p>
      </div>
      <div
        className="col-span-11 relative"
        style={{
          height: "100vh",
          background: `
            url("https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image
          src="/heroOverlay.png"
          alt="overlay"
          layout="fill"
          objectFit="cover"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
      <div className="col-start-3 absolute z-20  mt-64 col-span-4 flex flex-col gap-10">
        <h1 className="h1-bold">Tomorrowland Music Festival</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Purus morbi nullam non iaculis
          eleifend porta sollicitudin amet eu. Mauris libero ut accumsan est sem
          felis. Nunc viverra vel pellentesque sit pharetra vitae ullamcorper.
          Magna morbi suspendisse risus magna. Nunc aliquam in proin nisl...
        </p>
        <button className="rounded-full bg-primary-500 px-12 py-4  w-2/4 cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  )
}

export default Hero
