import { formatDateTime } from "@/lib/utlis"
import { EventDetails } from "@/types"
import { IconClock, IconCurrencyRupee, IconMapPin } from "@tabler/icons-react"
import Link from "next/link"
import React from "react"

const EventPopup = ({ event }: { event: EventDetails }) => {
  return (
    <div className="rounded-full w-[300px] ">
      <Link href={`/events/${event._id}`}>
        <img
          src={`/eventImages/${event.imageUrl}`}
          alt={event.title}
          className="rounded-lg w-full max-h-[200px]"
        />
      </Link>
      <div className="mt-2 flex flex-col gap-2">
        <p className="text-lg font-bold !m-0">{event.title}</p>
        <Link href={`/profile/${event.organizer._id}`}>
          <p className="text-sm font-semibold !m-0">
            By @{event.organizer.username}
          </p>
        </Link>
        <Link
          href={`/events/${event._id}`}
          className="flex flex-col !text-black gap-1.5 mt-2"
        >
          <div className="flex gap-1.5 items-center ">
            <IconMapPin className="flex-shrink-0" />
            <p className="line-clamp-1 !m-0">{event.location}</p>
          </div>
          <div className="flex gap-1.5 items-center">
            <IconClock />
            <p className="!m-0">{formatDateTime(event.startDateTime)}</p>
          </div>
          <div className="flex gap-1.5 items-center">
            <IconCurrencyRupee />
            <p className="!m-0">{event.price}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default EventPopup
