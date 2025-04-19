import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const API_URL ="https://crm-r11b.onrender.com";

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            }
        } catch (error) {
            console.error("Authentication check failed:", error.message);
            // Clear stored data if auth check fails
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("user");
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password, type) => {
        try {
          setLoading(true);
      
          const response = await axios.post(`${API_URL}/api/auth/login`,
            { email, password, type },
            { withCredentials: true }
          );
      
          const { success, user, redirect, message } = response.data;
      
          if (success) {
            setIsAuthenticated(true);
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
      
            if (redirect) {
              navigate(redirect);
            }
      
            return { success: true };
          } else {
            return {
              success: false,
              error: message || "Login failed"
            };
          }
      
        } catch (error) {
          console.error("Login error:", error);
          return {
            success: false,
            error: error.response?.data?.message || error.message || "Invalid credentials"
          };
        } finally {
          setLoading(false);
        }
      };
      

    const logout = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("user");
            navigate("/login");
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
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to refresh user:", error);
            return false;
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                error,
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