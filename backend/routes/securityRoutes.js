const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { updateEntryExit } = require("../controllers/securityController");
const Security = require("../models/Security");
const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  const security = await Security.findById(req.user.id);
  if (!security) return res.status(404).json({ message: "Security not found" });
  res.json(security);
});

router.post("/scan", authMiddleware, updateEntryExit);

module.exports = router;
