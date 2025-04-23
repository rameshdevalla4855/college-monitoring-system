const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/qrcodes", express.static(path.join(__dirname, "qrcodes")));

app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/hod", require("./routes/hodRoutes")); 
app.use("/api/security", require("./routes/securityRoutes"));
app.use("/api/visitor", require("./routes/visitorRoute"));
app.use("/api/logs", require("./routes/logExportRoute"));
app.use("/api/entrylogs", require("./routes/entryLogRoute"));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
