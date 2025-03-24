import Employee from '../models/employeeModel.js';
import User from '../models/userModel.js';
import Department from '../models/departmentModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary , deleteFromCloudinary} from '../utils/cloudinary.js';
import mongoose from "mongoose";
export const addEmployee = asyncHandler(async (req, res) => {
    const {  name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;

    try {
        if (!name || !email || !password || !employeeId || !dob || !gender || !maritalStatus || !designation || !department || !salary || !role) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const departmentData = await Department.findOne({ name: department });
        if (!departmentData) {
            return res.status(400).json({ message: "Invalid department name" });
        }
        const departmentId = departmentData._id; 


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }


        let imageUrl = "";
        if (req.file) {
            console.log("Uploading image to Cloudinary...");
            imageUrl = await uploadOnCloudinary(req.file.buffer); 
        } else {
            console.warn("No image file provided.");
        }


        const newUser = new User({
            name,
            email,
            password,
            role,
            image: imageUrl,
        });

        const savedUser = await newUser.save();


        const newEmployee = await Employee.create({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department: departmentId,
            salary,
        });

        res.status(201).json({ message: "Employee added successfully", newEmployee });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding employee", error });
    }
});

export const getAllEmployees = asyncHandler(async (req, res) => {
    try {
        const employees = await Employee.find({}).populate('department', 'name').populate('userId', 'name email image');
        if (employees.length === 0) {
            return res.status(404).json({ message: "No employees found" });
        }
        res.status(200).json({ message: "All employees fetched successfully", employees });

    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Server error" });
    }
});



export const getEmployeeBydId = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log("Received ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid employee ID format" });
        }

        let employee = await Employee.findById(id)
            .populate("department", "name")
            .populate("userId", "name email image");

        if (!employee) {
            console.log("Trying to fetch employee by userId...");
            employee = await Employee.findOne({ userId: id })
                .populate("department", "name")
                .populate("userId", "name email image");
        }

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

      //  console.log("Employee Found:", employee);
        res.status(200).json({ message: "Employee fetched successfully", employee });

    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
});






export const editEmployeeById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        let { name, employeeId, dob, gender, maritalStatus, designation, department, salary, role } = req.body;

        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Employee ID" });
        }

        if (department && !mongoose.Types.ObjectId.isValid(department)) {
            return res.status(400).json({ message: "Invalid Department ID" });
        }


        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const user = await User.findById(employee.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let imageUrl = user.image; 

        if (req.file) {
            if (user.image) {
                try {
                    const publicId = user.image.split('/').slice(-1)[0].split('.')[0];
                    await deleteFromCloudinary(publicId);
                } catch (error) {
                    console.error("Error deleting old image:", error);
                }
            }
            imageUrl = await uploadOnCloudinary(req.file.buffer);
        }
ly
        await Promise.all([
            Employee.updateOne({ _id: id }, { 
                employeeId, 
                dob, 
                gender, 
                maritalStatus, 
                designation, 
                department: department ? new mongoose.Types.ObjectId(department) : employee.department, 
                salary 
            }),
            User.updateOne({ _id: employee.userId }, { name, role, image: imageUrl })
        ]);

        const updatedEmployee = await Employee.findById(id);
        const updatedUser = await User.findById(employee.userId);

        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee, user: updatedUser });

    } catch (error) {
        console.error("Error updating employee by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export const employeeDeleteById = asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        const employee = await Employee.findByIdAndDelete(id);
        if(!employee){
            return res.status(404).json({message: "Employee not found"})
        }
        const user = await User.findByIdAndDelete(employee.userId);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({message: "Employee and User deleted successfully"})
        
    }catch(error){
        console.error("Error deleting employee by id:", error);
        res.status(500).json({message: "Server error" });
    
    }
})

export const fetchEmployeeByDepId = asyncHandler(async(req, res)=>{
    try{
        const {id} = req.params
        const employees = await Employee.find({department: id}).populate('department', 'name').populate('userId', 'name email image');
        if(employees.length === 0){
            return res.status(404).json({message: "No employees found"})
        }
        res.status(200).json({message: "Employees fetched successfully", employees})
        
    }catch(error){
        console.error("Error fetching employees by department id:", error);
        res.status(500).json({message: "Server error" });
    }
})