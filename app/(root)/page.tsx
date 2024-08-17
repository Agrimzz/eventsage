"use client"
import Hero from "@/components/shared/Home/Hero"
import HomeText from "@/components/shared/Home/HomeText"
import LatestEvents from "@/components/shared/Home/LatestEvents"
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
      <HomeText />
      <LatestEvents />
    </div>
  )
}
