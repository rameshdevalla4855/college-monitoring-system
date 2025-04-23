const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobileNumber: String,
});

module.exports = mongoose.model("Security", securitySchema);
