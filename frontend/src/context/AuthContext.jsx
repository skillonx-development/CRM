import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

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
            const response = await axios.get(`${API_URL}/api/auth/check`, {
                withCredentials: true
            });

            if (response.data.success) {
                setIsAuthenticated(true);
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            } else {
                throw new Error("Not authenticated");
            }
        } catch (error) {
            console.error("Authentication check failed:", error.message);
            // Try fallback from localStorage
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                setIsAuthenticated(true);
                setUser(storedUser);
            } else {
                setIsAuthenticated(false);
                setUser(null);
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password, type) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
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
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect to appropriate dashboard
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
            await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("user");
            navigate("/login"); // Change navigation from "/" to "/login"
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const refreshUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/check`, {
                withCredentials: true,
            });
            if (response.data.success) {
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
        } catch (error) {
            console.error("Failed to refresh user:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                login,
                logout,
                refreshUser,
                setIsAuthenticated,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);