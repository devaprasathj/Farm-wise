require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Use port provided by environment (e.g., Render)

// --- MIDDLEWARE ---
// 1. Enable CORS for all routes (important for connecting the separate frontend).
app.use(cors());

// 2. Enable Express body parsing for JSON data.
app.use(express.json());

// --- ROUTES ---c
// Mount your API routes. All requests to /api/... will be handled here.
app.use('/api', require('./routes/api'));

// --- DATABASE CONNECTION OPTIONS ---
// Critical options for compatibility with MongoDB Atlas and Mongoose:
const dbOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    // We removed the unsupported options that caused previous errors.
};

// --- DATABASE CONNECTION & SERVER STARTUP ---
// Connect to the MongoDB Atlas cluster using the URI from your environment variables.
mongoose.connect(process.env.MONGODB_URI, dbOptions) 
    .then(() => {
        console.log('✅ MongoDB connected successfully.');
    })
    .catch(err => {
        // Log the specific error message for easier troubleshooting
        console.warn('⚠️ MongoDB connection warning:', err.message);
        console.warn('ACTION: Check your MONGODB_URI in .env file or whitelist your IP in MongoDB Atlas.');
    });

// Start the server regardless of MongoDB connection status
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
