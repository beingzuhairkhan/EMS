import mongoose from 'mongoose'
import Employee from './employeeModel.js'
import Leave from './leaveModel.js'
import Salary from './salaryModel.js'
const departmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true});

departmentSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
      // 🔹 Find employees under this department
      const employees = await Employee.find({ department: this._id });
  
      if (employees.length > 0) {
        const empIds = employees.map((emp) => emp._id);
  
        // 🔹 Delete related employees, leaves, and salaries
        await Employee.deleteMany({ department: this._id });
        await Leave.deleteMany({ employeeId: { $in: empIds } });
        await Salary.deleteMany({ employeeId: { $in: empIds } });
      }
  
      next();
    } catch (error) {
      next(error);
    }
  });

const Department =  mongoose.model('Department',departmentSchema);

export default Department;