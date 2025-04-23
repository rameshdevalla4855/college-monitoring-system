const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobile: String,
  studentMobile: String,
  otp: String,
  otpExpire: Date,
});

module.exports = mongoose.model("Visitor", visitorSchema);
