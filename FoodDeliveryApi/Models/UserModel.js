import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required!"],
    },
    email: {
      type: String,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      required: [true, "Email is Required!"],
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
    },
    phone_number: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Address is Required!"],
    },
    role: {
      type: String,
      enum: ["customer", "restaurant", "driver"],
      default: "customer",
      required: [true, "Role is Required!"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
