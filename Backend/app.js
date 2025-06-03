const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require("./router/user.route");
const supplier = require("./router/supplier.route");
const addproduct = require("./router/addProduct.route");
const paymentRoute = require("./router/payment.route");
const jobRoute = require("./router/jobPosting.router");
const workerRoute = require("./router/addWorkers.route");
const designRoute = require("./router/interiorDesign.route");
const machineRoute = require("./router/machine.route");
const materialRoute = require("./router/material.route");
const inquiryRoute = require("./router/inquiry.route");
const jobApplicationRoute = require("./router/jobApplication.route");
const chatRoute = require("./router/chat.route");
const messageRoute = require("./router/message.route");
const orderRoutes = require('./router/order.route');
const session = require('express-session');
const adminRoute = require('./router/admin.route');
require('./config/db');

// Create uploads directory if it doesn't exist
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, 'uploads/resumes');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3001', 'http://localhost:5000', 'http://localhost:8080', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Increase payload size limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {secure:false }
}));

// Mount routes with proper prefixes
app.use('/user', userRouter);
app.use('/supplier', supplier);
app.use('/product', addproduct);
app.use('/api/payment', paymentRoute);
app.use('/api/jobs', jobRoute);
app.use('/workers', workerRoute);
app.use('/design', designRoute);
app.use('/machine', machineRoute);
app.use('/material', materialRoute);
app.use('/api/inquiries', inquiryRoute);
app.use('/api/job-applications', jobApplicationRoute);
app.use('/api/chat', chatRoute);
app.use('/messages', messageRoute);
app.use('/api/orders', orderRoutes);
app.use('/admin', adminRoute);

// Simple test route
app.get('/test', (req, res) => {
    res.json({ message: 'Express is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error details:', err);
    res.status(500).json({ 
        message: 'Internal Server Error',
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
});

module.exports = app; 