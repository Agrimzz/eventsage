import { IEvent } from "@/lib/database/models/event.model"
import { Button } from "@mantine/core"
import React from "react"
import CryptoJS from "crypto-js"

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const isOrganizer = userId === event.organizer._id
  const ticketStatus = new Date(event.ticketDate) < new Date()
  const isDisabled = isOrganizer || !userId || ticketStatus

  const esewaMerchantCode = "EPAYTEST"
  const transactionId = `${event._id}_${userId}_${Date.now()}`
  const successUrl = `http://localhost:3000/payment-success?tid=${transactionId}&eid=${event._id}&uid=${userId}&price=${event.price}`
  const failureUrl = "http://localhost:3000/payment-failure"
  const signature = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(
      `total_amount=${event.price.toString()},transaction_uuid=${transactionId},product_code=${esewaMerchantCode}`,
      "8gBm/:&EnhH.1/q"
    )
  )
  console.log(signature)

  return (
    <form
      // action="https://uat.esewa.com.np/epay/main"
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
      className="w-full"
    >
      <input type="hidden" name="amount" value={event.price.toString()} />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="total_amount" value={event.price.toString()} />
      <input type="hidden" name="transaction_uuid" value={transactionId} />
      <input type="hidden" name="product_code" value={esewaMerchantCode} />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input type="hidden" name="success_url" value={successUrl} />
      <input type="hidden" name="failure_url" value={failureUrl} />
      <input
        type="hidden"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
      />
      <input type="hidden" name="signature" value={signature} />

      {/* <input type="hidden" name="amt" value={event.price.toString()} />
      <input type="hidden" name="pdc" value="0" />
      <input type="hidden" name="psc" value="0" />
      <input type="hidden" name="txAmt" value="0" />
      <input type="hidden" name="tAmt" value={event.price.toString()} />
      <input type="hidden" name="pid" value={transactionId} />
      <input type="hidden" name="scd" value={esewaMerchantCode} />
      <input type="hidden" name="su" value={successUrl} />
      <input type="hidden" name="fu" value={failureUrl} /> */}
      <Button
        disabled={isDisabled}
        bg={isDisabled ? "#b0b0b0" : "#2B64EE"}
        c="white"
        w="100%"
        style={{
          borderRadius: "99rem",
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        size="md"
        type="submit"
      >
        {event.price === 0 ? "Get Tickets" : "Buy Tickets"}
      </Button>
    </form>
  )
}

export default Checkout
