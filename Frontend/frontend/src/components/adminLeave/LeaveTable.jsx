import { useState, useEffect } from "react";
import axiosInstance from "../../../src/context/axiosInstance";
import toast from "react-hot-toast";

const LeaveTable = ({ leaves, onUpdateStatus }) => {
   
    return (
        <div className="overflow-x-auto rounded-lg p-4 ">
            <h2 className="text-xl font-semibold mb-4">Leave Records</h2>

            <table className="min-w-full border border-gray-300">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="py-3 px-4">Sr No</th>
                        <th className="py-3 px-4">Emp ID</th>
                        <th className="py-3 px-4">Reason</th>
                        <th className="py-3 px-4">Leave Type</th>
                        <th className="py-3 px-4">Department</th>
                        <th className="py-3 px-4">Days</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {leaves.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-gray-500">
                                No leave records found.
                            </td>
                        </tr>
                    ) : (
                        leaves.map((leave, index) => (
                            <tr key={leave._id} className="hover:bg-gray-100 transition">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{leave?.employeeId?.employeeId}</td>
                                <td className="py-3 px-4">{leave?.leaveReason}</td>
                                <td className="py-3 px-4">{leave?.leaveType}</td>
                                <td className="py-3 px-4">{leave?.employeeId?.department?.name}</td>

                                <td className="py-3 px-4 font-semibold text-blue-600">
                                    {Math.ceil(
                                        (new Date(leave?.endDate) - new Date(leave?.startDate)) / (1000 * 60 * 60 * 24)
                                    )} Days
                                </td>

                                <td
                                    className={`py-3 px-4 font-semibold ${leave.Status === "Approved"
                                        ? "text-green-600"
                                        : leave.Status === "Rejected"
                                            ? "text-red-600"
                                            : "text-yellow-600"
                                        }`}
                                >
                                    {leave.Status}
                                </td>
                                <td className="py-3 px-4">
                                    {leave.Status === "Pending" && (
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                                                onClick={() => onUpdateStatus(leave._id, "Approved")}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                                                onClick={() => onUpdateStatus(leave._id, "Rejected")}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveTable;