import React, { useState, useEffect } from "react";
import { fetchSecurityProfile, scanQRCode } from "../../utils/api";
import { QrReader } from "react-qr-reader";
import {
  QrcodeIcon,
  XIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

const SecurityDashboard = () => {
  const [security, setSecurity] = useState({});
  const [scanMode, setScanMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [lastScannedUser, setLastScannedUser] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchSecurityProfile();
        setSecurity(data);
      } catch (err) {
        console.error("Failed to load security profile", err);
      }
    };
    loadProfile();
  }, []);

  const handleScan = async (qrData) => {
    if (qrData) {
      setScanMode(false);
      try {
        const response = await scanQRCode({ qrData });
        setLastScannedUser(response.user);
        alert(response.message);
      } catch (err) {
        console.error("Scan error:", err);
        alert("QR scan failed or user not found.");
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Reader error:", err);
  };

  const quotes = [
    "Safety is not a gadget, but a state of mind.",
    "Security is everyone's responsibility.",
    "Stay alert, stay secure.",
    "Your vigilance is the first line of defense."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 relative">
      {/* Profile Icon at Top-Right */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <UserCircleIcon className="h-9 w-9 text-blue-600" />
        </button>

        {showProfile && (
          <div className="absolute right-0 mt-2 w-72 backdrop-blur-md bg-white/80 border border-gray-300 rounded-xl shadow-2xl p-4 z-50 animate-slideDown fade-in transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow">
                {security?.name?.charAt(0) || "S"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{security.name}</h3>
                <p className="text-sm text-gray-500">{security.email}</p>
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Mobile:</strong> {security.mobileNumber}</p>
            </div>
          </div>
        )}

      </div>

      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
        Security Dashboard
      </h2>

      {/* Motivational Quote */}
      <p className="text-center italic text-gray-600 mb-8">{randomQuote}</p>

      {/* Scanner Toggle Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setScanMode(!scanMode)}
          className={`flex items-center gap-2 px-6 py-2 rounded-md shadow-lg transition ${scanMode
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
          {scanMode ? (
            <>
              <XIcon className="h-5 w-5" /> Stop Scanner
            </>
          ) : (
            <>
              <QrcodeIcon className="h-5 w-5" /> Start QR Scan
            </>
          )}
        </button>
      </div>

      {/* QR Scanner */}
      {scanMode && (
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-md">
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={(result, error) => {
                if (!!result) handleScan(result?.text);
                if (!!error) handleError(error);
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}

      {/* Last Scanned User */}
      {lastScannedUser && (
        <div className="mt-10 flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">Last Scanned User</h3>
            <p><strong>Role:</strong> {lastScannedUser.role}</p>
            <p><strong>Name:</strong> {lastScannedUser.name}</p>
            <p><strong>Mobile:</strong> {lastScannedUser.mobileNumber}</p>
            <p><strong>Status:</strong> {lastScannedUser.status}</p>
            <p><strong>Time:</strong> {lastScannedUser.time}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityDashboard;
