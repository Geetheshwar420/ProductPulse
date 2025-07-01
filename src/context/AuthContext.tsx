import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase, getUserProfile } from '../services/supabase'

// Local User type definition
interface User {
  id: string
  email: string
  username?: string
  full_name?: string
  avatar_url?: string
  points: number
  role: 'user' | 'admin' | 'company'
  user_type: 'tester' | 'developer' | 'admin'
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  company?: string
  experience?: string
  interests?: string
  approved_by?: string
  approved_at?: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: SupabaseUser | null
  userProfile: User | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, userType: 'tester' | 'developer' | 'admin', metadata?: { username?: string; company?: string; experience?: string; interests?: string }) => Promise<any>
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

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    if (user) {
      try {
        const { data } = await getUserProfile(user.id)
        setUserProfile(data)
      } catch (error) {
        console.warn('Failed to fetch user profile:', error)
        // Create a basic profile from user data
        setUserProfile({
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || '',
          points: 0,
          role: 'user',
          user_type: user.user_metadata?.user_type || 'tester',
          status: 'pending',
          company: user.user_metadata?.company,
          experience: user.user_metadata?.experience,
          interests: user.user_metadata?.interests,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      }
    }
  }

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        if (session?.user) {
          await refreshProfile()
        }
      } catch (error) {
        console.warn('Supabase not configured properly:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    let subscription: any = null
    try {
      const {
        data: { subscription: authSubscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await refreshProfile()
        } else {
          setUserProfile(null)
        }
        setLoading(false)
      })
      subscription = authSubscription
    } catch (error) {
      console.warn('Auth state change listener failed:', error)
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  const signUp = async (email: string, password: string, fullName: string, userType: 'tester' | 'developer' | 'admin', metadata?: { username?: string; company?: string; experience?: string; interests?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          user_type: userType,
          username: metadata?.username,
          company: metadata?.company,
          experience: metadata?.experience,
          interests: metadata?.interests,
        },
      },
    })
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.warn('Sign out failed:', error)
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
