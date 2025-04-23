const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const { sendNotificationEmail } = require("../utils/emailService");

exports.updateEntryExit = async (req, res) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({ message: "QR data is missing" });
    }

    console.log("🔍 Scanned QR Data:", qrData);

    const user =
      (await Student.findOne({ email: qrData })) ||
      (await Faculty.findOne({ email: qrData }));

    if (!user) {
      console.warn("⚠️ No matching user found for scanned QR:", qrData);
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toLocaleTimeString();

    // ✅ Use correct field: entryExitLogs
    user.entryExitLogs = user.entryExitLogs || [];

    const logToday = user.entryExitLogs.find(
      (log) => new Date(log.date).toDateString() === now.toDateString()
    );

    let action = "";

    if (logToday && !logToday.exitTime) {
      logToday.exitTime = currentTime;
      action = "exit";

      await sendNotificationEmail({
        to: user.parentEmail || user.email, // Fallback in case parentEmail not set
        subject: "Exit Notification",
        text: `${user.name} has exited at ${currentTime}.`,
      });
    } else {
      user.entryExitLogs.push({ date: now, entryTime: currentTime });
      action = "entry";

      await sendNotificationEmail({
        to: user.parentEmail || user.email,
        subject: "Entry Notification",
        text: `${user.name} has entered at ${currentTime}.`,
      });
    }

    await user.save();

    res.json({
      message: `User ${action} recorded successfully`,
      user: {
        role: user.rollNumber ? "student" : "faculty",
        name: user.name,
        mobile: user.mobile,
        status: action,
        time: currentTime,
      },
    });
  } catch (err) {
    console.error("❌ Scan processing error:", err);
    res.status(500).json({ message: "Server error during QR scan", error: err });
  }
};
