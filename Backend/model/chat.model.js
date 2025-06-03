const mongoose = require("mongoose");
const db = require("../config/db");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'senderModel'
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['user', 'admin']
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'receiverModel'
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ['user', 'admin']
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const chatSchema = new mongoose.Schema({
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'participants.model'
    },
    model: {
      type: String,
      enum: ['user', 'admin']
    }
  }],
  messages: [messageSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const ChatModel = db.model("chat", chatSchema);
module.exports = ChatModel; 