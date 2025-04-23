const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Faculty = require("../models/Faculty");
const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  const faculty = await Faculty.findById(req.user.id);
  if (!faculty) return res.status(404).json({ message: "Faculty not found" });
  res.json(faculty);
});

module.exports = router;
