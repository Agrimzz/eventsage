"use client"
import Hero from "@/components/shared/Home/Hero"
import { useEffect } from "react"

export default function Home() {
  const fetchPosts = async () => {
    const response = await fetch("/api/events")
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div>
      <Hero />
    </div>
  )
}
