import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ---------------------- Auth ----------------------
export const loginUser = (data) => API.post("/auth/login", data);
export const verifyOTP = (data) => API.post("/auth/verify-otp", data);

// ---------------------- QR Scan ----------------------

export const scanQRCode = async ({ qrData }) => {
  const token = localStorage.getItem("token");
  const res = await API.post(
    "/security/scan",
    { qrData },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// export const scanQR = (data) => API.post("/security/scan", data);

// ---------------------- Profiles ----------------------
export const getStudentProfile = () => API.get("/student/profile");
export const getFacultyProfile = () => API.get("/faculty/profile");
export const fetchHodProfile = async () => {
  const res = await API.get("/hod/profile");
  return res.data;
};

export const fetchSecurityProfile = async () => {
  const res = await API.get("/security/profile");
  return res.data;
};

// ---------------------- HOD Dashboard ----------------------
export const getHodDepartments = (hodId) =>
  API.get(`/hod/departments/${hodId}`);

export const getHodYears = (dept) =>
  API.get(`/hod/years/${dept}`);

export const getHodBranches = (dept, year) =>
  API.get(`/hod/branches/${dept}/${year}`);

export const getHodStatus = (dept, year, branch) =>
  API.get(`/hod/status/${dept}/${year}/${branch}`);

// Rewritten for consistency
export const fetchDepartments = async (hodId) => {
  const response = await API.get(`/hod/departments/${hodId}`);
  return response.data;
};

export const fetchYears = async (dept) => {
  const response = await API.get(`/hod/years/${dept}`);
  return response.data;
};

export const fetchBranches = async (department, year) => {
  const response = await API.get(`/hod/branches/${department}/${year}`);
  return response.data;
};

export const fetchStatus = async (department, year, branch) => {
  const response = await API.get(`/hod/status/${department}/${year}/${branch}`);
  return response.data;
};




// Get logs by date
export const fetchLogs = async (startDate, endDate) => {
  const response = await fetch(
    `/api/entrylogs/logs?startDate=${startDate}&endDate=${endDate}`
  );
  return response.json();
};

// Get daily stats
export const fetchDailyStats = async () => {
  const response = await fetch("/api/entrylogs/stats/daily");
  return response.json();
};


export const fetchDateLogs = async (date, department, year, branch) => {
  try {
    const response = await API.get(`/hod/logs`, {
      params: {
        date,
        department,
        year,
        branch,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const fetchAttendanceStats = async (department, year, branch) => {
  try {
    const response = await API.get(`/hod/daily-stats`, {
      params: {
        department,
        year,
        branch,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const visitorSignup = (data) => {
  return axios.post("/api/visitor/signup", data);
};



export default API;
