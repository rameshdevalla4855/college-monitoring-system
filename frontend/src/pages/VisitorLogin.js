import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const VisitorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      await API.post("/visitor/login", { email, password });
      setShowOtp(true);
      alert("OTP sent to your email");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await API.post("/visitor/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      navigate("/visitor/dashboard");
    } catch (err) {
      alert("OTP Verification failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white/90 shadow-2xl backdrop-blur-md p-8 rounded-xl w-full max-w-md transition-all">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Visitor Login
        </h2>

        {!showOtp ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={login}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VisitorLogin;
