import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠ Please define MONGODB_URI inside .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    }).catch((error) => {
      console.error("MongoDB connection error:", error);
      throw error;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
