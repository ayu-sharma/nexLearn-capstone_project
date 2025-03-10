import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URL in .env");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "nexlearn-db",
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  console.log("Connected to DB");
  return cached.conn;
}

export default connectToDatabase;
