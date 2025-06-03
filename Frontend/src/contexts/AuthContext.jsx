import React, { createContext, useContext, useState, useEffect } from 'react';
import { userAPI } from '../services/api';

// Create the context with a more descriptive name
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load user data
  const loadUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUserType = localStorage.getItem('userType');
      const storedUser = localStorage.getItem('userData');
      
      if (token && storedUserType) {
        setUserType(storedUserType);
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        // Fetch fresh user data
        try {
          const response = await userAPI.getProfile();
          setUser(response);
          localStorage.setItem('userData', JSON.stringify(response));
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Don't clear auth data on profile fetch error
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Clear invalid auth data
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
      setUser(null);
      setUserType(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const register = async (userData) => {
    try {
      setError(null);
      const response = await userAPI.register(userData);
      const { token, user: newUser } = response;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userData.role || 'user');
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      setUser(newUser);
      setUserType(userData.role || 'user');
      
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (email, password, type = 'user') => {
    try {
      setError(null);
      const response = await userAPI.login(email, password, type);
      const { token, user: userData } = response;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userType', type);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setUser(userData);
      setUserType(type);
      
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    setUser(null);
    setUserType(null);
    setError(null);
  };

  const value = {
    user,
    userType,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 