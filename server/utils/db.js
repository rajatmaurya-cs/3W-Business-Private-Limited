import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected ✅: ${res.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed ❌:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

export default connectDB;