const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Hod = require("../models/HOD");

// ✅ Get Departments
exports.getDepartments = async (req, res) => {
  try {
    const hod = await Hod.findById(req.params.hodId);
    if (!hod) {
      return res.status(404).json({ message: "HOD not found" });
    }

    // Return the department as an array
    res.json({ departments: [hod.department] });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Years
exports.getYears = async (req, res) => {
  try {
    const years = await Student.distinct("year", {
      department: req.params.department,
    });
    res.json({ years });
  } catch (error) {
    console.error("Error fetching years:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Branches
exports.getBranches = async (req, res) => {
  try {
    const { department, year } = req.params;

    // Convert year to a number
    const numericYear = parseInt(year);

    if (isNaN(numericYear)) {
      return res.status(400).json({ message: "Invalid year format" });
    }

    const branches = await Student.distinct("branch", {
      department,
      year: numericYear,
    });

    res.status(200).json({ branches });
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get Status of Students & Faculty
exports.getStatus = async (req, res) => {
  try {
    const { department, year, branch } = req.params;
    const numericYear = parseInt(year);
    const today = new Date().toDateString();

    const students = await Student.find({ department, year: numericYear, branch });
    const faculty = await Faculty.find({ department });

    const studentStatus = students.map((s) => {
      const todayLog = s.entryExitLogs?.find(
        (log) => new Date(log.date).toDateString() === today
      );
      return {
        name: s.name,
        rollNo: s.rollNumber,
        entry: todayLog?.entryTime || "Not Entered",
        exit: todayLog?.exitTime || "Not Exited",
      };
    });

    const facultyStatus = faculty.map((f) => {
      const todayLog = f.entryExitLogs?.find(
        (log) => new Date(log.date).toDateString() === today
      );
      return {
        name: f.name,
        id: f.facultyId,
        entry: todayLog?.entryTime || "Not Entered",
        exit: todayLog?.exitTime || "Not Exited",
      };
    });

    res.json({ studentStatus, facultyStatus });
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Logs for Selected Date (Updated)
exports.getDateLogs = async (req, res) => {
  const { date, department, year, branch } = req.query;

  if (!date || !department || !year || !branch) {
    return res.status(400).json({ message: "Missing required query parameters" });
  }

  try {
    const numericYear = parseInt(year);
    if (isNaN(numericYear)) {
      return res.status(400).json({ message: "Invalid year format" });
    }

    // Fetch student logs for the given date
    const studentLogs = await Student.find({
      department,
      year: numericYear,
      branch,
      "logs.date": date,
    }).select("name rollNumber logs");

    // Fetch faculty logs for the given date
    const facultyLogs = await Faculty.find({
      department,
      "logs.date": date,
    }).select("name facultyId logs");

    const logs = [];

    // Prepare student logs
    studentLogs.forEach((student) => {
      const log = student.logs.find((l) => l.date === date);
      if (log) {
        logs.push({
          name: student.name,
          role: "Student",
          entry: log.entryTime || "Not Entered",
          exit: log.exitTime || "Not Exited",
        });
      }
    });

    // Prepare faculty logs
    facultyLogs.forEach((faculty) => {
      const log = faculty.logs.find((l) => l.date === date);
      if (log) {
        logs.push({
          name: faculty.name,
          role: "Faculty",
          entry: log.entryTime || "Not Entered",
          exit: log.exitTime || "Not Exited",
        });
      }
    });

    res.json({ logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Error fetching logs", error: error.message });
  }
};


// ✅ Get Daily Stats (Updated)
exports.getDailyStats = async (req, res) => {
  try {
    const { department, year, branch } = req.query;
    const numericYear = parseInt(year);

    if (isNaN(numericYear)) {
      return res.status(400).json({ message: "Invalid year format" });
    }

    const today = new Date().toDateString();

    // Fetch student and faculty from DB
    const students = await Student.find({ department, year: numericYear, branch });
    const faculty = await Faculty.find({ department });

    // Student Status
    const studentStatus = students.map((s) => {
      const todayLog = s.logs?.find(
        (log) => new Date(log.date).toDateString() === today
      );
      return {
        name: s.name,
        rollNo: s.rollNumber,
        entry: todayLog?.entryTime || "Not Entered",
        exit: todayLog?.exitTime || "Not Exited",
      };
    });

    // Faculty Status
    const facultyStatus = faculty.map((f) => {
      const todayLog = f.logs?.find(
        (log) => new Date(log.date).toDateString() === today
      );
      return {
        name: f.name,
        id: f.facultyId,
        entry: todayLog?.entryTime || "Not Entered",
        exit: todayLog?.exitTime || "Not Exited",
      };
    });

    // ✅ Compute stats
    const studentsPresent = studentStatus.filter(s => s.entry !== "Not Entered").length;
    const facultyPresent = facultyStatus.filter(f => f.entry !== "Not Entered").length;

    const stats = [
      {
        date: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
        studentsPresent,
        facultyPresent,
      },
    ];

    res.json({ studentStatus, facultyStatus, stats });
  } catch (error) {
    console.error("Error fetching daily stats:", error);
    res.status(500).json({ message: "Error fetching daily stats", error: error.message });
  }
};
