import {
  IconCalendarEvent,
  IconHome,
  IconLogout,
  IconTicket,
  IconUsers,
} from "@tabler/icons-react"
import Link from "next/link"
import React from "react"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-2 h-screen overflow-y-auto">
      <div className="py-8 px-4 sticky top-0 shadow-md w-[300px]">
        <h3 className="text-3xl font-bold text-center">
          Event<span className="text-primary">Sage</span>
        </h3>

        <div className="flex flex-col  mt-7  h-full">
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/dashboard"
              className="flex gap-2 items-center hover:bg-primary/20 p-2 rounded-md"
            >
              <IconHome />
              <p className="text-lg font-semibold">Dashboard</p>
            </Link>
            <Link
              href="/admin/dashboard/events"
              className="flex gap-2 items-center hover:bg-primary/20 p-2 rounded-md"
            >
              <IconCalendarEvent />
              <p className="text-lg font-semibold">Events</p>
            </Link>
            <Link
              href="/admin/dashboard/users"
              className="flex gap-2 items-center hover:bg-primary/20 p-2 rounded-md"
            >
              <IconUsers />
              <p className="text-lg font-semibold">Users</p>
            </Link>
            <Link
              href="/admin/dashboard/tickets"
              className="flex gap-2 items-center hover:bg-primary/20 p-2 rounded-md"
            >
              <IconTicket />
              <p className="text-lg font-semibold">Tickets</p>
            </Link>
          </div>
          <div className="mt-[600px] flex gap-2 items-center py-3 border-t justify-center">
            <p className="text-lg font-bold">Admin</p>
            <IconLogout color="red" className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="h-full px-4 py-8 w-full">{children}</div>
    </div>
  )
}

export default AdminLayout
