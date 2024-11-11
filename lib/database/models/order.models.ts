import { model, models, Schema } from "mongoose"

export interface IOrder extends Document {
  tid: string
  totalAmount: number
  event: {
    _id: string
  }
  buyer: {
    _id: string
  }
}

export type IOrderItem = {
  _id: string
  totalAmount: string
  createdAt: string
  eventTitle: string
  eventId: string
  buyer: string
  buyerId: string
}

export type ITicketItem = {
  _id: string
  totalAmount: string
  createdAt: string
  eventTitle: string
  eventId: string
  organizer: string
  organizerId: string
  eventDateTime: string
}

const OrderSchema = new Schema<IOrder>(
  {
    tid: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    event: { type: Schema.Types.ObjectId, ref: "Events" },
    buyer: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
)

const Order = models.Order || model<IOrder>("Order", OrderSchema)

export default Order
