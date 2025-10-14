const Todo = require('../models/todoModel')
const logger = require('../Utils/logger')

exports.getTodos = async(req, res) => {
    logger.info("Fetching all todos from the DB");
    try {
        const todos = await Todo.find();
        logger.info(`Fetched todos from the DB ${JSON.stringify(todos)}`);
        res.status(200).json(todos);
    } catch (error) {
        logger.error("Error while fetching todos:", error);
        res.status(500).json({ message: "something went wrong, please try later" });
    }
}

exports.addTodo = async (req, res) => {
    const { title } = req.body; // Correct destructuring

    logger.info("Adding a new todo", title);
    const newTodo = new Todo({ title });

    try {
        logger.info("Adding the todo to DB", newTodo);
        const savedTodo = await newTodo.save();
        logger.info("Added the todo to DB", savedTodo);
        res.status(200).json(savedTodo);
    } catch (error) {
        logger.error("Error saving todo:", error);
        res.status(500).json({ error: "Error saving todo" });
    }
}