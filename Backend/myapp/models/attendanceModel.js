import mongoose from 'mongoose';


const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['Present', 'Absent', 'Sick', 'Leave'],
        default: null
    }
 });

 const Attendance = mongoose.model('Attendance', attendanceSchema);
 export default Attendance;