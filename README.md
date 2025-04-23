# 🎓 Student & Faculty Monitoring System

A role-based web application to monitor student and faculty entry/exit activities using QR code scanning, email notifications, and visitor logging.

---

## 🌐 Live Roles

- 👨‍🎓 **Student**
- 👩‍🏫 **Faculty**
- 🧑‍💼 **Head of Department (HOD)**
- 🔐 **Security**
- 🧑‍🤝‍🧑 **Visitor / Parent**

---

## 🏗️ Project Structure

student-faculty-monitoring-system/
│── backend/                # Backend (Node.js, Express, MongoDB)
│   ├── config/
│   │   ├── db.js           # MongoDB connection
│   │   ├── jwt.js          # JWT token generation & verification
│   │   ├── otpService.js   # OTP generation & verification logic
│   │   ├── qrService.js    # QR code generation logic
│   ├── controllers/
│   │   ├── authController.js      # Authentication & OTP handling
│   │   ├── studentController.js   # Student-specific operations
│   │   ├── facultyController.js   # Faculty-specific operations
│   │   ├── hodController.js       # HOD-specific operations
│   │   ├── securityController.js  # Security-specific operations
│   │   ├── visitorController.js   # Visitor (parent) management
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT authentication
│   │   ├── roleMiddleware.js      # Role-based access control
│   ├── models/
│   │   ├── Student.js     # Student schema
│   │   ├── Faculty.js     # Faculty schema
│   │   ├── HOD.js         # HOD schema
│   │   ├── Security.js    # Security schema
│   │   ├── Visitor.js     # Visitor (parent) schema
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication & login
│   │   ├── studentRoutes.js   # Student-specific routes
│   │   ├── facultyRoutes.js   # Faculty-specific routes
│   │   ├── hodRoutes.js       # HOD-specific routes
│   │   ├── securityRoutes.js  # Security-specific routes
│   │   ├── visitorRoutes.js   # Visitor-specific routes
│   ├── utils/
│   │   ├── emailService.js    # OTP email sending
│   │   ├── notificationService.js # SMS notifications to parents
│   ├── server.js          # Main server entry file
│── frontend/              # Frontend (React.js)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js  # Protect routes based on roles
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── OTPVerification.js
│   │   │   ├── Dashboard/
│   │   │   │   ├── StudentDashboard.js
│   │   │   │   ├── FacultyDashboard.js
│   │   │   │   ├── HODDashboard.js
│   │   │   │   ├── SecurityDashboard.js
│   │   │   │   ├── VisitorDashboard.js
│   │   ├── api/
│   │   │   ├── api.js  # Axios setup
│   │   ├── context/
│   │   │   ├── AuthContext.js  # Manages authentication state
│   │   ├── App.js
│   │   ├── index.js
│── .env
│── package.json
│── README.md



---

## ⚙️ Technologies Used

- **Frontend**: React.js, Axios, Bootstrap, React-Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, OTP Verification
- **QR Code**: `qrcode` (Node), `react-qr-reader`
- **Email**: Nodemailer
- **Notifications**: Email alerts to students on parent visit

---

## 🚀 Features

### 👨‍🎓 Student / 👩‍🏫 Faculty
- Login with email and password
- OTP Verification
- QR Code generation on first login
- View personal profile and dashboard
- Entry/Exit status tracked via QR scan

### 🧑‍💼 HOD
- Admin dashboard
- View departments under control
- Navigate: Department → Year → Branch
- Check daily entry/exit logs of students and faculty

### 🔐 Security
- Login and view profile
- Scan QR of students and faculty
- Automatically update their entry/exit time
- Email sent to parent on entry/exit

### 🧑‍🤝‍🧑 Visitor (Parent)
- Signup/Login
- Enter student’s mobile number
- Sends email alert to student

---

## 🔐 Role-Based Collections (MongoDB)

- `students`
- `faculty`
- `hods`
- `securities`
- `visitors`

---

## 📧 Email Notifications

- Nodemailer used for:
  - OTP verification
  - Visitor alert to student
  - Entry/Exit notifications to parents

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/student-faculty-monitoring-system.git
cd student-faculty-monitoring-system



## backend setup
cd backend
npm install



##  Create .env file:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password


##  Start backend server:
npm start


##  Frontend Setup

cd frontend
npm install
npm start
