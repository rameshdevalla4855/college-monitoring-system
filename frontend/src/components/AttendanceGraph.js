import React, { useEffect, useState } from "react";
import { fetchDailyStats } from "../utils/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AttendanceGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      const stats = await fetchDailyStats();

      const grouped = {};
      stats.forEach((item) => {
        const date = item._id.date;
        const role = item._id.role;

        if (!grouped[date]) grouped[date] = { date };
        grouped[date][role] = item.count;
      });

      setData(Object.values(grouped));
    };

    loadStats();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">📊 Daily Attendance Stats</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="student" fill="#8884d8" />
          <Bar dataKey="faculty" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceGraph;
