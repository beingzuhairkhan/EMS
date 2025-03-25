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
                
            
                if (error.response?.status === 401) {
                    logOut();
                }
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);


    const login = (user, token) => {
        setUser(user);
        localStorage.setItem("token", token); 
    };

 
    const logOut = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate('/login'); 
    };

    if (loading) return <div>Loading...</div>;

    return (
        <UserContext.Provider value={{ user, login, logOut, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);

export default AuthContextProvider;
