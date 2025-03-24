import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axiosInstance from '../context/axiosInstance.js'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate()
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await axiosInstance.post(`user/login`, {
                email,
                password
            });
            console.log("response", response)
            if (response.status == 200) {
                login(response.data.user)
                localStorage.setItem('token', response.data.accessToken)
                console.log("role", response.data.user.role)
                if (response.data.user.role == "admin") {
                    navigate('/admin-dashboard')
                    toast.success("Admin Logged In Success")

                } else if (response.data.user.role == "user") {
                    navigate('/employee-dashboard')
                    toast.success("User Logged In Success",)

                }
            }
        } catch (error) {
            toast.error("User Logged In Error", error)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
