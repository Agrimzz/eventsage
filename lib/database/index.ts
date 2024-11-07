import { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017/eventsage" // Replace with your database name
export const client = new MongoClient(uri)
import mongoose from "mongoose"

let isConnected = false

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Database is already connected")
    return
  }

  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri)
    isConnected = true
    console.log("Connected to MongoDB with Mongoose")
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
    throw error
  }
}
