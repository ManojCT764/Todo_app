const Todo = require('../models/todoModel')

exports.getTodos = async(req, res) => {
    console.log("Fetching all todos from the DB");
    try {
        const todos = await Todo.find();
        console.log("Fetched todos from the DB", todos);
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error while fetching todos:", error);
        res.status(500).json({ error: "Error fetching todos" });
    }
}

exports.addTodo = async (req, res) => {
    const { title } = req.body; // Correct destructuring

    console.log("Adding a new todo", title);
    const newTodo = new Todo({ title });

    try {
        console.log("Adding the todo to DB", newTodo);
        const savedTodo = await newTodo.save();
        console.log("Added the todo to DB", savedTodo);
        res.status(200).json(savedTodo);
    } catch (error) {
        console.error("Error saving todo:", error);
        res.status(500).json({ error: "Error saving todo" });
    }
}