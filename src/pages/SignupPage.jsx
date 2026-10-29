import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, MapPin, UserPlus, Car, Loader2, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'

export default function SignupPage() {
  const { signup } = useAuth()
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (form.password.length < 4) {
      toast.error('Password must be at least 4 characters')
      return
    }
    setLoading(true)
    try {
      await signup({
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
      })
      toast.success('Account created successfully!')
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
            initial={{ rotate: 10 }}
            animate={{ rotate: 0 }}
            transition={{ type: 'spring', damping: 10 }}
          >
            <img src="/logo.svg" alt="RentWheels Logo" className="w-16 h-16 rounded-2xl shadow-xl shadow-emerald-500/25" />
          </motion.div>
          <h1 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Create Account
          </h1>
          <p className="text-[#64748b] text-sm">Join RentWheels and start driving today</p>
        </div>

        {/* Form */}
        <div className="glass-strong p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="input-label flex items-center gap-1.5">
                <User size={13} /> Full Name
              </label>
              <input type="text" className="input-field" placeholder="Juan Dela Cruz" value={form.full_name} onChange={update('full_name')} required />
            </div>

            <div>
              <label className="input-label flex items-center gap-1.5">
                <Mail size={13} /> Email Address
              </label>
              <input type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={update('email')} required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="input-label flex items-center gap-1.5">
                  <Lock size={13} /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-field pr-10"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={update('password')}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#94a3b8] transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="input-label flex items-center gap-1.5">
                  <Lock size={13} /> Confirm
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-field"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label flex items-center gap-1.5">
                <Phone size={13} /> Phone Number
              </label>
              <input type="tel" className="input-field" placeholder="+63 912 345 6789" value={form.phone} onChange={update('phone')} required />
            </div>

            <div>
              <label className="input-label flex items-center gap-1.5">
                <MapPin size={13} /> Address
              </label>
              <input type="text" className="input-field" placeholder="City, Province" value={form.address} onChange={update('address')} required />
            </div>

            <motion.button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-[#64748b] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#10b981] hover:text-[#34d399] transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
