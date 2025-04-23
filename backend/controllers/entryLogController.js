const EntryLog = require("../models/entryLogModel");

// Get logs with optional date filtering
exports.getLogs = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const filter = {};
    if (startDate && endDate) {
      filter.entryTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const logs = await EntryLog.find(filter).populate("userId", "name role");
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error });
  }
};
// Get daily attendance stats grouped by date and role
exports.getDailyStats = async (req, res) => {
    try {
      const stats = await EntryLog.aggregate([
        {
          $group: {
            _id: {
              date: { $dateToString: { format: "%Y-%m-%d", date: "$entryTime" } },
              role: "$role",
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.date": 1 }
        }
      ]);
  
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Error generating stats", error });
    }
  };
  