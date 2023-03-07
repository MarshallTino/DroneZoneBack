import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, minLength: 10, required: true },
  drones: [],
});

export const User = model("User", userSchema, "user");

export default User;
