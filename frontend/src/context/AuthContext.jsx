import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/auth/check', {
                withCredentials: true
            });
            setIsAuthenticated(response.data.success);
            setUser(response.data.user); // Make sure backend sends user data including team
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password, type) => {
        try {
            const response = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password, type }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            setIsAuthenticated(true);
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Navigate to appropriate dashboard based on user's team
            if (data.user && data.user.team) {
                navigate(`/${data.user.team.toLowerCase()}`);
            }

            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:5001/api/auth/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('user');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            loading,
            login,
            logout,
            setIsAuthenticated,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
