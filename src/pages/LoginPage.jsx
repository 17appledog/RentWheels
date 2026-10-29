import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn, Car, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address'
    }
    if (!password) {
      errs.password = 'Password is required'
    }
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Welcome back!')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-28 pb-12 sm:pt-32 sm:pb-16">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 mx-auto mb-4"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ type: 'spring', damping: 10 }}
          >
            <img src="/logo.svg" alt="RentWheels Logo" className="w-16 h-16 rounded-2xl shadow-xl shadow-emerald-500/25" />
          </motion.div>
          <h1 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Welcome Back
          </h1>
          <p className="text-[#64748b] text-sm">Sign in to your RentWheels account</p>
        </div>

        {/* Form */}
        <div className="glass-strong p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label className="input-label flex items-center gap-1.5">
                <Mail size={13} /> Email Address
              </label>
              <input
                type="email"
                className={`input-field ${errors.email ? 'border-red-500/60 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })) }}
              />
              {errors.email && (
                <p className="flex items-center gap-1 mt-1.5 text-xs text-red-400 font-medium">
                  <AlertCircle size={12} />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="input-label flex items-center gap-1.5">
                <Lock size={13} /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`input-field pr-10 ${errors.password ? 'border-red-500/60 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined })) }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1 mt-1.5 text-xs text-red-400 font-medium">
                  <AlertCircle size={12} />
                  {errors.password}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-xs text-[#64748b] text-center mb-3 font-medium">Demo Quick Login</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@rentwheels.com')
                  setPassword('admin123')
                  setErrors({})
                }}
                className="px-3 py-2 rounded-xl text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-[#94a3b8] hover:text-[#10b981] transition-all flex flex-col items-center"
              >
                <span className="font-semibold text-white">Admin Demo</span>
                <span className="text-[10px] text-[#64748b]">admin@rentwheels.com</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('customer@rentwheels.com')
                  setPassword('customer123')
                  setErrors({})
                }}
                className="px-3 py-2 rounded-xl text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-[#94a3b8] hover:text-[#22d3ee] transition-all flex flex-col items-center"
              >
                <span className="font-semibold text-white">Customer Demo</span>
                <span className="text-[10px] text-[#64748b]">customer@rentwheels.com</span>
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-[#64748b] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#10b981] hover:text-[#34d399] transition-colors font-medium">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
