const express = require("express");
const { loginUser, verifyOTP } = require("../controllers/authController");
const router = express.Router();


router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);

module.exports = router;
