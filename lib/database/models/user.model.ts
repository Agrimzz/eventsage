import { model, models, Schema } from "mongoose"

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  image: {
    type: String,
  },
  instagram: {
    type: String,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
  twitter: {
    type: String,
    default: "",
  },
})

// if (models.User) {
//   delete models.User
// }

const User = models.User || model("User", UserSchema)

export default User
