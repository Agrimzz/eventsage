import { auth } from "@/auth"
import { formatDate } from "@/lib/utlis"
import { EventDetails } from "@/types"
import { IconArrowUpRight, IconEdit, IconEye } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import DeleteConfirmation from "./DeleteConfirmation"

const EventCard = async ({ event }: { event: EventDetails }) => {
  const {
    _id,
    title,
    description,
    imageUrl,
    startDateTime,
    category,
    price,
    views,
    organizer: { _id: organizerId, username, image },
  } = event

  const session = await auth()

  const ticketStatus = new Date(event.ticketDate) < new Date()
  const eventEnded = new Date(event.endDateTime) < new Date()

  const userId = session?.user?.id as string

  const isOrganizer = userId === organizerId

  return (
    <li
      className={`event-card group relative ${eventEnded && " !bg-primary/10"}`}
    >
      <div className="flex-between">
        <p className="event-card_date">
          {ticketStatus ? "Ticket Sale Ended" : formatDate(startDateTime)}
        </p>
        <div className="flex gap-1.5">
          {isOrganizer ? (
            <>
              <Link href={`/events/${_id}/update`}>
                <IconEdit color="green" />
              </Link>
              <DeleteConfirmation id={_id} />
            </>
          ) : (
            <>
              <IconEye color="#2B64EE" />
              <span className="font-medium text-base">{views} views</span>
            </>
          )}
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/profile/${organizerId}`}>
            <p className="font-medium text-base">@{username}</p>
          </Link>
          <h3 className="text-2xl font-semibold line-clamp-1">
            <Link href={`/events/${_id}`}>{title}</Link>
          </h3>
        </div>

        <Link href={`/profile/${organizerId}`}>
          <Image
            src={image}
            alt={username}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/events/${_id}`}>
        <p className="event-card_desc">{description}</p>
        {eventEnded ? (
          <p className="font-bold my-3 text-xl">Event Ended</p>
        ) : (
          <p className="font-bold my-3 text-xl">
            {price === 0 ? "Free" : `Rs. ${price}`}
          </p>
        )}

        <img
          src={`/eventImages/${imageUrl}`}
          alt={title}
          className="event-card_img"
        />
      </Link>

      <div className="flex-between mt-5 gap-3">
        <p className="font-medium text-base">{category}</p>

        <button className="event-card_btn">
          <Link href={`/events/${_id}`}>Details</Link>
        </button>
      </div>
      {isOrganizer && (
        <Link
          href={`/orders?eventId=${event._id}`}
          className="flex gap-2 justify-end mt-5"
        >
          <p className="text-primary">Order Details</p>
          <IconArrowUpRight color="#2B64EE" />
        </Link>
      )}
    </li>
  )
}

export default EventCard
