"use server"

import { connectToDatabase } from "../database"

export const getAllCategories = async () => {
  try {
    const db = await connectToDatabase()
    const categories = await db.collection("categories").find().toArray()

    return JSON.parse(JSON.stringify(categories))
  } catch (err) {
    return JSON.stringify({ err: err })
  }
}
