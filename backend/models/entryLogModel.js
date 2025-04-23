const mongoose = require("mongoose");

const entryLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "role",
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Faculty"],
  },
  name: String,
  rollNo: String,
  facultyId: String,
  department: String,
  year: String,
  branch: String,
  entry: Date,
  exit: Date,
});

module.exports = mongoose.model("EntryLog", entryLogSchema);
