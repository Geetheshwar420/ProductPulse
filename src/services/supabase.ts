import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Use demo/placeholder values if environment variables are not set
const defaultUrl = 'https://demo.supabase.co'
const defaultKey = 'demo-key'

const finalUrl = supabaseUrl && supabaseUrl !== 'your_supabase_project_url' ? supabaseUrl : defaultUrl
const finalKey = supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key' ? supabaseAnonKey : defaultKey

export const supabase = createClient(finalUrl, finalKey)

// Database Types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  points: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  company_name: string
  image_url?: string
  guidelines?: string
  status: 'pending' | 'active' | 'completed'
  created_at: string
  updated_at: string
}

export interface Feedback {
  id: string
  user_id: string
  product_id: string
  rating: number
  comment: string
  screenshots?: string[]
  video_url?: string
  ai_insights?: string
  created_at: string
  updated_at: string
}

export interface TestingOpportunity {
  id: string
  product_id: string
  user_id: string
  status: 'applied' | 'selected' | 'testing' | 'completed'
  applied_at: string
  selected_at?: string
  completed_at?: string
}

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database helpers
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  return { data, error }
}

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  return { data, error }
}

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const getProductById = async (productId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()
  return { data, error }
}

export const submitFeedback = async (feedback: Omit<Feedback, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('feedback')
    .insert(feedback)
    .select()
    .single()
  return { data, error }
}

export const getFeedbackByProduct = async (productId: string) => {
  const { data, error } = await supabase
    .from('feedback')
    .select(`
      *,
      users (
        full_name,
        avatar_url
      )
    `)
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
  return { data, error }
}
