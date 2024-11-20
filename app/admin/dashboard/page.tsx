import { getEventsCount } from "@/lib/actions/event.actions"
import { getOrdersCount } from "@/lib/actions/order.actions"
import { getUsersCount } from "@/lib/actions/useractions"
import { SimpleGrid } from "@mantine/core"
import { IconCalendarEvent } from "@tabler/icons-react"
import Link from "next/link"
import React from "react"

const Dashboard = async () => {
  const [eventCount, ticketCount, usersCount] = await Promise.all([
    getEventsCount(),
    getOrdersCount(),
    getUsersCount(),
  ])
  return (
    <div className="w-full">
      <h3 className="text-3xl font-bold mb-7">Admin Dashboard</h3>
      <SimpleGrid cols={2} w="100%">
        <Link href="/admin/dashboard/events">
          <div className="flex flex-col py-5 px-7 border border-gray-300 rounded-lg shadow-lg hover:bg-slate-100">
            <div className="flex-between w-full text-primary ">
              <p className="text-semibold ">Total Events</p>
              <IconCalendarEvent />
            </div>
            <p className="text-3xl font-bold mt-5">{eventCount} events</p>
            <p className="text-sm text-gray-400">
              Total number of events posted in EventSage.
            </p>
          </div>
        </Link>
        <Link href="/admin/dashboard/users">
          <div className="flex flex-col py-5 px-7 border border-gray-300 rounded-lg shadow-lg hover:bg-slate-100">
            <div className="flex-between w-full text-primary ">
              <p className="text-semibold ">Total Users</p>
              <IconCalendarEvent />
            </div>
            <p className="text-3xl font-bold mt-5">{usersCount} users</p>
            <p className="text-sm text-gray-400">
              Total number of users registered in EventSage.
            </p>
          </div>
        </Link>
        <Link href="/admin/dashboard/tickets">
          <div className="flex flex-col py-5 px-7 border border-gray-300 rounded-lg shadow-lg hover:bg-slate-100">
            <div className="flex-between w-full text-primary ">
              <p className="text-semibold ">Total Tickets Sold</p>
              <IconCalendarEvent />
            </div>
            <p className="text-3xl font-bold mt-5">{ticketCount} ticket</p>
            <p className="text-sm text-gray-400">
              Total number of tickets sold in EventSage.
            </p>
          </div>
        </Link>
      </SimpleGrid>
    </div>
  )
}

export default Dashboard
