"use client"
import React, { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { createOrder } from "@/lib/actions/order.actions"
import Link from "next/link"
import { IconCheck } from "@tabler/icons-react"

const PaymentSuccess = () => {
  const searchParams = useSearchParams()
  const tid = searchParams.get("tid")
  const eid = searchParams.get("eid")
  const uid = searchParams.get("uid")
  const totalAmount = searchParams.get("price")

  useEffect(() => {
    if (!tid || !eid || !uid || !totalAmount) {
      return
    }

    const handleCreateOrder = async () => {
      try {
        await createOrder({
          tid,
          eventId: eid,
          buyerId: uid,
          totalAmount,
        })
      } catch (error) {
        console.error("Error creating order:", error)
      }
    }

    handleCreateOrder()
  }, [tid, eid, uid])

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
            Total Amount : Rs.{totalAmount}
          </p>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess
