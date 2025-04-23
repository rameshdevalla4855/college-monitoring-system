import React, { useState } from "react";
import axios from "axios";
import {
  BellIcon,
  OfficeBuildingIcon,
  UserGroupIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

const VisitorDashboard = () => {
  const [studentMobile, setStudentMobile] = useState("");
  const [notified, setNotified] = useState(false);

  const notify = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/visitor/notify",
        { studentMobile },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Student will be notified.");
      setStudentMobile("");
      setNotified(true);
    } catch (err) {
      alert("Failed to notify student.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 flex flex-col items-center justify-center px-6 py-12">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-4">
          🎓 Welcome to College Visitor Dashboard
        </h2>

        {!notified ? (
          <>
            <p className="mb-6 text-gray-700">
              Enter the student’s mobile number to notify them of your arrival.
            </p>

            <input
              type="text"
              value={studentMobile}
              onChange={(e) => setStudentMobile(e.target.value)}
              placeholder="📱 Student Mobile Number"
              className="w-full px-4 py-3 border border-purple-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />

            <button
              onClick={notify}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-md w-full transition-all duration-300"
            >
              <BellIcon className="h-5 w-5" />
              Notify Student
            </button>
          </>
        ) : (
          <p className="text-green-700 font-medium">
            ✅ Student notified successfully!
          </p>
        )}
      </div>

      {notified && (
        <div className="mt-10 w-full max-w-4xl">
          {/* College Info Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <OfficeBuildingIcon className="h-6 w-6 text-blue-500" />
              College Information
            </h3>
            <p className="text-gray-700">
              Welcome to <strong>XYZ Institute of Technology</strong>, a premier institution dedicated to excellence in education and innovation. Please proceed to the reception for visitor registration.
            </p>
          </div>

          {/* Visitor Guidelines */}
          <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-semibold text-green-800 mb-2 flex items-center gap-2">
              <UserGroupIcon className="h-6 w-6 text-green-500" />
              Visitor Instructions
            </h3>
            <ul className="text-gray-700 list-disc pl-6 space-y-2 text-left">
              <li>Please carry a valid ID proof.</li>
              <li>Wait in the lounge area until your student host arrives.</li>
              <li>Follow campus safety and health protocols.</li>
            </ul>
          </div>

          {/* Thank You Message */}
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-md text-center text-green-900 shadow-md">
            <UserCircleIcon className="h-8 w-8 mx-auto text-green-700 mb-2" />
            Thank you for visiting! We hope you enjoy your time on campus.
          </div>
        </div>
      )}

      <p className="mt-12 text-purple-700 italic text-sm">
        “Visitors bring joy, students bring smiles.”
      </p>
    </div>
  );
};

export default VisitorDashboard;
