import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Car, ShieldCheck, Zap, Award, Sparkles, ArrowRight,
  Clock, CheckCircle2, ChevronRight, Star, Users, MapPin,
  Calendar, Key, Shield, PhoneCall
} from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import VehicleCard from '../components/VehicleCard.jsx'
import BookingModal from '../components/BookingModal.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'

export default function LandingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [featuredVehicles, setFeaturedVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingVehicle, setBookingVehicle] = useState(null)

  useEffect(() => {
    async function loadFeatured() {
      const { data } = await supabase
        .from('vehicles')
        .select('*')
        .limit(3)
      if (data) setFeaturedVehicles(data)
      setLoading(false)
    }
    loadFeatured()
  }, [])

  const handleBook = (vehicle) => {
    if (!user) {
      toast.error('Please sign in or register to book a car', { id: 'auth-req' })
      navigate('/login')
      return
    }
    setBookingVehicle(vehicle)
  }

  return (
    <div className="bg-[#07090e] text-slate-100 min-h-screen">
      
      {/* ========================================================
          1. HERO SECTION
      ======================================================== */}
      <section className="relative pt-28 pb-24 sm:pt-32 sm:pb-36 overflow-hidden">
        {/* Glow orb in background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25"
              >
                <Sparkles size={14} className="text-emerald-400" />
                <span>EXOTIC & LUXURY CAR RENTAL IN MANILA</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.06] font-['Outfit']"
              >
                Drive The{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  Exceptional.
                </span>
                <br />
                Every Mile.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
              >
                Experience Philippines' premier fleet of high-performance sports cars, executive SUVs, and luxury passenger vehicles with zero paperwork hurdles and instant digital booking.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <Link
                  to="/fleet"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all no-underline"
                >
                  <Car size={18} />
                  <span>Browse Full Fleet Catalog</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-all no-underline"
                >
                  <span>How It Works</span>
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium"
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-emerald-400" /> Fully Insured Fleet
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-cyan-400" /> Instant Digital Voucher
                </span>
                <span className="flex items-center gap-1.5">
                  <Award size={15} className="text-purple-400" /> Zero Hidden Charges
                </span>
              </motion.div>
            </div>

            {/* Right Column: Hero Visual Feature Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              {/* Highlight Card */}
              <div className="relative rounded-3xl bg-[#0d131f]/90 border border-white/[0.1] p-6 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden group">
                
                {/* Image */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-950 mb-5">
                  <img
                    src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80"
                    alt="Porsche Taycan Turbo S"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d131f] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-950 bg-emerald-400 shadow-md">
                      FEATURED FLAGSHIP
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono text-emerald-300 bg-black/70 backdrop-blur-md border border-emerald-500/30">
                      EV-9900
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">PORSCHE</span>
                      <h3 className="text-2xl font-black text-white font-['Outfit']">Taycan Turbo S</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white font-['Outfit']">₱16,000</span>
                      <span className="text-xs text-slate-400 block font-normal">/ day</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">POWER</span>
                      <span className="font-semibold text-white">750 HP</span>
                    </div>
                    <div className="border-x border-white/[0.06]">
                      <span className="text-slate-500 block text-[10px]">0-100 KM/H</span>
                      <span className="font-semibold text-white">2.8s</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">DRIVETRAIN</span>
                      <span className="font-semibold text-emerald-400">AWD Dual</span>
                    </div>
                  </div>

                  <Link
                    to="/fleet"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors no-underline cursor-pointer shadow-md shadow-emerald-500/20"
                  >
                    <span>Rent This Porsche</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. FEATURED FLEET SPOTLIGHT
      ======================================================== */}
      <section className="py-20 bg-[#06080d] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2 font-mono">
                SPOTLIGHT FLEET
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
                Featured Vehicles
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Hand-picked luxury and sports selections ready for turnover today.
              </p>
            </div>

            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors no-underline"
            >
              <span>View All 8+ Vehicles</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {featuredVehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.vehicle_id}
                vehicle={vehicle}
                index={index}
                onBook={handleBook}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/fleet"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] transition-all no-underline"
            >
              <span>Explore Entire Catalog with Search & Filters</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. HOW IT WORKS
      ======================================================== */}
      <section id="how-it-works" className="py-28 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2 font-mono">
              SIMPLE & FAST
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight mb-3">
              How RentWheels Works
            </h2>
            <p className="text-sm text-slate-400">
              Three effortless steps from browsing to hitting the open road in your dream machine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Select Your Machine',
                desc: 'Explore our catalog of sports cars, SUVs, and luxury sedans with transparent daily rates and specs.',
                icon: Car,
                color: '#10b981',
              },
              {
                step: '02',
                title: 'Instant Reservation',
                desc: 'Pick your dates, choose GCash, Credit Card, or Cash payment, and receive your verified receipt.',
                icon: Calendar,
                color: '#06b6d4',
              },
              {
                step: '03',
                title: 'Turn The Key & Drive',
                desc: 'Meet our concierge at NAIA Airport, BGC, or Makati for rapid inspection and key turnover.',
                icon: Key,
                color: '#a855f7',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className="rounded-3xl bg-[#0d131f]/80 border border-white/[0.08] p-8 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-xl"
                >
                  <span className="text-5xl font-black text-white/[0.04] group-hover:text-emerald-500/10 transition-colors absolute top-4 right-6 font-mono pointer-events-none">
                    {item.step}
                  </span>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon size={26} style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. WHY CHOOSE RENTWHEELS (VALUE PROPS)
      ======================================================== */}
      <section className="py-28 sm:py-32 bg-[#06080d] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2 font-mono">
                THE RENTWHEELS STANDARD
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight leading-[1.1] mb-6">
                Why Discerning Drivers Choose Us
              </h2>
              <p className="text-base text-slate-400 leading-relaxed mb-8">
                We believe renting an exceptional car should feel as exhilarating as owning one. No queues, no hidden surcharges, no compromises.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: 'Immaculate Fleet Presentation',
                    desc: 'Every vehicle undergoes multi-point inspection, professional detailing, and arrives with full tank.',
                  },
                  {
                    title: 'Doorstep & Airport Concierge',
                    desc: 'Direct handoff at NAIA Terminal 1-3, BGC, Makati CBD, or delivered right to your luxury hotel.',
                  },
                  {
                    title: 'All-Inclusive Transparent Pricing',
                    desc: 'Comprehensive insurance, VAT, and roadside coverage clearly detailed with zero deposit friction.',
                  },
                  {
                    title: '24/7 Roadside Assistance & Care',
                    desc: 'Dedicated hotline with immediate replacement guarantee anywhere across Luzon.',
                  },
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5 border border-emerald-500/25">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5 font-['Outfit']">{point.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side stat cards */}
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-3xl bg-[#0d131f] border border-white/[0.08] p-6 text-center space-y-2">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 font-['Outfit']">100%</span>
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Satisfaction Rate</p>
                <p className="text-[11px] text-slate-500">Based on 1,200+ verified client rentals</p>
              </div>

              <div className="rounded-3xl bg-[#0d131f] border border-white/[0.08] p-6 text-center space-y-2">
                <span className="text-4xl sm:text-5xl font-black text-cyan-400 font-['Outfit']">60s</span>
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Booking Speed</p>
                <p className="text-[11px] text-slate-500">Paperless instant voucher generation</p>
              </div>

              <div className="rounded-3xl bg-[#0d131f] border border-white/[0.08] p-6 text-center space-y-2">
                <span className="text-4xl sm:text-5xl font-black text-purple-400 font-['Outfit']">24/7</span>
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Concierge Care</p>
                <p className="text-[11px] text-slate-500">Always on-call roadside assistance</p>
              </div>

              <div className="rounded-3xl bg-[#0d131f] border border-white/[0.08] p-6 text-center space-y-2">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400 font-['Outfit']">₱0</span>
                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Hidden Surcharges</p>
                <p className="text-[11px] text-slate-500">What you see is exactly what you pay</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. TESTIMONIALS / CLIENT FEEDBACK
      ======================================================== */}
      <section className="py-28 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2 font-mono">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Trusted by Discerning Drivers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                quote: "Rented the Porsche Taycan for an executive weekend in Tagaytay. The car was spotless, charged to 100%, and turnover took under 3 minutes at NAIA. Unmatched luxury service.",
                author: "Marcus V.",
                role: "Managing Director, Tech Ventures",
                vehicle: "Porsche Taycan Turbo S",
              },
              {
                quote: "The Ford Mustang GT was an absolute beast. Sounded incredible and turned heads all through BGC. RentWheels makes booking completely effortless.",
                author: "Carlos D.",
                role: "Architectural Lead",
                vehicle: "Ford Mustang GT Premium",
              },
              {
                quote: "Needed a reliable, executive 7-seater for visiting partners. The Toyota Alphard Royal Lounge exceeded every expectation. Smooth ride and professional staff.",
                author: "Patricia S.",
                role: "Regional Director",
                vehicle: "Toyota Alphard Royal Lounge",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#0d131f]/80 border border-white/[0.08] p-7 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Outfit']">{t.author}</h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {t.vehicle}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          6. BOTTOM CALL TO ACTION
      ======================================================== */}
      <section className="pt-28 pb-32 sm:pt-32 sm:pb-36 border-t border-white/[0.08] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="rounded-3xl bg-gradient-to-b from-emerald-500/10 via-[#0d131f] to-[#07090e] border border-emerald-500/25 p-10 sm:p-16 shadow-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-3 font-mono">
              READY TO HIT THE OPEN ROAD?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight mb-4">
              Reserve Your Vehicle in Under 60 Seconds
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8">
              Explore our full catalog, filter by your dream specs, and experience luxury automotive freedom.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/fleet"
                className="w-full sm:w-auto px-9 py-4 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/30 transition-all no-underline"
              >
                Browse Available Vehicles
              </Link>
              {!user && (
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all no-underline"
                >
                  Create Free Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        vehicle={bookingVehicle}
        isOpen={!!bookingVehicle}
        onClose={() => setBookingVehicle(null)}
      />
    </div>
  )
}
