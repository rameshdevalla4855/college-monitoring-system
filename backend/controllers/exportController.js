const { Parser } = require("json2csv");
const EntryLog = require("../models/entryLogModel");

exports.exportLogsToCSV = async (req, res) => {
  try {
    const logs = await EntryLog.find().populate("user", "name role");

    const fields = [
      "user.name",
      "user.role",
      "entryTime",
      "exitTime",
      "date",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(logs);

    res.header("Content-Type", "text/csv");
    res.attachment("logs.csv");
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error generating CSV", error });
  }
};
