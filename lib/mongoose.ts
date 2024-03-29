import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing Mongodb_URL");
  }

  if (isConnected) {
    return console.log("Mongdb is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });

    isConnected = true;
    console.log("Mongodb connected");
  } catch (error) {
    console.log("MongoDB connection failed: ", error);
  }
};
