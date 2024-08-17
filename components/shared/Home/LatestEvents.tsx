import { events } from "@/constants/events"
import React from "react"

function LatestEvents() {
  const event = events.slice(0, 4).map((event) => (
    <div
      key={event.id}
      className="relative col-span-3 p-8 h-[600px] bg-cover bg-center z-30 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105 group hover:z-40"
      style={{
        backgroundImage: `url(${event.img_url})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500 ease-in-out group-hover:opacity-90"></div>

      <div className="relative ">
        <h4 className="h4-medium uppercase text-white transition-colors duration-500 ease-in-out">
          {event.id}
        </h4>
        <h4 className="h4-bold uppercase mt-8 text-white transition-colors duration-500 ease-in-out group-hover:text-primary">
          {event.event_name}
        </h4>
        <p className="hidden mt-8 group-hover:block transition-transform duration-500 ease-in-out">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
          laboriosam voluptas, voluptatum, quaerat, minima cum soluta ipsam unde
          adipisci quos itaque veniam atque ratione temporibus.
        </p>
      </div>
    </div>
  ))

  return (
    <div className="w-full grid grid-cols-12 py-16 overflow-hidden z-30">
      <div className="col-start-2 col-span-11 mb-16">
        <h4 className="h4-bold uppercase ">Latest Events</h4>
      </div>
      {event}
    </div>
  )
}

export default LatestEvents
