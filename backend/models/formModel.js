const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  college: String,
  branch: String,
  semester: String,
  internshipInstitute: String,
  startDate: String,
  endDate: String,
  email: String,
  offerLetterPath: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FormSubmission", formSchema);