"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        localStorage.setItem("token", data)
        router.push("/")
      } else {
        const data = await res.json()
        console.log(data.message)
        setError(data.message)
      }
    } catch (error) {
      setError("Something went wrong")
    }
  }

  return (
    <div className="max-w-xl h-auto bg-grey py-12 px-12 m-auto mt-40 rounded-lg flex flex-col gap-12 z-40">
      <h2 className="h2-bold text-center">Sign In</h2>
      <form className="space-y-6" onSubmit={handleLogin}>
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
        {error && <p className="text-red-300 text-center">{error}</p>}
        <p className="text-center">
          Dont have an account?{" "}
          <a href="/signup" className="font-bold underline">
            Sign Up
          </a>
        </p>
        <button
          type="submit"
          className="w-full bg-primary text-white weight-bold py-4 rounded-full text-lg font-bold"
        >
          Login
        </button>
      </form>
    </div>
  )
}
