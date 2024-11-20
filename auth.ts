import NextAuth from "next-auth"
import { client, connectToDatabase } from "@/lib/database"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import Google from "next-auth/providers/google"
import User from "./lib/database/models/user.model"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google({ allowDangerousEmailAccountLinking: true })],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      await connectToDatabase()
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()

      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDatabase()
        // check if user already exists
        const existingUser = await User.findOne({ email: profile?.email })

        // if not, create a new document and save user in MongoDB
        if (!existingUser) {
          const newUser = {
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            fullname: profile?.name,
            image: profile?.picture,
          }
          await User.create(newUser)
        }

        return true
      } catch (error) {
        //@ts-expect-error error can be any
        console.log("Error checking if user exists: ", error.message)
        return false
      }
    },
  },
})
