const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const router = express.Router();
const HOD = require("../models/HOD");

const {
  getDepartments,
  getYears,
  getBranches,
  getStatus,
  getDateLogs,
  getDailyStats, // ✅ Added this line
} = require("../controllers/hodController");

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const hod = await HOD.findById(req.user.id).select('-password');
    if (!hod) return res.status(404).json({ message: 'HOD not found' });
    res.json(hod);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// HOD dashboard logic to fetch entry/exit status
router.get("/status", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find({});
    const faculty = await Faculty.find({});
    res.json({ students, faculty });
  } catch (err) {
    res.status(500).json({ message: "Error fetching status", error: err });
  }
});

// New route to get daily stats
router.get("/daily-stats", authMiddleware, getDailyStats); // ✅ New route

router.get("/departments/:hodId", getDepartments); 
router.get("/years/:department", getYears);
router.get("/branches/:department/:year", getBranches);
router.get("/status/:department/:year/:branch", getStatus);

// ✅ New logs route
router.get("/logs", authMiddleware, getDateLogs);

module.exports = router;
