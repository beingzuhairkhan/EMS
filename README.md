# **Employee Management System (EMS) – MERN Stack**  

## **📌 Project Overview**  
The **Employee Management System (EMS)** is a **full-stack MERN application** that allows organizations to manage employees, departments, attendance, salaries, and leave requests efficiently.  

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB  
- **Authentication**: JWT (JSON Web Token)  
- **File Upload**: Multer & Cloudinary  

---

## **📦 Project Setup**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/your-repo/ems-mern.git
cd ems-mern
```

### **2️⃣ Backend Setup**  
```bash
cd backend
npm install
```

#### **🔧 Configure Environment Variables**  
Create a **.env** file in the **backend** folder and add:  
```plaintext
PORT=8888
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### **🚀 Start Backend Server**  
```bash
npm run dev  # Development Mode
npm start    # Production Mode
```
The backend API will run at: **http://localhost:8888**  

---

### **3️⃣ Frontend Setup**  
```bash
cd frontend
npm install
```

#### **🔧 Configure Environment Variables**  
Create a **.env** file in the **frontend** folder and add:  
```plaintext
VITE_API_BASE_URL=http://localhost:8888/api/v1
```

#### **🚀 Start Frontend Server**  
```bash
npm run dev
```
The frontend will run at: **http://localhost:5173**  

---

## **📌 API Documentation**  

### **🔑 Authentication API**  

| Endpoint             | Method | Description      | Request Body  | Response |
|----------------------|--------|-----------------|---------------|----------|
| `/api/v1/register` | `POST`  | Register a new user | `{ name, email, password, role }` | `{ message, user }` |
| `/api/v1/login`    | `POST`  | User login | `{ email, password }` | `{ token, user }` |

---

### **👨‍💼 Employee API**  

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/v1/employee/getAllEmployees` | `GET`  | Get all employees | - | `{ employees }` |
| `/api/v1/employee/addEmployee` | `POST`  | Add a new employee | `{ name, email, employeeId, department, salary, etc. }` | `{ message, newEmployee }` |

---

### **📅 Attendance API**  

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/v1/attendance/mark` | `POST`  | Mark attendance for employees | `{ employeeId, date, status }` | `{ message }` |
| `/api/v1/attendance/date/:date` | `GET`  | Get attendance by date | - | `{ attendance }` |
| `/api/v1/attendance/employee/:employeeId` | `GET`  | Get attendance by employee | - | `{ attendance }` |

---

### **📅 Leave API**  

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/v1/leave/apply` | `POST`  | Apply for leave | `{ employeeId, startDate, endDate, leaveType, leaveReason }` | `{ message }` |
| `/api/v1/leave/:id` | `GET`  | Get leave details by ID | - | `{ leave }` |
| `/api/v1/leave/all` | `GET`  | Get all leave records | - | `{ leaves }` |

---

## **🎨 Frontend Features**  

- **Dashboard**: Displays key statistics (Total Employees, Departments, Leaves, Salaries).  
- **Employee Management**: Add, edit, and delete employees.  
- **Department Management**: Manage organization departments.  
- **Attendance Tracking**: Mark and view attendance.  
- **Leave Requests**: Apply and approve leave requests.  
- **Salary Details**: View salary records for employees.  

---

## **🎨 UI & Styling**  

The frontend is styled using **Tailwind CSS** for a modern, responsive, and efficient design.  

---

## **🚀 Deployment Instructions**  

### **Frontend Deployment (Netlify/Vercel)**  
1. Build the frontend  
   ```bash
   npm run build
   ```
2. Deploy to **Netlify/Vercel** by connecting the GitHub repo.  

### **Backend Deployment (Render/VPS)**  
1. Ensure MongoDB is hosted on **MongoDB Atlas**.  
2. Deploy the backend using **Render/Heroku** or a **VPS**.  

