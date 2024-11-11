import { IEvent } from "@/lib/database/models/event.model"
import { Button } from "@mantine/core"
import React from "react"

const Checkout = ({ event, userId }: { event: IEvent; userId: string }) => {
  const isOrganizer = userId === event.organizer._id
  const isDisabled = isOrganizer || !userId

  const esewaMerchantCode = "EPAYTEST"
  const transactionId = `${event._id}_${userId}_${Date.now()}`
  const successUrl = `http://localhost:3000/payment-success?tid=${transactionId}&eid=${event._id}&uid=${userId}&price=${event.price}`
  const failureUrl = "http://localhost:3000/payment-failure"

  return (
    <form action="https://uat.esewa.com.np/epay/main" method="POST">
      <input type="hidden" name="amt" value={event.price.toString()} />
      <input type="hidden" name="pdc" value="0" />
      <input type="hidden" name="psc" value="0" />
      <input type="hidden" name="txAmt" value="0" />
      <input type="hidden" name="tAmt" value={event.price.toString()} />
      <input type="hidden" name="pid" value={transactionId} />
      <input type="hidden" name="scd" value={esewaMerchantCode} />
      <input type="hidden" name="su" value={successUrl} />
      <input type="hidden" name="fu" value={failureUrl} />

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
