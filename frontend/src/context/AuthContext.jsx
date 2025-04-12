import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
const API_TIMEOUTS = {
    auth: 10000,    // 10s for auth checks
    login: 15000,   // 15s for login
    logout: 5000,   // 5s for logout 
    refresh: 8000   // 8s for refresh
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Enhanced API call helper with operation-specific timeouts
    const apiCallWithTimeout = async (promise, operation = 'auth') => {
        const controller = new AbortController();
        const timeout = API_TIMEOUTS[operation] || 10000;

        const timeoutId = setTimeout(() => {
            controller.abort();
        }, timeout);

        try {
            const response = await Promise.race([
                promise,
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error(
                        `Request timed out after ${timeout / 1000} seconds`
                    )), timeout)
                )
            ]);
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error(`${operation} request timed out`);
            }
            throw error;
        }
    };

    // Memoize checkAuth to prevent unnecessary re-renders
    const checkAuth = useCallback(async () => {
        let isMounted = true; // For cleanup
        setError(null);

        try {
            const response = await apiCallWithTimeout(
                axios.get(`${API_URL}/api/auth/check`, {
                    withCredentials: true
                })
            );

            if (!isMounted) return;

            if (response.data.success) {
                setIsAuthenticated(true);
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                // Redirect to appropriate dashboard if on login/root page
                const currentPath = window.location.pathname;
                if (currentPath === '/' || currentPath === '/login') {
                    navigate(`/${response.data.user.team.toLowerCase()}`);
                }
            } else {
                throw new Error("Not authenticated");
            }
        } catch (error) {
            if (!isMounted) return;
            console.error("Authentication check failed:", error.message);

            // Safe JSON parsing with try-catch
            try {
                const storedUser = JSON.parse(localStorage.getItem("user") || "null");
                if (storedUser) {
                    setIsAuthenticated(true);
                    setUser(storedUser);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    navigate("/login");
                }
            } catch (parseError) {
                console.error("Failed to parse stored user:", parseError);
                localStorage.removeItem("user"); // Clean up invalid data
                setIsAuthenticated(false);
                setUser(null);
                navigate("/login");
            }
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    useEffect(() => {
        const cleanup = checkAuth();
        return () => cleanup;
    }, [checkAuth]);

    const login = async (email, password, type) => {
        setError(null);
        try {
            const response = await apiCallWithTimeout(
                axios.post(`${API_URL}/api/auth/login`,
                    { email, password, type },
                    { withCredentials: true }
                ),
                'login'  // Use login-specific timeout
            );

            const { data } = response;

            if (!response.data.success) {
                throw new Error(data.message || "Login failed");
            }

            setIsAuthenticated(true);
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user?.team) {
                navigate(`/${data.user.team.toLowerCase()}`);
            }

            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            console.error("Login error:", error);
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await apiCallWithTimeout(
                axios.post(`${API_URL}/api/auth/logout`, {},
                    { withCredentials: true }),
                'logout'  // Use logout-specific timeout
            );
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("user");
            navigate("/login");
        } catch (error) {
            setError(error.message);
            console.error("Logout error:", error);
            // Force logout on client side even if server request fails
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("user");
            navigate("/login");
        }
    };

    const refreshUser = async () => {
        setError(null);
        try {
            const response = await apiCallWithTimeout(
                axios.get(`${API_URL}/api/auth/check`, {
                    withCredentials: true,
                }),
                'refresh'  // Use refresh-specific timeout
            );

            if (response.data.success) {
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            } else {
                throw new Error("Failed to refresh user data");
            }
        } catch (error) {
            setError(error.message);
            console.error("Failed to refresh user:", error);
            // Handle token expiration
            if (error.response?.status === 401) {
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
    };

    // Set up auto-refresh of user data
    useEffect(() => {
        if (isAuthenticated) {
            const refreshInterval = setInterval(refreshUser, 5 * 60 * 1000); // Refresh every 5 minutes
            return () => clearInterval(refreshInterval);
        }
    }, [isAuthenticated]);

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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};