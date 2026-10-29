import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const stored = localStorage.getItem('rentwheels_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('rentwheels_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !data) {
      throw new Error('Invalid email or password')
    }

    // Simple password check (in production, use proper hashing)
    if (data.password_hash !== password) {
      throw new Error('Invalid email or password')
    }

    setUser(data)
    localStorage.setItem('rentwheels_user', JSON.stringify(data))
    return data
  }

  const signup = async ({ full_name, email, password, phone, address }) => {
    // Check if email already exists
    const { data: existing } = await supabase
      .from('accounts')
      .select('account_id')
      .eq('email', email)
      .single()

    if (existing) {
      throw new Error('An account with this email already exists')
    }

    const { data, error } = await supabase
      .from('accounts')
      .insert([{
        full_name,
        email,
        password_hash: password,
        phone,
        address,
        role: 'Customer',
      }])
      .select()
      .single()

    if (error) throw new Error(error.message)

    setUser(data)
    localStorage.setItem('rentwheels_user', JSON.stringify(data))
    return data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('rentwheels_user')
  }

  const isAdmin = user?.role === 'Administrator' || user?.role === 'Manager'

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
