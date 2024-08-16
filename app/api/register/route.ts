import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/libs/database"
import bcrypt from "bcryptjs"

export async function POST(req: Request, res: Response) {
  const { fullName, email, password } = await req.json()

  if (!fullName || !email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and Password are required" }),
      { status: 401 }
    )
  }

  try {
    const db = await connectToDatabase()
    const usersCollection = db.collection("users")

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists." }), {
        status: 400,
      })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const result = await usersCollection.insertOne({
      full_name: fullName,
      email,
      password: hashedPassword,
    })

    return new Response(
      JSON.stringify({ message: "User registered successfully." }),
      { status: 201 }
    )
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
