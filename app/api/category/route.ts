import { connectToDatabase } from "@/libs/database"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const db = await connectToDatabase()
    const categories = await db.collection("categories").find().toArray()
    return NextResponse.json(categories, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    )
  }
}
