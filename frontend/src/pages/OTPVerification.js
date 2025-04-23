import React, { useState } from "react";
import { verifyOTP } from "../utils/api";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await verifyOTP({
        email: localStorage.getItem("email"),
        otp,
        role: localStorage.getItem("role"),
      });
      saveToken(res.data.token);
      navigate(`/${localStorage.getItem("role")}/dashboard`);
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-gray-100 p-8 rounded shadow-md space-y-4">
        <h2 className="text-xl font-semibold">Enter OTP</h2>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="p-2 w-full"
        />
        <button onClick={handleVerify} className="bg-green-600 text-white px-4 py-2 w-full">
          Verify
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
