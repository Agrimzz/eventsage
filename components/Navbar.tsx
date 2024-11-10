import Link from "next/link"
import { auth, signOut, signIn } from "@/auth"

import ProfileMenu from "./ProfileMenu"

const Navbar = async () => {
  const session = await auth()

  return (
    <header className="px-5 py-3 bg-white shadow-sm z-50 sticky top-0">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <span className="text-3xl font-bold">
            Event<span className="text-primary">Sage</span>
          </span>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/events/create">
                <span className="max-sm:hidden">Create</span>
              </Link>

              <form
                action={async () => {
                  "use server"

                  await signOut({ redirectTo: "/" })
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                </button>
              </form>
              <ProfileMenu
                id={session.user.id as string}
                image={session.user.image as string}
                name={session.user.name as string}
              />
            </>
          ) : (
            <form
              action={async () => {
                "use server"

                await signIn("google")
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
