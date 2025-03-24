import Department from '../models/departmentModel.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const addDepartment = asyncHandler(async (req, res) => {
    try {
        const { name, description } = req.body;

        const existedDepartment = await Department.findOne({ name });
        if (existedDepartment) {
            return res.status(400).json({ message: "Department already exists" });
        }

        const newDepartment = await Department.create({ name, description });
        res.status(201).json({ message: "Department created successfully", department: newDepartment });

    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({ message: "Server error" });
    }
});


export const getAllDepartments = asyncHandler(async (req, res) => {
    try {
        const departments = await Department.find({});
        if (departments.length === 0) {
            return res.status(404).json({ message: "No departments found" });
        }
        res.status(200).json({ message: "All departments fetched successfully", departments });

    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export const searchFun = asyncHandler(async (req , res)=>{
    try{
        const {query} = req.query
        if(!query || query.length() === ""){
            return res.status(400).json({ message: "Please provide a search query" });
        }
        const department = await Department.findOne({name: new RegExp(query, "i")});
        if(!department){
            return res.status(404).json({ message: "No department found with the given name" });
        }
        res.status(200).json({ message: "Department fetched successfully", department });

    }catch(error){
        console.error("Error searching department:", error);
        res.status(500).json({ message: "Server error" });
    }
})

export const editDepartmentById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const findDepartment = await Department.findById(id);
        if (!findDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }

        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedDepartment) {
            return res.status(400).json({ message: "Department not updated" });
        }

        res.status(200).json({ message: "Department updated successfully", department: updatedDepartment });

    } catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export const deleteDepartmentById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const findDepartment = await Department.findById(id);
        if (!findDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }
        await findDepartment.deleteOne()

       // await Department.findByIdAndDelete(id);

        res.status(200).json({ message: "Department deleted successfully" });

    } catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ message: "Server error" });
    }
});
