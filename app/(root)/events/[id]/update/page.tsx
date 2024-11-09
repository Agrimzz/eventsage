import { auth } from "@/auth"
import EventForm from "@/components/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { redirect } from "next/navigation"
import React from "react"

const Update = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth()
  const userId = session?.user?.id as string

  if (!session) redirect("/")

  const id = (await params).id
  const event = await getEventById(id)
  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <h1 className="heading">Update your event</h1>
      </section>
      <EventForm
        userId={userId}
        type="update"
        event={event}
        eventId={event._id}
      />
    </>
  )
}

export default Update
