import React from "react"
import { createOrder } from "@/lib/actions/order.actions"
import Link from "next/link"
import { IconCheck } from "@tabler/icons-react"
import { addInteraction } from "@/lib/actions/interaction.action"

const PaymentSuccess = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const { tid, eid, uid, price: totalAmount } = searchParams

  if (!tid || !eid || !uid || !totalAmount) {
    return <p>Invalid payment details</p>
  }

  const formattedTotalAmount = parseInt(
    totalAmount.split(",").join("").split(".")[0]
  )

  await createOrder({
    tid,
    eventId: eid,
    buyerId: uid,
    totalAmount: formattedTotalAmount.toString(),
  })

  await addInteraction(uid, eid, "purchase", tid)

  return (
    <>
      <div className="section_container">
        <p className="text-3xl font-bold text-center">
          Events Ticket Purchase Successful. {""}
          <Link href="/profile" className="text-primary underline">
            Check your tickets.
          </Link>
        </p>
        <div className="bg-green-500 p-10 rounded-full mx-auto flex w-fit mt-10">
          <IconCheck color="white" size={80} />
        </div>
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center gap-5 py-8 mt-10 shadow-lg">
          <h3 className="text-3xl font-bold">Ticket Details</h3>
          <p className="text-xl font-semibold">Ticket ID : {tid}</p>
          <p className="text-xl font-semibold">Event ID : {eid}</p>
          <p className="text-xl font-semibold">User ID : {uid}</p>
          <p className="text-xl font-semibold">
            Total Amount : Rs.{formattedTotalAmount}
          </p>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess
