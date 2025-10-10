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

// Define the /add-todo route
app.post('/add-todo', (req, res) => {
    const { title } = req.body;
    console.log('Title:', title);
    // Here you can save the todo to DB using your Todo model...
    res.status(200).json({ message: 'Todo added successfully!', todo: { title } });
});

// Connect to the database
connectDB();

// Start the server
const port = 3005;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});