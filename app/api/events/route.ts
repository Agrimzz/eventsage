import { connectToDatabase } from "@/libs/database"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const db = await connectToDatabase()
    const events = await db.collection("events").find().toArray()
    return NextResponse.json(events, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()

    // Convert FormData to a plain object
    const eventData = {}
    formData.forEach((value, key) => {
      eventData[key] = value
    })

    const db = await connectToDatabase()
    const eventCollection = db.collection("events")

    const result = await eventCollection.insertOne({
      ...eventData,
    })

    return NextResponse.json("Event Added Successfully", { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Failed to add event" }, { status: 500 })
  }
}
