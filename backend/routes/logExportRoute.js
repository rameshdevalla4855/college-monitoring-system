const express = require("express");
const router = express.Router();
const { exportLogsToCSV } = require("../controllers/exportController");

router.get("/export-logs", exportLogsToCSV);

module.exports = router;
