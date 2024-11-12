import { EventDetails } from "@/types"

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371 // Radius of Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

export function findClosestEvents(
  userLat: number | undefined,
  userLng: number | undefined,
  events: EventDetails[],
  radius: number | undefined
) {
  if (!userLat || !userLng || !radius) return []
  return events
    .map((event) => {
      const distance = haversineDistance(
        userLat,
        userLng,
        event.latitude,
        event.longitude
      )
      return { ...event, distance }
    })
    .filter((event) => event.distance <= radius) // Only include events within the radius
    .sort((a, b) => a.distance - b.distance) // Sort by closest distance
}
