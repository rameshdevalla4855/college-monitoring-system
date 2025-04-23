import React, { useState, useEffect } from "react";
import {
  fetchDepartments,
  fetchYears,
  fetchBranches,
  fetchStatus,
} from "../utils/api";

const HodAdmin = ({ hodId }) => {
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selected, setSelected] = useState({ department: "", year: "", branch: "" });
  const [status, setStatus] = useState({ studentStatus: [], facultyStatus: [] });

  useEffect(() => {
    const loadDepartments = async () => {
      const res = await fetchDepartments(hodId);
      setDepartments(res.data.departments);
    };
    loadDepartments();
  }, [hodId]);

  const handleDeptChange = async (dept) => {
    setSelected({ department: dept, year: "", branch: "" });
    const res = await fetchYears(dept);
    setYears(res.data.years);
  };

  const handleYearChange = async (year) => {
    setSelected((prev) => ({ ...prev, year }));
    const res = await fetchBranches(selected.department, year);
    setBranches(res.data.branches);
  };

  const handleBranchChange = async (branch) => {
    setSelected((prev) => ({ ...prev, branch }));
    const res = await fetchStatus(selected.department, selected.year, branch);
    setStatus(res.data);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">HOD Admin Panel</h2>
      
      <div className="flex gap-4 mb-6">
        <select onChange={(e) => handleDeptChange(e.target.value)}>
          <option>Select Department</option>
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        {years.length > 0 && (
          <select onChange={(e) => handleYearChange(e.target.value)}>
            <option>Select Year</option>
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        )}

        {branches.length > 0 && (
          <select onChange={(e) => handleBranchChange(e.target.value)}>
            <option>Select Branch</option>
            {branches.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Student Entry/Exit Status</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Roll No</th>
              <th className="border px-2 py-1">Entry</th>
              <th className="border px-2 py-1">Exit</th>
            </tr>
          </thead>
          <tbody>
            {status.studentStatus.map((s) => (
              <tr key={s.rollNo}>
                <td className="border px-2 py-1">{s.name}</td>
                <td className="border px-2 py-1">{s.rollNo}</td>
                <td className="border px-2 py-1">{s.entry ? new Date(s.entry).toLocaleTimeString() : "-"}</td>
                <td className="border px-2 py-1">{s.exit ? new Date(s.exit).toLocaleTimeString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-lg font-semibold mt-6 mb-2">Faculty Entry/Exit Status</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Entry</th>
              <th className="border px-2 py-1">Exit</th>
            </tr>
          </thead>
          <tbody>
            {status.facultyStatus.map((f) => (
              <tr key={f.id}>
                <td className="border px-2 py-1">{f.name}</td>
                <td className="border px-2 py-1">{f.id}</td>
                <td className="border px-2 py-1">{f.entry ? new Date(f.entry).toLocaleTimeString() : "-"}</td>
                <td className="border px-2 py-1">{f.exit ? new Date(f.exit).toLocaleTimeString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HodAdmin;
