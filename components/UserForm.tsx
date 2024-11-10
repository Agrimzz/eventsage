"use client"
import { Organizer } from "@/types"
import { TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import React from "react"
import { formStyles } from "./EventForm"
import Image from "next/image"
import { modals } from "@mantine/modals"
import { userFormSchema } from "@/lib/validator"
import { updateUser } from "@/lib/actions/useractions"
import { useRouter } from "next/navigation"

const UserForm = ({ user }: { user: Organizer }) => {
  const router = useRouter()
  const form = useForm({
    initialValues: {
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
    },
    validate: zodResolver(userFormSchema),
  })

  const openModal = () =>
    modals.openConfirmModal({
      title: "Update User",
      centered: true,
      children: (
        <p>
          Are you sure you want to update this user? This action cannot be
          undone.
        </p>
      ),
      labels: { confirm: "Update", cancel: "Cancel" },
      confirmProps: { color: "#2B64EE" },
      onConfirm: () => handleSubmit(),
      onCancel: () => modals.closeAll(),
    })

  const handleSubmit = async () => {
    try {
      const updatedUser = await updateUser(user._id, form.values)
      if (updatedUser) {
        router.push(`/profile/${updatedUser._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full flex mt-7 gap-10">
      <div>
        <Image
          src={user.image}
          alt="profile"
          width={220}
          height={220}
          className="profile_image"
        />
      </div>
      <form className="w-full space-y-4" onSubmit={form.onSubmit(openModal)}>
        <TextInput
          label="Username"
          placeholder="Username"
          size="lg"
          styles={formStyles}
          {...form.getInputProps("username")}
        />
        <TextInput
          label="Email"
          size="lg"
          styles={formStyles}
          {...form.getInputProps("email")}
          disabled
        />
        <button className="bg-primary text-white px-5 py-3 mt-5 rounded-full font-semibold">
          Update
        </button>
      </form>
    </div>
  )
}

export default UserForm
