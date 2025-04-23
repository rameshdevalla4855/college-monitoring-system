const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  rollNumber: String,
  mobile: String,
  parentMobile: String,
  address: String,
  hodMobile: String,
  hodName: String,
  department: String,
  year: Number, // Changed from String to Number
  branch: String,
  section: String,
  mentorMobile: String,
  qrCodePath: String,
  entryExitLogs: [
    {
      date: String,
      entryTime: String,
      exitTime: String,
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
