
import AddEmployee from './AddEmployee'
import EmployeeTable from './EmployeeTable'



const EmployeeSummary = () => {
    return (
        <div>
            <AddEmployee/>
            {/* <EmployeeTable/> */}

        </div>
    )
}

export default EmployeeSummary






























// import { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
// import axiosInstance from '../../../src/context/axiosInstance';

// const EmployeeSummary = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [department, setDepartment] = useState("");
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     setFilteredEmployees(
//       employees.filter(emp =>
//         emp.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [searchQuery, employees]);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axiosInstance.get("/employee/all");
//       setEmployees(response.data.employees);
//       setFilteredEmployees(response.data.employees);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("dob", dob);
//       formData.append("department", department);
//       formData.append("image", image);

//       const response = await axiosInstance.post("/employee/add", formData);
//       setEmployees([...employees, response.data.employee]);
//       toast.success("Employee added successfully");
//       setName("");
//       setDob("");
//       setDepartment("");
//       setImage(null);
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error adding employee:", error);
//     }
//   };

//   return (
//     <div className="p-6 overflow-y-auto">
//       <div className="flex justify-between items-center mb-6">
//         <input
//           type="text"
//           placeholder="Search employee..."
//           className="p-2 border border-gray-300 rounded-lg w-1/3"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
//         >
//           + Add Employee
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200">
//           <h3 className="text-lg font-semibold mb-4">Add New Employee</h3>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder="Employee Name"
//               className="p-2 border border-gray-300 rounded-lg"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <input
//               type="date"
//               placeholder="Date of Birth"
//               className="p-2 border border-gray-300 rounded-lg"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Department"
//               className="p-2 border border-gray-300 rounded-lg"
//               value={department}
//               onChange={(e) => setDepartment(e.target.value)}
//               required
//             />
//             <input
//               type="file"
//               className="p-2 border border-gray-300 rounded-lg"
//               onChange={(e) => setImage(e.target.files[0])}
//               required
//             />
//             <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
//               Create Employee
//             </button>
//           </form>
//         </div>
//       )}

//       <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
//         <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
//               <th className="py-3 px-6 text-left font-semibold">Sr No</th>
//               <th className="py-3 px-6 text-left font-semibold">Image</th>
//               <th className="py-3 px-6 text-left font-semibold">Name</th>
//               <th className="py-3 px-6 text-left font-semibold">DOB</th>
//               <th className="py-3 px-6 text-left font-semibold">Department</th>
//               <th className="py-3 px-6 text-left font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredEmployees?.map((emp, index) => (
//               <tr key={emp._id} className="hover:bg-gray-100 transition">
//                 <td className="py-4 px-6 font-medium text-gray-700">{index + 1}</td>
//                 <td className="py-4 px-6 text-gray-700">
//                   <img src={emp.image} alt={emp.name} className="w-10 h-10 rounded-full" />
//                 </td>
//                 <td className="py-4 px-6 text-gray-700">{emp.name}</td>
//                 <td className="py-4 px-6 text-gray-700">{emp.dob}</td>
//                 <td className="py-4 px-6 text-gray-700">{emp.department}</td>
//                 <td className="py-4 px-6 flex gap-3">
//                   <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">View</button>
//                   <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600">Edit</button>
//                   <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">Salary</button>
//                   <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">Leave</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EmployeeSummary;
