import express from 'express'
import connectDB from './db.js';
import cors from 'cors'
import { errorMiddleware } from './middlewares/error.js'
import cookieParser from "cookie-parser"
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import salaryRoutes from './routes/salaryRoutes.js'
import leaveRoutes from './routes/leaveRoutes.js'
import adminDashboard from './routes/dashboardRoutes.js'
export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
const port = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,  
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan('dev'))
app.use(cookieParser());
connectDB();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/department', departmentRoutes);
app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/salary', salaryRoutes);
app.use('/api/v1/leave', leaveRoutes);
app.use('/api/v1/admin/dashboard', adminDashboard);
app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found'
  });
});

app.use(errorMiddleware);


app.listen(port, () => console.log('Server is working on Port:' + port + ' in ' + envMode + ' Mode.'));