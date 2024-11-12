import { getEventsByUser } from "@/lib/actions/event.actions"
import React from "react"
import EventCard from "./EventCard"
import { EventDetails } from "@/types"
import Link from "next/link"
import { auth } from "@/auth"

const UserEvents = async ({ id }: { id: string }) => {
  const session = await auth()
  const userId = session?.user?.id as string
  const events = await getEventsByUser({ id, page: 1, limit: 6 })
  return (
    <>
      {events?.data.length > 0 ? (
        events?.data.map((event: EventDetails) => (
          <EventCard key={event._id} event={event} userId={userId} />
        ))
      ) : (
        <p className="no-results">
          No events found {""}
          <Link
            href="/events/create"
            className="underline font-bold text-primary"
          >
            Create Events
          </Link>
        </p>
      )}
    </>
  )
}

export default UserEvents
