"use server"

import {
  CreateOrderParams,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from "@/types"
import { connectToDatabase } from "../database"
import Order from "../database/models/order.models"
import User from "../database/models/user.model"
import Event from "../database/models/event.model"
import { ObjectId } from "mongodb"

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase()

    const orderExits = await Order.findOne({ tid: order.tid })

    if (!orderExits) {
      const newOrder = await Order.create({
        ...order,
        event: order.eventId,
        buyer: order.buyerId,
      })
      return JSON.parse(JSON.stringify(newOrder))
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct("event._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: {
          path: "organizer",
          model: User,
          select: "_id username image",
        },
      })

    const ordersCount = await Order.distinct("event._id").countDocuments(
      conditions
    )

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getOrdersByEvent({
  searchString,
  eventId,
}: GetOrdersByEventParams) {
  try {
    await connectToDatabase()

    if (!eventId) throw new Error("Event ID is required")
    const eventObjectId = new ObjectId(eventId)

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyer: "$buyer.username",
          buyerId: "$buyer._id",
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ])

    return JSON.parse(JSON.stringify(orders))
  } catch (error) {
    console.log(error)
  }
}