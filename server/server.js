require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRoutes = require('./routes/Users');
const authRoutes = require('./routes/Auth');
const productRoutes = require('./routes/Product');
const path = require('path');
const connectDB = require('./connectDB');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Connect to MongoDB
connectDB();

// Start th server
const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})