const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const Todo = require('./models/todoModel');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://manojct764_db_user:devops@todo-db-cluster.hthbjoq.mongodb.net/?retryWrites=true&w=majority&appName=Todo-DB-Cluster');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        // process.exit(1);
    }
};

// Define the root route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Todo App API!' });
});

app.get("/add-todo", async(req, res) => {
    console.log("Fetching all todos from the DB");
    try {
        const todos = await Todo.find();
        console.log("Fetched todos from the DB", todos);
        res.status(200).json(todos);
    } catch (error) {
        console.error("Error while fetching todos:", error);
        res.status(500).json({ error: "Error fetching todos" });
    }
})

// Define the /add-todo route
app.post("/add-todo", async (req, res) => {
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
});


// Connect to the database
connectDB();

// Start the server
const port = 3005;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});