import React, { useEffect, useState } from "react";
import { getFacultyProfile } from "../../utils/api";
import { motion, AnimatePresence } from "framer-motion";

const FacultyDashboard = () => {
  const [faculty, setFaculty] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getFacultyProfile().then((res) => setFaculty(res.data));
  }, []);

  if (!faculty) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm">
          🧑‍🏫 Faculty Dashboard
        </h1>

        <div
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img
            src={faculty.profileImage || "/assets/faculty-photo.jpg"}   // faculty pic
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
      </div>

      {/* Welcome + QR Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-xl bg-white bg-opacity-60 backdrop-blur-md rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Hello, Prof. {faculty.name}
        </h2>
        <p className="text-gray-600 mb-6">Scan your QR code below:</p>
        <div className="flex justify-center">
          <img
            src={`http://localhost:5000/${faculty.qrCodePath}`}
            alt="QR Code"
            className="w-44 h-44 rounded-xl border shadow-md transition-transform hover:scale-105"
          />
        </div>
      </motion.div>

      {/* Profile Info Panel */}
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
              👤 Faculty Profile
            </h3>
            <div className="space-y-2 text-base text-gray-700">
              <p><strong>Name:</strong> {faculty.name}</p>
              <p><strong>Faculty ID:</strong> {faculty.facultyId}</p>
              <p><strong>Email:</strong> {faculty.email}</p>
              <p><strong>Mobile:</strong> {faculty.mobileNumber}</p>
              <p><strong>Department:</strong> {faculty.department}</p>
              <p><strong>HOD Name:</strong> {faculty.hodName}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FacultyDashboard;
