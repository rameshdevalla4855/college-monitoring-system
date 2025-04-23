const express = require("express");
const router = express.Router();
const {
  visitorSignup,
  visitorLogin,
  verifyVisitorOtp,
  notifyStudent,
} = require("../controllers/visitorController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", visitorSignup);
router.post("/login", visitorLogin);
router.post("/verify-otp", verifyVisitorOtp);
router.post("/notify", authMiddleware, notifyStudent); 

module.exports = router;
