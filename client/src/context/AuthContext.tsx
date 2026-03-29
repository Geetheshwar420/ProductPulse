import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface User {
  id: string
  email: string
  full_name?: string
  points: number
  role: 'user' | 'admin' | 'super_user' | 'tester' | 'developer'
  user_type: 'tester' | 'developer' | 'admin' | 'super_user' | 'user'
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  company?: string
  created_at: string
}

interface AuthContextType {
  user: any | null
  userProfile: User | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, userType: string, metadata?: any) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null)
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('productpulse_token');
    const storedUser = localStorage.getItem('productpulse_user');
    
    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserProfile(parsedUser);
    }
    setLoading(false);
  }, [])

  const signUp = async (email: string, password: string, fullName: string, userType: string, metadata?: any) => {
    try {
      const data = await api.post('/auth/register', { email, password, full_name: fullName, user_type: userType, ...metadata });
      localStorage.setItem('productpulse_token', data.token);
      localStorage.setItem('productpulse_user', JSON.stringify(data.user));
      setUser(data.user);
      setUserProfile(data.user);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('productpulse_token', data.token);
      localStorage.setItem('productpulse_user', JSON.stringify(data.user));
      setUser(data.user);
      setUserProfile(data.user);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  const signOut = async () => {
    localStorage.removeItem('productpulse_token');
    localStorage.removeItem('productpulse_user');
    setUser(null);
    setUserProfile(null);
  }

  const refreshProfile = async () => {
    // Basic refresh logic - could call a profile endpoint
  }

  const value = { user, userProfile, loading, signUp, signIn, signOut, refreshProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
