import { connectToDatabase } from "@/libs/database"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const db = await connectToDatabase()
    const events = await db.collection("users").find().toArray()
    return NextResponse.json(events, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}
