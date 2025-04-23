import React, { useState } from "react";
import { fetchLogs } from "../utils/api";

const LogsPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [logs, setLogs] = useState([]);

  const handleFetch = async () => {
    const data = await fetchLogs(startDate, endDate);
    setLogs(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">📅 Date-wise Entry Logs</h2>
      <div className="my-4 space-x-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-1"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-1"
        />
        <button onClick={handleFetch} className="bg-blue-600 text-white px-4 py-1 rounded">
          Fetch Logs
        </button>
      </div>

      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i} className="text-center">
              <td>{log.userId?.name}</td>
              <td>{log.userId?.role}</td>
              <td>{new Date(log.entryTime).toLocaleString()}</td>
              <td>{log.exitTime ? new Date(log.exitTime).toLocaleString() : "Still Inside"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsPage;
