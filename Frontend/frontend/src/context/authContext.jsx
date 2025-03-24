import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance.js'

// Create User Context
export const UserContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get(`/user/verify`)

                if (response.data.success) {
                    setUser(response.data.user);
                    if (response.data.accessToken && response.data.accessToken !== token) {
                        localStorage.setItem("token", response.data.accessToken);
                    }
                }
            } catch (error) {
                console.error("User verification failed:", error);
                
                // ✅ Retry once before logging out
                if (error.response?.status === 401) {
                    logOut();
                }
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    // ✅ Login function
    const login = (user, token) => {
        setUser(user);
        localStorage.setItem("token", token); // ✅ Store token on login
    };

    // ✅ Logout function
    const logOut = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate('/login'); // ✅ Redirect after logout
    };

    // ✅ Prevent navigation until loading is complete
    if (loading) return <div>Loading...</div>;

    return (
        <UserContext.Provider value={{ user, login, logOut, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// ✅ Correct Export for useAuth
export const useAuth = () => useContext(UserContext);

export default AuthContextProvider;
