import { auth } from "@/auth"
import EventCard from "@/components/EventCard"
import SearchForm from "@/components/SearchForm"
import { getAllEvents } from "@/lib/actions/event.actions"
import { EventDetails } from "@/types"
import React from "react"

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string; category: string }>
}) => {
  const session = await auth()
  const userId = session?.user?.id as string
  const query = (await searchParams).query
  const category = (await searchParams).category

  const events = await getAllEvents({
    query,
    page: 1,
    limit: 30,
    category: category,
  })

  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <h3 className="heading">Browse Events</h3>
        <SearchForm query={query} category={category} showCategory />
      </section>
      <section className="section_container">
        <p className="text-3xl font-semibold">
          {!query && !category
            ? "All events"
            : !query && category
            ? `Events in ${category}`
            : `Search results for "${query}"`}
        </p>
        <ul className="mt-7 card_grid">
          {events?.data.length > 0 ? (
            events?.data.map((event: EventDetails) => (
              <EventCard key={event._id} event={event} userId={userId} />
            ))
          ) : (
            <p className="no-results">No events found</p>
          )}
        </ul>
      </section>
    </>
  )
}

export default Search
