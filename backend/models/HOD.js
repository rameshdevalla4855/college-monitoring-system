const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  department: String,
  qrCodePath: String,
});

module.exports = mongoose.model("HOD", hodSchema);
