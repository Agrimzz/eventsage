// models/Interaction.js
import mongoose, { model, models, Schema } from "mongoose"

const InteractionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  type: {
    type: String,
    enum: ["view", "purchase"],
    required: true,
  },
  weight: {
    type: Number,
    default: 1,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const Interaction =
  models.Interaction || model("Interaction", InteractionSchema)
export default Interaction
