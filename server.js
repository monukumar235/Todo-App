import express from "express";
import cors from "cors"


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Todo Api is running..");
});


app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});