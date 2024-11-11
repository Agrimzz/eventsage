import { auth } from "@/auth"
import EventCard from "@/components/EventCard"
import UserEvents from "@/components/UserEvents"
import { getOrdersByUser } from "@/lib/actions/order.actions"
import { IOrder } from "@/lib/database/models/order.models"
import { EventDetails } from "@/types"
import Link from "next/link"
import React from "react"

const ProfilePage = async () => {
  const session = await auth()
  const id = session?.user?.id as string

  const orders = await getOrdersByUser({ userId: id, page: 1 })
  const orderedEvents = orders?.data.map((order: IOrder) => order.event || [])

  console.log(orderedEvents)

  return (
    <>
      <section className="blue_container !min-h-[230px] ">
        <h3 className="heading ">Profile</h3>
        <p className="sub-heading">Check all your events and tickets.</p>
      </section>
      <section className="section_container">
        <p className="text-3xl font-bold">My Tickets</p>
        <ul className="mt-7 card_grid">
          {orderedEvents.length > 0 ? (
            orderedEvents.map((order: EventDetails) => (
              <EventCard key={order._id} event={order} />
            ))
          ) : (
            <p>
              No tickets found <Link href="/">Browse Events</Link>
            </p>
          )}
        </ul>
      </section>
      <section className="section_container">
        <p className="text-3xl font-bold">Events Organized</p>

        <ul className="card_grid mt-7">
          <UserEvents id={id} />
        </ul>
      </section>
    </>
  )
}

export default ProfilePage
