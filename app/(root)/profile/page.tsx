import { auth } from "@/auth"
import UserEvents from "@/components/UserEvents"
import React from "react"

const ProfilePage = async () => {
  const session = await auth()
  const id = session?.user?.id as string

  return (
    <>
      <section className="section_container">
        <p className="text-3xl font-bold">My Tickets</p>
        <p className="text-lg text-gray-400 mt-3">No Tickets</p>
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
