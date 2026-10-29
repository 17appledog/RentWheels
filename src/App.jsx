import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './context/AuthContext.jsx'
import AnimatedBackground from './components/AnimatedBackground.jsx'
import LandingPage from './pages/LandingPage.jsx'
import CustomerPortal from './pages/CustomerPortal.jsx'
import RentalHistory from './pages/RentalHistory.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />
  return children
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#07090e] gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center animate-pulse shadow-lg shadow-emerald-500/20">
          <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="text-2xl font-black text-white font-['Outfit']">
          Rent<span className="text-emerald-400">Wheels</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <AnimatedBackground />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'rgba(13, 19, 31, 0.95)',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            fontFamily: 'Inter, sans-serif',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.8)',
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#07090e' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#07090e' },
          },
        }}
      />
      <div className="page-container flex flex-col min-h-screen bg-[#07090e]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/fleet" element={<CustomerPortal />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
            <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignupPage />} />
            <Route path="/history" element={
              <ProtectedRoute>
                <RentalHistory />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}
