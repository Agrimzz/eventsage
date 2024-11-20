import TableData from "@/components/TableData"
import { getAllUsers } from "@/lib/actions/useractions"
import React from "react"

const Users = async () => {
  const users = await getAllUsers()
  const columns = [
    {
      accessor: "_id",
      title: "Id",
    },
    {
      accessor: "email",
      title: "Email",
    },
    {
      accessor: "username",
      title: "Username",
    },
  ]
  return (
    <div>
      <h3 className="text-3xl font-bold mb-7">Users</h3>
      <TableData records={users} columns={columns} type="user" />
    </div>
  )
}

export default Users
