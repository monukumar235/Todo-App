import todoModel from "../models/todo-model.js";
import mongoose from "mongoose";

export const crateTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const todo = await todoModel.create({
            title, description
        });

        return res.status(201).json({
            message: "Create successfully..",
            success: true,
            data: todo
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        });
    }
}


export const getAllTodos = async (req, res) => {
    try {
        const { search, sort, page = 1, limit = 10 } = req.query;

        // search by title 
        let query = {};
        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        // sort 
        let sortOptions = {};
        if (sort === 'asc') sortOptions.createdAt = 1;
        else sortOptions.createdAt = -1;

        // pagination
        let skip = (page - 1) * limit;

        const todos = await todoModel.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));


        const totalTodos = await todoModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            data: todos,
            message: "Fatched Successfully",
            total: totalTodos,
            page: Number(page),
            limit: Number(limit)
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

export const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Todo Id is not valid"
            });
        }
        const todo = await todoModel.findById(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }
        return res.status(200).json({
            message: "Todo Found SuccessFully",
            success: true,
            data: todo
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Todo Id id not valid"
            });
        }

        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "title is required"
            })
        }
        const todo = await todoModel.findByIdAndUpdate(id, { title, description }, { new: true, runOnValidator: true });

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Updated Successfully.",
            data: todo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const updateCompleted = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Todo id is not valid"
            });
        }
        const todo = await todoModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!todo) {
            return res.status(401).json({
                success: false,
                message: "Todo not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Updated Successfully",
            data: todo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success : false,
                message : "Todo id is not valid"
            });
        }

        const todo = await todoModel.findByIdAndDelete(id);

        if(!todo){
            return res.status(401).json({
                success : false,
                message : "Todo not found"
            });
        }
        return res.status(200).json({
            success : true,
            message : "Deleted Successfully",
            data : todo
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}