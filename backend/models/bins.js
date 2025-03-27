// users who'l register
//connected with bin.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/binusers');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true }, // Unique Roll Number
    email: { type: String, required: true },
    batch: { type: String, required: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 }, // Default 0 points initially
    rewardCards: { type: [String], default: [] }, // Stores reward card history
    phone: { type: String, required: true } ,// Phone number field
    lastScannedBin: { type: String, default: null }  // New field to track bin
});

module.exports = mongoose.model("User", userSchema);
