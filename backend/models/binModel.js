const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
    _id: String, // Bin ID (e.g., BIN001)
    location: String, // Where the bin is placed
    acceptedWasteType: String, // What type of waste it accepts (Plastic, Organic, etc.)
    status: { type: String, default: "Active" } // Bin status
});

module.exports = mongoose.model("Bin", binSchema);
