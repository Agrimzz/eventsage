import { categories, categoryLabels } from "@/constants"
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

type Interaction = {
  category: string
  weight: number
}

function createEventVector(event: EventDetails): number[] {
  return categoryLabels.map((category) => (event.category === category ? 1 : 0))
}

function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  const dotProduct = vectorA.reduce((sum, val, i) => sum + val * vectorB[i], 0)
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB || 1) // Avoid division by zero
}

export function recommendEvents(
  userVector: number[] | null,
  allEvents: EventDetails[],
  numRecommendations: number = 6
): EventDetails[] {
  if (userVector === null) {
    // Handle new users by returning popular or default events
    return getDefaultRecommendedEvents(allEvents)
  }
  // Calculate the similarity scores
  const scoredEvents = allEvents.map((event) => {
    const eventVector = createEventVector(event)
    const similarityScore = cosineSimilarity(userVector, eventVector)
    return { event, similarityScore }
  })

  // Sort events by similarity score
  scoredEvents.sort((a, b) => b.similarityScore - a.similarityScore)

  // Select top recommendations based on categories for diversity
  const selectedEvents: EventDetails[] = []
  const categoryCount: Record<string, number> = {}

  for (const scoredEvent of scoredEvents) {
    const { event } = scoredEvent
    const category = event.category

    // Limit the number of events per category to allow diversity
    if (!categoryCount[category]) categoryCount[category] = 0

    if (categoryCount[category] < 2) {
      // Limit to 2 events per category
      selectedEvents.push(event)
      categoryCount[category]++
    }

    if (selectedEvents.length >= numRecommendations) break
  }

  return selectedEvents
}

export function createUserVector(
  userInteractions: Interaction[]
): number[] | null {
  if (!userInteractions || userInteractions.length === 0) {
    // No interactions found for the user
    return null
  }
  const vector = Array(categories.length).fill(0)

  userInteractions.forEach((interaction) => {
    const category = categories.find(
      (cat) => cat.label === interaction.category
    )
    if (category) {
      const categoryIndex = categories.indexOf(category)
      vector[categoryIndex] += interaction.weight
    }
  })

  return vector
}

function getDefaultRecommendedEvents(
  allEvents: EventDetails[],
  numRecommendations: number = 6
): EventDetails[] {
  const eventsByCategory: Record<string, EventDetails[]> = {}

  // Organize events by category
  allEvents.forEach((event) => {
    if (!eventsByCategory[event.category]) eventsByCategory[event.category] = []
    eventsByCategory[event.category].push(event)
  })

  const selectedEvents: EventDetails[] = []
  const categories = Object.keys(eventsByCategory)

  // Randomly pick events from each category to diversify recommendations
  while (selectedEvents.length < numRecommendations && categories.length > 0) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)]
    const events = eventsByCategory[randomCategory]

    if (events.length > 0) {
      selectedEvents.push(events.shift()!) // Add the first event and remove it from the list
    } else {
      categories.splice(categories.indexOf(randomCategory), 1) // Remove empty category
    }
  }

  return selectedEvents
}
