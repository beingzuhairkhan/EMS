import { useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../context/axiosInstance.js'
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
             await axiosInstance.post(`user/register`,{
                name,email,password
            })
            // const data = await response.json();
            // console.log("Fetched Data:", data);
            toast.success('Registration successful! You can now log in.');
            setName("");
            setEmail("");
            setPassword("");
            navigate('/login')

        }catch(error){
            console.error('Error:', error.message);
            toast.error('Failed to register. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Name</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    If you have a account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
