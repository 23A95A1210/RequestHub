const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  college: String,
  branch: String,
  semester: String,
  email: String,  // Make sure email is included
  reason: String,
  startDate: String,
  endDate: String,
  receiptPath: String, // Fixed case consistency
  status: { type: String, default: "Pending" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LeaveRequest", hackathonSchema);
