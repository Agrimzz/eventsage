"use client"
import React from "react"
import { DataTable } from "mantine-datatable"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import Link from "next/link"
import DeleteConfirmation from "./DeleteConfirmation"
import { deleteUser } from "@/lib/actions/useractions"
import { modals } from "@mantine/modals"

const TableData = ({
  records,
  columns,
  type,
}: {
  records: any[]
  columns: any[]
  type: string
}) => {
  const openDeleteModal = (id: string) => () => {
    modals.openConfirmModal({
      title: "Are you sure you want to delete this user?",
      centered: true,
      color: "red",
      children: (
        <p className="text-black">
          Once deleted, you will not be able to recover this user.
        </p>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => await deleteUser(id),
    })
  }

  const updatedColumns = [
    ...columns,
    {
      accessor: "actions",
      title: "Actions",
      render: (data) => (
        <div className="flex gap-2 justify-end">
          {type === "event" ? (
            <>
              <Link href={`/events/${data._id}/update`}>
                <IconPencil color="green" />
              </Link>
              <DeleteConfirmation id={data._id} />
            </>
          ) : type === "user" ? (
            <IconTrash color="red" onClick={openDeleteModal(data._id)} />
          ) : (
            <p className="text-base text-gray-400">No actions</p>
          )}
        </div>
      ),
    },
  ]
  return (
    <DataTable
      width="100%"
      withTableBorder
      borderRadius="md"
      withColumnBorders
      striped
      highlightOnHover
      records={records}
      columns={updatedColumns}
    />
  )
}

export default TableData
