import { getEventsByUser } from "@/lib/actions/event.actions"
import React from "react"
import EventCard from "./EventCard"
import { EventDetails } from "@/types"
import Link from "next/link"

const UserEvents = async ({ id }: { id: string }) => {
  const events = await getEventsByUser({ id, page: 1, limit: 6 })
  return (
    <>
      {events?.data.length > 0 ? (
        events?.data.map((event: EventDetails) => (
          <EventCard key={event._id} event={event} />
        ))
      ) : (
        <p>
          No events found<Link href="/events/create">Create Events</Link>
        </p>
      )}
    </>
  )
}

export default UserEvents
