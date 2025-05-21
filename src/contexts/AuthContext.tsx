import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { UserRole } from '../types';

interface User {
  address: string;
  role: UserRole;
  username: string | null;
  earnings: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  loading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For demo purposes, this simulates fetching user data
  // In a real application, this would come from your backend
  const fetchUserData = async (address: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // This is mock data. In a real app, you'd fetch this from your API
    // using the wallet address to identify the user
    const mockUsers: Record<string, User> = {
      // Mock admin
      '0x123': {
        address: '0x123',
        role: 'admin',
        username: 'Admin User',
        earnings: 15.5
      },
      // Mock uploader
      '0x456': {
        address: '0x456',
        role: 'uploader',
        username: 'Content Creator',
        earnings: 8.2
      },
      // Default for any other address (regular user)
      default: {
        address: address,
        role: 'user',
        username: null,
        earnings: 0
      }
    };
    
    // Return user data if it exists, otherwise return default user
    return mockUsers[address] || mockUsers.default;
  };

  const login = async () => {
    setError(null);
    try {
      await connectWallet();
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please try again.");
    }
  };

  const logout = () => {
    disconnectWallet();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_token');
  };

  // When wallet connection changes, update auth state
  useEffect(() => {
    const updateAuth = async () => {
      if (isConnected && account) {
        try {
          setLoading(true);
          const userData = await fetchUserData(account);
          setUser(userData);
          setIsAuthenticated(true);
          
          // Store auth token (in a real app, this would be a JWT)
          localStorage.setItem('auth_token', `demo_token_${account}`);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to retrieve user data");
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    updateAuth();
  }, [isConnected, account]);

  // Check for existing auth on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token && isConnected && account) {
        try {
          const userData = await fetchUserData(account);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error checking auth:", error);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};