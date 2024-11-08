"use server"

import { CreateEventParams } from "@/types"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import { promises as fs } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { revalidatePath } from "next/cache"
import Event from "../database/models/event.model"

const populateEvent = async (query: any) => {
  return query.populate({
    path: "organizer",
    model: "User",
    select: "_id email username image",
  })
}

export async function createEvent({
  userId,
  event,
  path: revalidatePathParam,
}: CreateEventParams) {
  try {
    await connectToDatabase()

    const organizer = await User.findOne({ _id: userId })
    if (!organizer) throw new Error("Organizer not found")
    // Process image if it's a File
    if (event.imageUrl) {
      //@ts-expect-error i dont know how to type this
      const imageFile = event.imageUrl as Blob
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      const extension = imageFile.type.split("/")[1]
      const uniqueFileName = `${uuidv4()}.${extension}`

      const imagePath = path.join(
        process.cwd(),
        "public",
        "eventImages",
        uniqueFileName
      )
      await fs.writeFile(imagePath, buffer)

      event.imageUrl = uniqueFileName
    }

    // Create a new event with organizer and updated imageUrl
    const newEvent = await Event.create({
      ...event,
      organizer: userId, // Pass userId as organizer
    })

    // Revalidate the path for dynamic content updates
    revalidatePath(revalidatePathParam)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    console.log(error)
    throw new Error("Failed to create event")
  }
}

export const getEventById = async (id: string) => {
  try {
    await connectToDatabase()
    const event = await populateEvent(Event.findById(id))
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    console.log(error)
    throw new Error("Failed to get event")
  }
}
