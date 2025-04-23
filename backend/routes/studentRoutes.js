const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Student = require("../models/Student");
const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  const student = await Student.findById(req.user.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
});

module.exports = router;
