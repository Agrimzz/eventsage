import { auth } from "@/auth"
import UserEvents from "@/components/UserEvents"
import { getOrdersByUser } from "@/lib/actions/order.actions"
import { ITicketItem } from "@/lib/database/models/order.models"
import { formatDateTime } from "@/lib/utlis"
import Link from "next/link"
import React from "react"

const ProfilePage = async () => {
  const session = await auth()
  const id = session?.user?.id as string

  const orders = await getOrdersByUser({ userId: id })

  return (
    <>
      <section className="blue_container !min-h-[230px] ">
        <h3 className="heading ">Profile</h3>
        <p className="sub-heading">Check all your events and tickets.</p>
      </section>
      <section className="section_container">
        <p className="text-3xl font-bold">My Tickets</p>
        <section className="section_container overflow-x-auto">
          <table className="w-full border-collapse border-t">
            <thead>
              <tr className="p-medium-14 border-b text-grey-500">
                <th className="min-w-[250px] py-3 text-left">Order ID</th>
                <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                  Event Title
                </th>
                <th className="min-w-[150px] py-3 text-left">Organizer</th>
                <th className="min-w-[100px] py-3 text-left">Event Date</th>
                <th className="min-w-[100px] py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length === 0 ? (
                <tr className="border-b">
                  <td colSpan={5} className="py-4 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                <>
                  {orders &&
                    orders.map((row: ITicketItem) => (
                      <tr
                        key={row._id}
                        className="text-base border-b "
                        style={{ boxSizing: "border-box" }}
                      >
                        <td className="min-w-[250px] py-4 text-primary">
                          {row._id}
                        </td>
                        <td className="min-w-[200px] flex-1 py-4 pr-4">
                          <Link href={`/events/${row.eventId}`}>
                            {row.eventTitle}
                          </Link>
                        </td>
                        <td className="min-w-[150px] py-4">
                          <Link href={`/profile/${row.organizerId}`}>
                            @{row.organizer}
                          </Link>
                        </td>
                        <td className="min-w-[100px] py-4">
                          {formatDateTime(row.eventDateTime)}
                        </td>
                        <td className="min-w-[100px] py-4 text-right font-semibold">
                          Rs. {row.totalAmount}
                        </td>
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </section>
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
