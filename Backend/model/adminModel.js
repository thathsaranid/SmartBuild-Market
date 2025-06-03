const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  isSuper: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing
adminSchema.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(this.password, salt);
      this.password = hashpass;
    }
  } catch (error) {
    throw error;
  }
});

// Compare password
adminSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const AdminModel = db.model("admin", adminSchema);
module.exports = AdminModel;
