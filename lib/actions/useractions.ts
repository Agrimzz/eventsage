"use server"
import { Organizer } from "@/types"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"

export async function getUserById(id: string) {
  try {
    await connectToDatabase()
    const user = await User.findById(id)
    if (!user) throw new Error("User not found")
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.log(error)
    throw new Error("Failed to get user")
  }
}

export async function updateUser(id: string, data: Organizer) {
  try {
    await connectToDatabase()
    const user = await User.findByIdAndUpdate(id, data, { new: true })
    if (!user) throw new Error("User not found")
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.log(error)
    throw new Error("Failed to update user")
  }
}
