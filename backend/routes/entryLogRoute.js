const express = require("express");
const router = express.Router();
const { getLogs, getDailyStats } = require("../controllers/entryLogController");

router.get("/logs", getLogs);
router.get("/stats/daily", getDailyStats);

module.exports = router;
