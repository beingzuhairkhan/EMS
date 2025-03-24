import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },

    leaveType: {
        type: String,
        enum: ['Casual Leave', 'Sick Leave', 'Annual Leave'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    Status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
        required: true
    },
    leaveReason: {
        type: String,
        required: true
    }
},  { timestamps: true })

const Leave = mongoose.model('Leave' ,leaveSchema )
export default Leave;