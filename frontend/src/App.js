import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import FacultyDashboard from './pages/Dashboard/FacultyDashboard';
import HODDashboard from './pages/Dashboard/HODDashboard';
import VisitorSignup from './pages/VisitorSignup';
import VisitorLogin from './pages/VisitorLogin'
import VisitorDashboard from './pages/Dashboard/VisitorDashboard';
import SecurityDashboard from './pages/Dashboard/SecurityDashboard';
import QrScanner from "./pages/QrScanner";
import HodAdmin from "./pages/HodAdmin";


const loggedInUserId = localStorage.getItem("userId");


const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<OTPVerification />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/hod/dashboard" element={<HODDashboard />} />
            <Route path="/security/dashboard" element={<SecurityDashboard />} />
            <Route path="/visitor-signup" element={<VisitorSignup />} />
            <Route path="/visitor-login" element={<VisitorLogin />} />
            <Route path="/visitor/dashboard" element={<VisitorDashboard />} />

            <Route path="/security/scan" element={<QrScanner />} />
            <Route path="/hod/admin" element={<HodAdmin hodId={loggedInUserId} />} />
        </Routes>
    </Router>
);


<div className="text-3xl text-red-500 font-bold underline">
    Tailwind is working!
</div>


export default App;
