import React, { useState, useEffect } from "react";
import {
  fetchHodProfile,
  fetchDepartments,
  fetchYears,
  fetchBranches,
  fetchStatus,
  fetchDateLogs,
  fetchAttendanceStats,
} from "../../utils/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UserCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HodDashboard = () => {
  const [hodProfile, setHodProfile] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [branches, setBranches] = useState([]);
  const [studentStatus, setStudentStatus] = useState([]);
  const [facultyStatus, setFacultyStatus] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetchHodProfile();
        const profile = response?.data || response;
        setHodProfile(profile);
        if (profile && profile.department) {
          setDepartments([profile.department]);
        } else {
          setError("Invalid HOD profile.");
        }
      } catch (err) {
        setError("Failed to load profile.");
        console.error(err);
      }
    };
    init();
  }, []);

  const handleDeptChange = async (e) => {
    const dept = e.target.value;
    setSelectedDept(dept);
    setSelectedYear("");
    setSelectedBranch("");
    setStudentStatus([]);
    setFacultyStatus([]);
    setYears([]);
    setBranches([]);
    setStats([]);
    setLogs([]);

    if (!dept) return;
    try {
      const res = await fetchYears(dept);
      setYears(res.years || []);
    } catch (err) {
      setError("Failed to load years.");
      console.error(err);
    }
  };

  const handleYearChange = async (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    setSelectedBranch("");
    setStudentStatus([]);
    setFacultyStatus([]);
    setBranches([]);
    setStats([]);
    setLogs([]);

    if (!year || !selectedDept) return;
    try {
      const res = await fetchBranches(selectedDept, year);
      setBranches(res.branches || []);
    } catch (err) {
      setError("Failed to load branches.");
      console.error(err);
    }
  };

  const handleBranchChange = async (e) => {
    const branch = e.target.value;
    setSelectedBranch(branch);
    setStats([]);
    setLogs([]);

    if (!branch || !selectedDept || !selectedYear) return;
    setLoading(true);
    try {
      const res = await fetchStatus(selectedDept, selectedYear, branch);
      setStudentStatus(res.studentStatus || []);
      setFacultyStatus(res.facultyStatus || []);
    } catch (err) {
      setError("Failed to load status.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (!selectedDept || !selectedYear || !selectedBranch || !date) return;

    try {
      const logRes = await fetchDateLogs(date, selectedDept, selectedYear, selectedBranch);
      setLogs(logRes.logs || []);

      const statRes = await fetchAttendanceStats(selectedDept, selectedYear, selectedBranch, date);
      setStats(statRes.stats || []);
    } catch (err) {
      setError("Failed to load logs or stats.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white p-4 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-blue-700">HOD Dashboard</h1>
        <button
          onClick={() => setShowProfile(true)}
          className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 p-2 rounded-lg"
        >
          <UserCircle className="h-8 w-8 text-blue-700" />
          <span className="text-blue-700 font-medium">Profile</span>
        </button>
      </div>

      <AnimatePresence>
        {showProfile && hodProfile && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full sm:w-1/2 lg:w-1/3 p-6 shadow-xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">👤 HOD Profile</h2>
                <button onClick={() => setShowProfile(false)}><X /></button>
              </div>
              <hr className="my-4" />
              <p className="mb-2"><strong>Name:</strong> {hodProfile.name}</p>
              <p className="mb-2"><strong>Email:</strong> {hodProfile.email}</p>
              <p><strong>Department:</strong> {hodProfile.department}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 max-w-6xl mx-auto space-y-8">
        {error && <div className="bg-red-100 text-red-700 p-3 rounded shadow">{error}</div>}

        {/* Dropdowns */}
        <div className="grid sm:grid-cols-3 gap-4">
          <select className="p-3 rounded-lg shadow bg-white" value={selectedDept} onChange={handleDeptChange}>
            <option value="">Select Department</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>

          <select
            className="p-3 rounded-lg shadow bg-white"
            value={selectedYear}
            onChange={handleYearChange}
            disabled={!selectedDept}
          >
            <option value="">Select Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>

          <select
            className="p-3 rounded-lg shadow bg-white"
            value={selectedBranch}
            onChange={handleBranchChange}
            disabled={!selectedYear}
          >
            <option value="">Select Branch</option>
            {branches.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {loading && <p className="text-blue-600 font-medium">Loading status...</p>}

        {(studentStatus.length > 0 || facultyStatus.length > 0) && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">🎓 Student Status</h2>
              {studentStatus.map((s, i) => (
                <div key={i} className="p-3 border-b">
                  <p><strong>Name:</strong> {s.name}</p>
                  <p><strong>Roll No:</strong> {s.rollNo}</p>
                  <p><strong>Entry:</strong> {s.entry || "N/A"}</p>
                  <p><strong>Exit:</strong> {s.exit || "N/A"}</p>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold text-green-700 mb-2">👨‍🏫 Faculty Status</h2>
              {facultyStatus.map((f, i) => (
                <div key={i} className="p-3 border-b">
                  <p><strong>Name:</strong> {f.name}</p>
                  <p><strong>Faculty ID:</strong> {f.id}</p>
                  <p><strong>Entry:</strong> {f.entry || "N/A"}</p>
                  <p><strong>Exit:</strong> {f.exit || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logs and Stats */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-lg font-semibold text-purple-700">📅 Filter Logs by Date</h2>
          <input
            type="date"
            className="border p-3 rounded w-full"
            value={selectedDate}
            onChange={handleDateChange}
          />

          {logs.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Logs on {selectedDate}</h3>
              <div className="grid gap-2">
                {logs.map((log, idx) => (
                  <div key={idx} className="p-3 border rounded bg-gray-50">
                    <p><strong>{log.name}</strong> ({log.role})</p>
                    <p>Entry: {log.entry}</p>
                    <p>Exit: {log.exit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg text-blue-700">📊 Attendance Stats</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="studentsPresent" fill="#4F46E5" name="Students" />
                  <Bar dataKey="facultyPresent" fill="#10B981" name="Faculty" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HodDashboard;
