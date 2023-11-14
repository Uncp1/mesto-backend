import { Model, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  about: {
    type: String,
    min: 2,
    max: 200,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    min: 2,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const User = model("User", userSchema);
export default User;
