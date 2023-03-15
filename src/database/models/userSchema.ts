import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, minLength: 8, required: true },
});

export const User = model("User", userSchema, "users");

export default User;
