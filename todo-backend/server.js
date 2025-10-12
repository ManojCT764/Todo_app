const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./db');
const todoRoutes = require('./Routes/todoRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api' , todoRoutes);

// Define the root route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Todo App API!' });
});


// Define the /add-todo route



// Connect to the database
connectDB();

// Start the server
const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});