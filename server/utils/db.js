import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not set");
  }

  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!globalThis.__mongooseConnPromise) {
    globalThis.__mongooseConnPromise = mongoose
      .connect(mongoUri)
      .then((m) => {
        console.log(`MongoDB Connected ✅: ${m.connection.host}`);
        return m.connection;
      })
      .catch((error) => {
        globalThis.__mongooseConnPromise = undefined;
        throw error;
      });
  }

  return globalThis.__mongooseConnPromise;
};

export default connectDB;
