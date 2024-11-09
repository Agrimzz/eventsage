import { auth } from "@/auth"
import UserEvents from "@/components/UserEvents"
import { getUserById } from "@/lib/actions/useractions"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"

const OrganizerPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id
  const session = await auth()
  const userId = session?.user?.id as string

  const user = await getUserById(id)
  if (!user) return notFound()
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-2xl font-bold uppercase text-center line-clamp-1">
              {user.username}
            </h3>
          </div>
          <Image
            src={user.image}
            alt="profile"
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="mt-7 text-center text-base font-medium">
            {user?.email}
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <div className="flex-between">
            <p className="text-3xl font-bold">
              {userId === user._id ? "Your" : "All"} Events
            </p>
            {userId === user._id && (
              <Link href="/events/create">
                <button className="bg-primary text-white px-5 py-3 rounded-full hover:bg-primary/80 font-bold">
                  Create New Event
                </button>
              </Link>
            )}
          </div>

          <ul className="card_grid-sm">
            <UserEvents id={id} />
          </ul>
        </div>
      </section>
    </>
  )
}

export default OrganizerPage
