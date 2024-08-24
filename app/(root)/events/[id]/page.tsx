import { getEventById } from "@/libs/actions/events.actions"
import React from "react"

async function EventsPage({ params }: { params: { id: string } }) {
  const id = params.id

  const eventDetails = await getEventById(id)

  return (
    <div className="mt-36 grid grid-cols-12 relative">
      <div className="relative col-span-7">
        <img
          src={`/eventImages/${eventDetails.image}`}
          alt={eventDetails.event_name}
          className=" w-full h-[75vh] object-cover object-center z-10"
        />
        <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-500 ease-in-out group-hover:opacity-90"></div>
      </div>
      <div className=" col-start-6 col-span-5 z-20 fixed">
        <div className="mt-28 max-w-2xl">
          <h1 className="h1-bold">{eventDetails.event_name}</h1>
          <p className="mt-8">{eventDetails.description}</p>
          <div className="flex gap-4 align-middle mt-16">
            <button className="rounded-full bg-primary-500 px-12 py-4 cursor-pointer ">
              Buy Tickets
            </button>
            <p className="h4-bold">Rs.{eventDetails.ticket_price}</p>
          </div>
        </div>
        {/* Other details */}
      </div>
    </div>
  )
}

export default EventsPage
