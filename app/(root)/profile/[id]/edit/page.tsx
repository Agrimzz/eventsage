import { auth } from "@/auth"
import UserForm from "@/components/UserForm"
import { getUserById } from "@/lib/actions/useractions"
import { redirect } from "next/navigation"
import React from "react"

const EditProfile = async () => {
  const session = await auth()
  if (!session) redirect("/")

  const id = session?.user?.id as string

  const user = await getUserById(id)

  return (
    <>
      <section className="max-w-2xl mx-auto py-10">
        <p className="text-3xl font-bold">Edit Profile</p>
        <UserForm user={user} />
      </section>
    </>
  )
}

export default EditProfile
