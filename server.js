import express from "express";
import cors from "cors"
import { connectToDb } from "./config/db.js";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo_routes.js";


const app = express();

dotenv.config();

connectToDb();

app.use(cors());
app.use(express.json());

app.use("/api",todoRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
});