"use client"
import React from "react"
import EventCard from "./EventCard"
import { EventDetails } from "@/types"

const NearEvents = ({
  events,
  userId,
}: {
  events: EventDetails[]
  userId: string
}) => {
  return (
    <ul className="mt-7 card_grid">
      {events?.length > 0 ? (
        events?.map((event: EventDetails) => (
          <EventCard key={event._id} event={event} userId={userId} />
        ))
      ) : (
        <p className="no-results">No nearby events found</p>
      )}
    </ul>
  )
}

export default NearEvents
