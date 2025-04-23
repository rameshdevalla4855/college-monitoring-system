import React, { useEffect, useState } from "react";
import { getStudentProfile } from "../../utils/api";
import { motion, AnimatePresence } from "framer-motion";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getStudentProfile().then((res) => setStudent(res.data));
  }, []);

  if (!student) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm">
          🎓 Student Dashboard
        </h1>

        <div
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img
            src={student.profileImage || "/assets/your_image"}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-xl bg-white bg-opacity-60 backdrop-blur-md rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Welcome, {student.name} 👋
        </h2>
        <p className="text-gray-600 mb-6">Here is your unique QR Code:</p>
        <div className="flex justify-center">
        <img
  src={student.qrCodePath}
  alt="QR Code"
  className="w-44 h-44 rounded-xl border shadow-md transition-transform hover:scale-105"
/>
        </div>
      </motion.div>

      {/* Profile Drawer */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-24 right-8 bg-white rounded-2xl shadow-2xl w-96 p-6 z-50 border border-gray-200"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              👤 Your Profile Info
            </h3>
            <div className="space-y-2 text-base text-gray-700">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll No:</strong> {student.rollNumber}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Mobile:</strong> {student.mobileNumber}</p>
              <p><strong>Parent Mobile:</strong> {student.parentMobile}</p>
              <p><strong>Department:</strong> {student.department}</p>
              <p><strong>Mentor Mobile:</strong> {student.mentorMobile}</p>
              <p><strong>HOD Mobile:</strong> {student.hodMobile}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;
