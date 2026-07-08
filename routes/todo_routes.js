import express from 'express';
import { crateTodo,getAllTodos } from '../controllers/todo-controller.js';

const route = express.Router();

route.get("/",(req,res)=>{
    res.send("Todo Api is Running");
});

route.post("/add",crateTodo);

route.get("/todos",getAllTodos);

export default route;