import { getEventById } from "@/lib/actions/event.actions"
import { formatDate } from "@/lib/utlis"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import markdownit from "markdown-it"
import { notFound } from "next/navigation"

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

        <div className="space-y-5 mt-5 max-w-4xl mx-auto">
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
                <p className="text-xl font-medium">{event.organizer.email}</p>
                <p className="text-base font-medium">
                  @{event.organizer.username}
                </p>
              </div>
            </Link>
            <p className="font-medium bg-primary/10 px-4 py-2 rounded-full">
              {event.category}
            </p>
          </div>

          <h3 className="text-3xl font-bold">Event Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl break-all"
            />
          ) : (
            <p className="no-result">No details provided.</p>
          )}
        </div>

        <hr className="divider" />
      </section>
    </>
  )
}

export default EventDetails
