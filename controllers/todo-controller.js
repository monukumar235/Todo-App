import todoModel from "../models/todo-model.js";

export const crateTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || title.trim() === "") {
            return res.status(401).json({
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
        const {search , sort , page = 1 ,limit = 10} = req.query;

        // search by title 
        let query = {};
        if(search){
            query.title = { $regex : search, $options : "i"};
        }

        // sort 
        let sortOptions = {};
        if(sort === 'asc') sortOptions.createdAt =1;
        else sortOptions.createdAt = -1;

        // pagination
        let skip =(page -1) * limit;

        const todos = await todoModel.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(parseInt(limit));
        

        const totalTodos = await todoModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            data: todos,
            message: "Fatched Successfully",
            total : totalTodos,
            page : Number(page),
            limit : Number(limit)
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}