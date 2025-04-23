import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
    style={{ backgroundImage: "url('/images/school.jpg')" }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>

    <div className="relative z-10 text-white text-center space-y-6 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
        Welcome to College Monitoring System
      </h1>
      {/* <p className="text-lg md:text-xl max-w-2xl mx-auto">
        A Smart System for Monitoring Student & Faculty Entry/Exit with QR Code Authentication.
      </p> */}

      <div className="space-y-4">
        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition duration-300"
        >
          Login Now
        </Link>

        <div className="text-white mt-4">
          <p>Are you a visitor?</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link
              to="/visitor-signup"
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              Visitor Signup
            </Link>
            <Link
              to="/visitor-login"
              className="px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl"
            >
              Visitor Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
