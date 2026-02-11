import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: [2, "name must be at least 2 characters"],
      maxlength: [100, "name must be at most 100 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      required: false,
      default: "uploads/avatar.png",
    },
  },
  { timestamps: true, versionKey: false },
);

const User = mongoose.model("User", userSchema);

export { User };
