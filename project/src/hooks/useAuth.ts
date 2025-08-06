import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

// Mock user for development when Supabase is not configured
const MOCK_USER = {
  id: 'mock-user-id',
  email: 'demo@example.com',
  user_metadata: {
    full_name: 'Demo User'
  },
  app_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  role: 'authenticated',
  email_confirmed_at: new Date().toISOString(),
  phone_confirmed_at: undefined,
  last_sign_in_at: new Date().toISOString(),
  confirmation_sent_at: undefined,
  recovery_sent_at: undefined,
  email_change_sent_at: undefined,
  banned_until: undefined,
  phone: undefined,
  phone_change: undefined,
  email_change: undefined,
  factors: undefined,
  identities: []
} as User

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return url && key && url !== 'https://your-project.supabase.co' && key !== 'your-anon-key'
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isSupabaseConfigured()) {
      // Use real Supabase authentication
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    } else {
      // Use mock authentication for development
      console.log('⚠️ Supabase not configured. Using mock authentication for development.')
      setLoading(false)
    }
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true)
      console.log('📝 Signing up with:', email, fullName)
      
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (error) throw error

        if (data.user && !data.session) {
          toast.success('Check your email for the confirmation link!')
        }

        return { data, error: null }
      } else {
        // Mock signup for development
        console.log('🎭 Using mock signup')
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        const mockUser = { ...MOCK_USER, email, user_metadata: { full_name: fullName } }
        console.log('👤 Setting mock user:', mockUser)
        setUser(mockUser)
        toast.success('Account created successfully! (Mock mode)')
        return { data: { user: mockUser }, error: null }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      console.log('🔐 Signing in with:', email)
      
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        toast.success('Welcome back!')
        return { data, error: null }
      } else {
        // Mock signin for development
        console.log('🎭 Using mock authentication')
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        const mockUser = { ...MOCK_USER, email }
        console.log('👤 Setting mock user:', mockUser)
        setUser(mockUser)
        toast.success('Welcome back! (Mock mode)')
        return { data: { user: mockUser }, error: null }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      
      if (isSupabaseConfigured()) {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        toast.success('Signed out successfully')
      } else {
        // Mock signout for development
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
        setUser(null)
        toast.success('Signed out successfully (Mock mode)')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) throw error
        toast.success('Password reset email sent!')
        return { error: null }
      } else {
        // Mock password reset for development
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        toast.success('Password reset email sent! (Mock mode)')
        return { error: null }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage)
      return { error }
    }
  }

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}