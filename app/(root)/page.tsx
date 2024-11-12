import Categories from "@/components/Categories"
import EventCard from "@/components/EventCard"
import LeafletMap from "@/components/LeafletMap"
import SearchInput from "@/components/SearchForm"
import { getLatestEvents } from "@/lib/actions/event.actions"
import { EventDetails } from "@/types"
import React from "react"

export default async function Home() {
  const events = await getLatestEvents({
    query: "",
    category: "",
    page: 1,
    limit: 3,
  })

  return (
    <>
      <section className="blue_container ">
        <h1 className="heading">BROWSE UPCOMING EVENTS, BUY TICKETS NOW</h1>
        <p className="sub-heading">
          Explore Events, Reserve Your Spot, and Join the Excitement with Just a
          Click.
        </p>
        <SearchInput />
      </section>

      <section className="section_container">
        <p className="text-3xl font-semibold mt">Latest Events</p>
        <ul className="mt-7 card_grid">
          {events?.data.length > 0 ? (
            events?.data.map((event: EventDetails) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <p className="no-results">No events found</p>
          )}
        </ul>
      </section>

      <LeafletMap events={events?.data} />

      <section className="section_container">
        <p className="text-3xl font-semibold">Browse by categories</p>
        <Categories />
      </section>
    </>
  )
}
