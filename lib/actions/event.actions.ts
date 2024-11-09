"use server"

import { CreateEventParams, GetAllEventsParams } from "@/types"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import { promises as fs } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import { revalidatePath } from "next/cache"
import Event from "../database/models/event.model"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      views: 0,
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

export const getAllEvents = async ({
  query,
  limit = 6,
  page = 1,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDatabase()
    const conditions = {}
    const eventQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit)

    const events = await populateEvent(eventQuery)
    const eventsCount = await Event.countDocuments(conditions)
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    console.log(error)
    throw new Error("Failed to get event")
  }
}

export const incrementEventViews = async (eventId: string) => {
  try {
    await connectToDatabase()

    // Increment the views field by 1
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { $inc: { views: 1 } },
      { new: true } // Returns the updated document after incrementing
    )

    if (!updatedEvent) throw new Error("Event not found")

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    console.log(error)
    throw new Error("Failed to increment event views")
  }
}
