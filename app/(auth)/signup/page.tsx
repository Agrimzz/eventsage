"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Register() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmpassword) {
      setError("Password do not match")
    } else {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({ fullName, email, password }),
        })

        if (res.ok) {
          router.push("/signin")
        } else if (res.status === 400) {
          const data = await res.json()
          setError(data.message)
        } else {
          const data = await res.json()
          setError(data.message)
        }
      } catch (error) {
        console.log(error)
        setError("Something went wrong")
      }
    }
  }

  return (
    <div className="max-w-xl h-auto bg-grey py-12 px-12 m-auto mt-40 rounded-lg flex flex-col gap-12 z-50">
      <h2 className="h2-bold text-center">Sign up</h2>
      <form className="space-y-6" onSubmit={handleRegister} method="post">
        <div>
          <label className="block font-semibold mb-2">Full name:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none "
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Email:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none "
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Password:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none "
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Confirm Password:</label>
          <input
            className="w-full px-4 py-2 bg-black border border-gray-300 rounded-md focus:outline-none "
            type="password"
            placeholder="*******"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-300 text-center">{error}</p>}
        <p className="text-center">
          Already have an account?{" "}
          <a href="/signin" className="font-bold underline">
            Sign In
          </a>
        </p>
        <button
          type="submit"
          className="w-full bg-primary text-white weight-bold py-4 rounded-full text-lg font-bold"
        >
          Register
        </button>
      </form>
    </div>
  )
}
