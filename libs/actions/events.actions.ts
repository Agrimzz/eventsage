"use server"

import { connectToDatabase } from "../database"
import { promises as fs } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export const getEvents = async () => {
  try {
    const db = await connectToDatabase()
    const events = await db.collection("events").find().toArray()
    return JSON.parse(JSON.stringify(events))
  } catch (err) {
    console.log(err)
    return []
  }
}
export const getLatestEvents = async () => {
  try {
    const db = await connectToDatabase()
    const events = await db
      .collection("events")
      .find()
      .sort({ $natural: -1 })
      .limit(4)
      .toArray()
    return JSON.parse(JSON.stringify(events))
  } catch (err) {
    console.log(err)
    return []
  }
}

export const createEvent = async (formData: FormData) => {
  try {
    const db = await connectToDatabase()
    const eventCollection = db.collection("events")

    const eventData = Object.fromEntries(formData.entries())

    console.log(eventData.image)

    if (eventData.image) {
      const imageFile = eventData.image as Blob
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

      eventData.image = uniqueFileName
    }

    // Insert the event into the database
    const result = await eventCollection.insertOne({
      ...eventData, // Spread the event data into the object to be inserted
    })

    return "Success"
  } catch (err) {
    console.error("Error creating event:", err)
    return { err: err || "Unknown error" }
  }
}
