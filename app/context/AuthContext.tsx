import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode; 
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null); 

  useEffect(() => {
    const clearTokenOnStart = async () => {
      await AsyncStorage.removeItem('token'); 
      setToken(null);
      setIsAuthenticated(false);
    };
    
    clearTokenOnStart();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    if (data.token) {
      setIsAuthenticated(true);
      setToken(data.token);
      await AsyncStorage.setItem('token', data.token);
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setToken(null);
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
