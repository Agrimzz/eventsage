import TableData from "@/components/TableData"
import { getAllOrders } from "@/lib/actions/order.actions"
import React from "react"

const Tickets = async () => {
  const order = await getAllOrders()
  const columns = [
    { accessor: "eventTitle", title: "Event Title" },
    { accessor: "organizer", title: "Organizer" },
    { accessor: "organizerEmail", title: "Organizer Email" },
    { accessor: "buyer", title: "Buyer" },
    { accessor: "buyerEmail", title: "Buyer Email" },
    { accessor: "totalAmount", title: "Total Amount" },
  ]
  return (
    <div>
      <h3 className="text-3xl font-bold mb-7">Tickets</h3>
      <TableData records={order} columns={columns} type="order" />
    </div>
  )
}

export default Tickets
