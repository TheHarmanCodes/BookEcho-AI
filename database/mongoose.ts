import dns from "dns";
if (process.env.NODE_ENV === "development") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error("MongoDb URI must be set within .env");

declare global {
  //global storage
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }

  //setting the connection and at last returning it
  try {
    cached.conn = await cached.promise;
    console.log("Connected to Db");
  } catch (err) {
    cached.promise = null;
    console.error(
      "MongoDB connection error. Please make sure MongoDB is running.",
    );
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    throw err;
  }

  return cached.conn;
};
