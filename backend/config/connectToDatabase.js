import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const MONGOURI = process.env.MONGOURI  



const connectToMongoDb = async () => {
  try {
    await mongoose.connect(MONGOURI);
  

    console.log("Connected To Database:", mongoose.connection.host);
  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

export default connectToMongoDb;