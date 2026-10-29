import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Car, LayoutDashboard, History, LogOut, User,
  Menu, X, Sparkles, ChevronRight, LogIn, ArrowRight
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#07090e]/85 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 no-underline group"
          >
            <div className="relative">
              <img
                src="/logo.svg"
                alt="RentWheels Logo"
                className="w-10 h-10 rounded-2xl shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 group-hover:scale-105 transition-all duration-300 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white font-['Outfit'] flex items-center">
                Rent<span className="text-emerald-400">Wheels</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 -mt-1 font-mono">
                Luxury & Exotic Fleet
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <Link
              to="/"
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all no-underline ${
                isActive('/')
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              Home
            </Link>

            <Link
              to="/fleet"
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all no-underline ${
                isActive('/fleet')
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              Fleet Catalog
            </Link>

            {user && !isAdmin && (
              <Link
                to="/history"
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all no-underline ${
                  isActive('/history')
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
                }`}
              >
                <History size={14} />
                <span>My Bookings</span>
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all no-underline ${
                  isActive('/admin')
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
                }`}
              >
                <LayoutDashboard size={14} />
                <span>Admin Console</span>
              </Link>
            )}
          </nav>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                    {user.full_name?.charAt(0) || <User size={13} />}
                  </div>
                  <span className="text-xs font-semibold text-white truncate max-w-[120px]">
                    {user.full_name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">
                    {user.role}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors no-underline"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all no-underline"
                >
                  <span>Get Started</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/[0.08] bg-[#07090e]/95 backdrop-blur-2xl px-5 py-6 space-y-4 shadow-2xl"
          >
            {user && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center border border-emerald-500/30">
                  {user.full_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user.full_name}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">
                    {user.role}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold transition-all no-underline ${
                  isActive('/')
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Car size={18} className="text-emerald-400" />
                  <span>Home</span>
                </div>
                <ChevronRight size={16} className="text-slate-600" />
              </Link>

              <Link
                to="/fleet"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold transition-all no-underline ${
                  isActive('/fleet')
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={18} className="text-cyan-400" />
                  <span>Fleet Catalog</span>
                </div>
                <ChevronRight size={16} className="text-slate-600" />
              </Link>

              {user && !isAdmin && (
                <Link
                  to="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold transition-all no-underline ${
                    isActive('/history')
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <History size={18} className="text-cyan-400" />
                    <span>My Bookings</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-600" />
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl text-sm font-semibold transition-all no-underline ${
                    isActive('/admin')
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <LayoutDashboard size={18} className="text-purple-400" />
                    <span>Admin Dashboard</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-600" />
                </Link>
              )}
            </div>

            <div className="pt-3 border-t border-white/[0.08]">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-3 rounded-2xl text-sm font-semibold text-white bg-white/[0.06] border border-white/[0.08] no-underline"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-3 rounded-2xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 no-underline shadow-md shadow-emerald-500/20"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
