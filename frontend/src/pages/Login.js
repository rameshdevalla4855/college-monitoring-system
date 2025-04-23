import React, { useState } from "react";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("email", form.email);
      localStorage.setItem("role", form.role);
      navigate("/otp");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow-md space-y-4">
        <h2 className="text-xl font-semibold">Login</h2>
        <input name="email" placeholder="Email" className="p-2 w-full" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="p-2 w-full" onChange={handleChange} />
        <select name="role" className="p-2 w-full" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="hod">HOD</option>
          <option value="security">Security</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
