import Link from "next/link"
import Image from "next/image"
import { auth, signOut, signIn } from "@/auth"

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
              <Link href="/profile">
                <Image
                  src={session.user.image || ""}
                  alt={session.user.name || ""}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>
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
