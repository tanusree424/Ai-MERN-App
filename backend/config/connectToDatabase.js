import mongoose from "mongoose";
import dotenv from "dotenv"
const MONGOURI = process.env.MONGOURI  ||  "mongodb://localhost:27017/ai-mern"



const connectToMongoDb = async () => {
  try {
    await mongoose.connect(MONGOURI);

    console.log("Connected To Database:", mongoose.connection.host);
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

export default connectToMongoDb;