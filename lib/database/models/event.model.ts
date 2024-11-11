import { Document, Schema, model, models } from "mongoose"

export interface IEvent extends Document {
  title: string
  category: string
  description: string
  info: string
  imageUrl: string
  startDateTime: Date
  endDateTime: Date
  location: string
  mapLink: string
  url: string
  price: number
  ticketDate: Date
  views: number
  longitude: number
  latitude: number
  organizer: { _id: string; username: string; email: string }
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    info: { type: String, required: true },
    imageUrl: { type: String },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    location: { type: String, required: true },
    mapLink: { type: String },
    url: { type: String },
    price: { type: Number, required: true, max: 5000 },
    ticketDate: { type: Date, required: true },
    views: { type: Number, default: 0 },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    organizer: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  {
    timestamps: true,
  }
)

// if (models.Event) {
//   delete models.Event
// }

const Event = models.Event || model<IEvent>("Event", EventSchema)

export default Event
