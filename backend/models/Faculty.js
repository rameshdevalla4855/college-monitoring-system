const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  facultyId: String,
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  department: String,
  hodName: String,
  year:Number,
  qrCodePath: String,
  entryExitLogs: [
    {
      date: String,
      entryTime: String,
      exitTime: String,
    },
  ],
});

module.exports = mongoose.model("Faculty", facultySchema);
