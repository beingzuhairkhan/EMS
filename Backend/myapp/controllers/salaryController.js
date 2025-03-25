import Salary from '../models/salaryModel.js';
import Employee from '../models/employeeModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const addSalary = asyncHandler(async (req, res) => {
  try {
    const { employeeId } = req.params; 
    const { basicSalary, allowances, deductions, payDate } = req.body;

    if (!basicSalary || !payDate) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

 
    const basic = Number(basicSalary);
    const allow = Number(allowances) || 0;
    const deduct = Number(deductions) || 0;
    const netSalary = basic + allow - deduct;

    const newSalary = await Salary.create({
      employeeId,
      basicSalary: basic,
      allowances: allow,
      deductions: deduct,
      netSalary,
      payDate,
    });

    res.status(201).json({ message: "Salary added successfully", newSalary });
  } catch (error) {
    console.error("Error adding salary:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export const getAllSalaries = asyncHandler(async (req, res) => {
  try {
    const salaries = await Salary.find().populate('employeeId', 'userId employeeId').sort({ createdAt: -1 });
    res.status(200).json({ message: "Salaries fetched successfully", salaries });
  } catch (error) {
    console.error("Error fetching salaries:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export const getSalaryByEmployeeId = asyncHandler(async (req, res) => {
  try {
     const { employeeId } = req.params;
     console.log(employeeId);
     let salary
     salary = await Salary.find({ employeeId }).populate('employeeId', ' employeeId');
    

  //   const employee = await Employee.findOne({userId : employeeId})
  // //  console.log("Employee" , employee)
  //   salary = await Salary.find({employeeId : employee._id}).populate('employeeId', ' employeeId');
    
    
    // if(!salary ){
    //   salary = await Salary.find({ employeeId }).populate('employeeId', ' employeeId');
    // }
    if(!salary || salary.length === 0){
      const employee = await Employee.findOne({userId : employeeId})
      //  console.log("Employee" , employee)
        salary = await Salary.find({employeeId : employee._id}).populate('employeeId', ' employeeId');
    }

    
    if (!salary.length) {
      return res.status(404).json({ message: "No salary records found for this employee." });
    }

    res.status(200).json({ message: "Salary details fetched successfully", salary });
  } catch (error) {
    console.error("Error fetching salary by employee ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export const updateSalary = asyncHandler(async (req, res) => {
  try {
    const { salaryId } = req.params;
    const { basicSalary, allowances, deductions, payDate } = req.body;

   
    const salary = await Salary.findById(salaryId);
    if (!salary) {
      return res.status(404).json({ message: "Salary record not found." });
    }

  
    salary.basicSalary = Number(basicSalary);
    salary.allowances = Number(allowances) || 0;
    salary.deductions = Number(deductions) || 0;
    salary.payDate = payDate;
    salary.netSalary = salary.basicSalary + salary.allowances - salary.deductions;

    
    await salary.save();

    res.status(200).json({ message: "Salary updated successfully", salary });
  } catch (error) {
    console.error("Error updating salary:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export const deleteSalary = asyncHandler(async (req, res) => {
  try {
    const { salaryId } = req.params;

   
    const salary = await Salary.findById(salaryId);
    if (!salary) {
      return res.status(404).json({ message: "Salary record not found." });
    }

   
    await salary.deleteOne();

    res.status(200).json({ message: "Salary deleted successfully" });
  } catch (error) {
    console.error("Error deleting salary:", error);
    res.status(500).json({ message: "Server error" });
  }
});
