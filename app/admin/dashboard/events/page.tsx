import TableData from "@/components/TableData"
import { getAllEvents } from "@/lib/actions/event.actions"
import React from "react"

const Events = async () => {
  const events = await getAllEvents({
    query: "",
    page: 1,
    limit: 100,
    category: "",
  })
  const formattedEvents = events?.data.map((event: any) => ({
    ...event,
    startDateTime: new Date(event.startDateTime).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }))

  const columns = [
    { accessor: "title", title: "Title" },
    { accessor: "category", title: "Category" },
    { accessor: "location", title: "Location" },
    { accessor: "startDateTime", title: "Start Date" },
    { accessor: "price", title: "Price" },
    { accessor: "views", title: "Views", sortable: true },
  ]
  return (
    <div>
      <h3 className="text-3xl font-bold mb-7"> Events</h3>
      <TableData records={formattedEvents} columns={columns} type="event" />
    </div>
  )
}

export default Events
