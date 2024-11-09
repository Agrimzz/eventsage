"use client"
import { deleteEvent } from "@/lib/actions/event.actions"
import { modals } from "@mantine/modals"
import { IconTrash } from "@tabler/icons-react"
import { usePathname } from "next/navigation"
import React from "react"

const DeleteConfirmation = ({ id }: { id: string }) => {
  const path = usePathname()
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this event?",
      centered: true,
      color: "red",
      children: (
        <p className="text-black">
          Once deleted, you will not be able to recover this event.
        </p>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => await deleteEvent({ id, path }),
    })
  return (
    <>
      <IconTrash
        color="red"
        onClick={openDeleteModal}
        className="cursor-pointer"
      />
    </>
  )
}

export default DeleteConfirmation
