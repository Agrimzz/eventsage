import { getEventById } from "@/lib/actions/event.actions"
import { formatDate, formatDateTime } from "@/lib/utlis"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import markdownit from "markdown-it"
import { notFound } from "next/navigation"
import { IconCalendarCheck, IconMapPin, IconPin } from "@tabler/icons-react"
import View from "@/components/View"

const md = markdownit()

const EventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id

  const event = await getEventById(id)

  if (!event) return notFound()

  const parsedContent = md.render(event?.info || "")

  return (
    <>
      <section className="blue_container !min-h[230px]">
        <p className="tag">{formatDate(event.startDateTime)}</p>
        <h1 className="heading">{event.title}</h1>
        <p className="sub-heading !max-w-3xl">{event.description}</p>
      </section>

      <section className="section_container">
        <img
          src={`/eventImages/${event.imageUrl}`}
          alt={event.title}
          className="w-full h-auto rounded-xl"
        />
        <div className="w-full flex justify-between  py-5 gap-5 relative">
          <div className="space-y-5  max-w-4xl ">
            <div className="flex-between gap-5">
              <Link
                href={`/events/${event.organizer._id}`}
                className="flex gap-2 items-center mb-3"
              >
                <Image
                  src={event.organizer.image}
                  width={64}
                  height={64}
                  alt={event.organizer.username}
                  className="rounded-full drop-shadow-lg"
                />
                <div>
                  <p className="text-xl font-medium max-sm:text-base">
                    {event.organizer.email}
                  </p>
                  <p className="text-base font-medium">
                    @{event.organizer.username}
                  </p>
                </div>
              </Link>
              <p className="font-medium bg-primary/10 px-4 py-2 rounded-full">
                {event.category}
              </p>
            </div>
            <h3 className="text-3xl font-bold">Date and Time</h3>
            <div className="flex items-center gap-2">
              <IconCalendarCheck />
              <p className="text-base font-semibold">
                {formatDateTime(event.endDateTime)} -{" "}
                {formatDateTime(event.startDateTime)}
              </p>
            </div>
            <h3 className="text-3xl font-bold">Location</h3>
            <div className="flex items-center gap-2">
              <IconMapPin />
              <Link href={event.mapLink} target="_blank">
                <p className="text-base font-semibold hover:underline">
                  {event.location}
                </p>
              </Link>
            </div>
            <h3 className="text-3xl font-bold">About this event</h3>
            {parsedContent ? (
              <article
                dangerouslySetInnerHTML={{ __html: parsedContent }}
                className="prose max-w-4xl break-all"
              />
            ) : (
              <p className="no-result">No details provided.</p>
            )}

            {/* <h3 className="text-3xl font-bold">Map</h3> */}
            {/* TODO: Add map */}
          </div>
          <div className="w-[400px] sticky top-20 border border-black/10 rounded-xl shadow-sm flex justify-center items-center h-[200px] flex-col space-y-3 p-5 max-sm:hidden">
            <p className="text-xl font-bold">
              {event.price === 0 ? "Free" : `Rs.${event.price}`}
            </p>
            <button className="bg-primary text-white w-full py-3 rounded-full hover:bg-primary/80">
              Buy Tickets
            </button>
            <p className="text-xs text-black/60 ">
              Ticket sale ends at{" "}
              <span className="font-bold">
                {formatDateTime(event.ticketDate)}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </section>
      <View id={event._id} views={event.views} />
    </>
  )
}

export default EventDetails
