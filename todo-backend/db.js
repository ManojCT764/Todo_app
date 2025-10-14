const mongoose = require('mongoose')
const logger = require('./Utils/logger')
require('dotenv').config()
// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        logger.info('Connected to MongoDB')
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`, { stack: error.stack });
        // process.exit(1);
    }
};

module.exports = connectDB