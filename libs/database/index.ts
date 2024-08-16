import { Db, MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  await client.connect()

  const db = client.db("eventsage")
  cachedDb = db
  return db
}
