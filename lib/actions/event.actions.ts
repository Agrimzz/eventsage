"use server"

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types"
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

export async function updateEvent({
  userId,
  event,
  path: revalidatePathParam,
}: UpdateEventParams) {
  try {
    await connectToDatabase()

    const organizer = await User.findOne({ _id: userId })
    if (!organizer) throw new Error("Organizer not found")

    const eventToUpdate = await Event.findById(event._id)
    if (!eventToUpdate) throw new Error("Event not found")
    // Process image if it's a File

    console.log(event, eventToUpdate)

    if (event.imageUrl && typeof event.imageUrl !== "string") {
      const previousImagePath = path.join(
        process.cwd(),
        "public",
        "eventImages",
        eventToUpdate.imageUrl
      )
      // Delete the previous image file if it exists
      await fs.unlink(previousImagePath).catch(() => {
        console.log("Previous image file not found or already deleted")
      })

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

    const updatedEvent = await Event.findByIdAndUpdate(event._id, {
      ...event,
      organizer: userId, // Pass userId as organizer
    })

    // Revalidate the path for dynamic content updates
    revalidatePath(revalidatePathParam)

    return JSON.parse(JSON.stringify(updatedEvent))
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

export async function getAllEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {}

    const categoryCondition = category ? { category: category } : {}

    const conditions = {
      $and: [titleCondition, categoryCondition],
    }

    const skipAmount = (Number(page) - 1) * limit
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    console.log(error)
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

export async function deleteEvent({
  id,
  path: revalidatePathParam,
}: DeleteEventParams) {
  try {
    await connectToDatabase()
    const eventToDelete = await Event.findByIdAndDelete(id)
    if (eventToDelete?.imageUrl) {
      const imagePath = path.join(
        process.cwd(),
        "public",
        "eventImages",
        eventToDelete.imageUrl
      )
      // Delete the image file if it exists
      await fs.unlink(imagePath).catch(() => {
        console.log("Image file not found or already deleted")
      })
    }
    if (eventToDelete) revalidatePath(revalidatePathParam)
  } catch (error) {
    console.log(error)
    throw new Error("Failed to delete event")
  }
}

export async function getEventsByUser({
  id,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { organizer: id }
    const skipAmount = (page - 1) * limit

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getLatestEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    await connectToDatabase()

    const currentDate = new Date()

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {}

    const categoryCondition = category ? { category } : {}

    // Condition to filter events whose end date has not passed
    const dateCondition = { endDateTime: { $gte: currentDate } }

    const conditions = {
      $and: [titleCondition, categoryCondition, dateCondition],
    }

    const skipAmount = (Number(page) - 1) * limit

    const eventsQuery = Event.find(conditions)
      .sort({ startDateTime: 1 }) // Sort by start date in ascending order
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getRelatedEventsByCategory({
  category,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectToDatabase()
    const currentDate = new Date()

    const skipAmount = (Number(page) - 1) * limit
    const dateCondition = { endDateTime: { $gte: currentDate } }
    // Use the category name directly to filter and exclude the current event by its _id
    const conditions = {
      $and: [{ category }, { _id: { $ne: eventId } }, dateCondition],
    }

    const eventsQuery = Event.find(conditions)
      .sort({ views: "desc" })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    console.log(error)
  }
}
