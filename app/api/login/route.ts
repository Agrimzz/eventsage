import { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "@/libs/database"
import bcrypt from "bcryptjs"

export async function POST(req: Request, res: Response) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and Password are required" }),
      { status: 401 }
    )
  }

  try {
    const db = await connectToDatabase()
    const usersCollection = db.collection("users")

    // Find the user by email
    const user = await usersCollection.findOne({ email })
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 400 }
      )
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 400 }
      )
    }

    return new Response(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 })
  }
}
