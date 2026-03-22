import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectToMongoDb from "./config/connectToDatabase.js";
import aiRoutes from "./Routes/aiRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config()
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET", "POST", "PUT" ,"DELETE"]
}));
app.use("/api/ai", aiRoutes);
const PORT = process.env.PORT || 5000;

app.get("/", async (req,res) => {
    res.send("Hello world")
})

const serverConnect = async () => {
    try {
      await  connectToMongoDb();
        app.listen(PORT , ()=>{
    console.log(`Server Running on PORT : http://localhost:${PORT}`)

} );
    } catch (error) {
        console.log(error)
    }
}

serverConnect()
