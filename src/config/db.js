import mongoose from "mongoose";

export function connectDB() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("mongodb connected"))
    .catch(() => console.log("mongodb failed to connect"));
}
