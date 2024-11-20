import mongoose from "mongoose"
import Interaction from "../database/models/interaction.models"

export async function addInteraction(
  userId: string,
  eventId: string,
  type: string,
  tid?: string
) {
  const weightMap: { [key: string]: number } = { view: 1, purchase: 3 }
  const weight = weightMap[type] || 1

  try {
    if (type === "purchase" && tid) {
      const existingInteraction = await Interaction.findOne({
        tid,
        userId,
        eventId,
      })
      if (existingInteraction) {
        console.log("Interaction with this transaction ID already exists.")
        return existingInteraction
      }
    }

    const interaction = await Interaction.create({
      userId,
      eventId,
      type,
      weight,
      tid: type === "purchase" ? tid : undefined,
    })
    return interaction
  } catch (error) {
    console.error("Error saving interaction:", error)
    throw error
  }
}

export async function getUserInteractions(userId: string) {
  const interactions = await Interaction.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "events",
        localField: "eventId",
        foreignField: "_id",
        as: "eventDetails",
      },
    },
    { $unwind: "$eventDetails" },
    {
      $group: {
        _id: "$eventDetails.category",
        totalWeight: { $sum: "$weight" },
      },
    },
  ])

  return interactions.map((interaction) => ({
    category: interaction._id,
    weight: interaction.totalWeight,
  }))
}
