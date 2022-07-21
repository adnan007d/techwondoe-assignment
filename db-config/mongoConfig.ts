import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// Need to add mongoose to global see global.d.ts
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((err) => console.error(err));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
