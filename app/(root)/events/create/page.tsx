import { auth } from "@/auth"
import EventForm from "@/components/EventForm"
import { redirect } from "next/navigation"
import React from "react"

const CreateEvent = async () => {
  const session = await auth()

  const userId = session?.user?.id as string

  if (!session) redirect("/")
  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <h1 className="heading">Create your event</h1>
      </section>
      <EventForm userId={userId} type="create" />
    </>
  )
}

export default CreateEvent
