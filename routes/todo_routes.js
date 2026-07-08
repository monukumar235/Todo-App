import express from 'express';
import { crateTodo,getAllTodos,getTodoById,updateTodo,updateCompleted,deleteTodo} from '../controllers/todo-controller.js';

const route = express.Router();

route.get("/",(req,res)=>{
    res.send("Todo Api is Running");
});

route.post("/add",crateTodo);
route.get("/todos",getAllTodos);
route.get("/todo/:id",getTodoById);
route.put("/todo/update/:id",updateTodo);
route.patch("/todo/update/:id",updateCompleted);
route.delete("/todo/delete/:id",deleteTodo);

export default route;