const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = require("./app");
const db = require("./config/db");
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const url = require('url');
const Message = require('./model/message.model');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key_123!@#';

// No need to add CORS here as it's already configured in app.js
// app.use(cors({ ... }));

// Create HTTP server
const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
  },
  pingTimeout: 60000,
});

// Make io accessible in express routes
app.set("io", io);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store connected clients with their roles
const clients = new Map();

// WebSocket connection handler
wss.on('connection', async (ws, req) => {
  try {
    console.log('New WebSocket connection attempt');
    // Get token from query string
    const { query } = url.parse(req.url, true);
    const token = query.token;

    if (!token) {
      console.log('WebSocket - No token provided');
      ws.close(1008, 'Token required');
      return;
    }

    // Verify token
    try {
      console.log('WebSocket - Verifying token');
      const decoded = jwt.verify(token, JWT_SECRET);
      ws.userId = decoded.id; // Store user ID in ws instance
      console.log('WebSocket - Client authenticated:', decoded.id);
    } catch (err) {
      console.error('WebSocket - Token verification failed:', err);
      ws.close(1008, 'Invalid token');
      return;
    }

    console.log('New client connected and authenticated');

    // Handle incoming messages
    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);
        console.log('WebSocket - Received message:', data);
        
        // Store client info when they identify themselves
        if (data.type === 'identify') {
          console.log('WebSocket - Client identifying:', data);
          clients.set(ws, {
            userId: data.userId,
            role: data.role,
            name: data.name
          });
          return;
        }

        // Handle chat messages
        if (data.type === 'chat') {
          const sender = clients.get(ws);
          if (!sender) {
            console.log('WebSocket - Sender not identified');
            return;
          }

          const messageData = {
            type: 'chat',
            message: data.message,
            sender: {
              id: sender.userId,
              name: sender.name,
              role: sender.role
            },
            timestamp: new Date().toISOString()
          };

          // Save message to database
          try {
            const newMessage = new Message({
              senderId: sender.userId,
              receiverId: data.to, // null for broadcast messages
              message: data.message,
              senderRole: sender.role,
              senderName: sender.name
            });
            await newMessage.save();
            console.log('WebSocket - Message saved to database:', newMessage._id);
          } catch (error) {
            console.error('WebSocket - Error saving message:', error);
          }

          // If it's admin, send to specific user
          if (sender.role === 'admin' && data.to) {
            console.log('WebSocket - Admin sending to specific user:', data.to);
            for (const [client, info] of clients.entries()) {
              if (info.userId === data.to) {
                client.send(JSON.stringify(messageData));
                ws.send(JSON.stringify(messageData)); // Send back to admin
                break;
              }
            }
          }
          // If it's user, send to all admins
          else if (sender.role === 'user') {
            console.log('WebSocket - User sending to all admins');
            for (const [client, info] of clients.entries()) {
              if (info.role === 'admin' || client === ws) {
                client.send(JSON.stringify(messageData));
              }
            }
          }
        }
      } catch (error) {
        console.error('WebSocket - Error processing message:', error);
      }
    });

    // Handle client disconnection
    ws.on('close', () => {
      console.log('WebSocket - Client disconnected');
      clients.delete(ws);
    });

    // Handle errors
    ws.on('error', (error) => {
      console.error('WebSocket - Connection error:', error);
    });

  } catch (error) {
    console.error('WebSocket - Error in connection handler:', error);
    ws.close(1011, 'Internal server error');
  }
});

// Use port 3001 instead of 3000 to avoid conflicts
let port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("SmartBuild API Server running");
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  // Handle client joining a chat room
  socket.on("joinRoom", ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) {
      console.log("Invalid room join request: missing IDs");
      return;
    }
    
    // Create a consistent room ID regardless of sender/receiver order
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
    console.log(`${socket.id} (user ${senderId}) joined room ${roomId}`);
  });

  // Handle new message from client
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    if (!senderId || !receiverId || !message) {
      console.log("Invalid message: missing required fields");
      return;
    }
    
    // Create a consistent room ID
    const roomId = [senderId, receiverId].sort().join("_");
    const msgObj = { 
      senderId, 
      receiverId, 
      message, 
      time: new Date().toISOString() 
    };
    
    console.log(`Broadcasting message to room ${roomId}:`, msgObj);
    
    // Broadcast the message to the room
    io.to(roomId).emit("receiveMessage", msgObj);
  });

  // Handle disconnection
  socket.on("disconnect", (reason) => {
    console.log(`User disconnected (${socket.id}): ${reason}`);
  });
  
  // Handle errors
  socket.on("error", (error) => {
    console.error(`Socket error (${socket.id}):`, error);
  });
});

// Function to start server with error handling
const startServer = () => {
  server.listen(port, () => {
    console.log(`Server Listening on port http://localhost:${port}`);
    console.log("Socket.IO server initialized");
  }).on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}`);
      port++;
      server.close();
      startServer();
    } else {
      console.error("Server error:", e);
    }
  });
};

// Start the server
startServer();
