import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Car, ShieldCheck, Zap, Award, Sparkles, ArrowRight,
  Clock, CheckCircle2, ChevronRight, Star, Users, MapPin,
  Calendar, Key, Shield, PhoneCall, Quote
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
  const [totalFleetCount, setTotalFleetCount] = useState(68)
  const [loading, setLoading] = useState(true)
  const [bookingVehicle, setBookingVehicle] = useState(null)

  useEffect(() => {
    async function loadFeatured() {
      const { data, count } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact' })
        .order('daily_rate', { ascending: false })
        .limit(6)
      if (data) setFeaturedVehicles(data)
      if (count) setTotalFleetCount(count)
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
          1. HERO SECTION (CINEMATIC LUXURY SHOWCASE)
      ======================================================== */}
      <section className="relative pt-24 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32 overflow-hidden w-full">
        {/* Ambient atmospheric glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-emerald-500/12 via-teal-500/10 to-cyan-500/8 blur-[160px] pointer-events-none rounded-full" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[350px] bg-gradient-to-bl from-purple-500/8 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
          
          {/* Top Editorial Headline Block (Centered, High Impact) */}
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-12 sm:mb-16 w-full">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 mb-6 mx-auto"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>EXOTIC & LUXURY CAR RENTAL IN MANILA</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.12] font-['Outfit'] mb-6 w-full"
            >
              Drive The{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Exceptional.
              </span>
              <br />
              Every Single Mile.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center text-base sm:text-lg text-slate-300/85 leading-relaxed max-w-2xl mx-auto font-normal mb-8 w-full"
            >
              Experience the Philippines' premier fleet of high-performance sports cars, executive SUVs, and luxury passenger vehicles with zero paperwork hurdles and instant digital booking.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full mx-auto"
            >
              <Link
                to="/fleet"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all no-underline cursor-pointer"
              >
                <Car size={18} />
                <span>Browse Full Fleet Catalog</span>
                <ArrowRight size={15} />
              </Link>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all no-underline cursor-pointer"
              >
                <span>How It Works</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium w-full mx-auto"
            >
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Fully Insured Fleet</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock size={16} className="text-cyan-400" />
                <span>Instant Digital Voucher</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Award size={16} className="text-purple-400" />
                <span>Zero Hidden Charges</span>
              </div>
            </motion.div>

          </div>

          {/* Central Showcase: Flagship Vehicle Visual Stage */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-6xl mx-auto rounded-3xl bg-gradient-to-b from-[#0e1626]/90 via-[#0a0f1d]/90 to-[#07090e] border border-white/[0.1] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/90 overflow-hidden group"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-b from-emerald-500/15 via-teal-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

            {/* Top Showcase Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10 w-full">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Featured Flagship
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-lg text-slate-400 bg-white/[0.04] border border-white/[0.06]">
                  EV-9900
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Daily Rate:</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">₱16,000</span>
                <span className="text-xs text-slate-400">/ day</span>
              </div>
            </div>

            {/* Majestic Wide Car Image Showcase */}
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-950 mb-6 group/img w-full">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1600&auto=format&fit=crop&q=85"
                alt="Porsche Taycan Turbo S"
                className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-black/30" />

              {/* Title Overlay in Bottom-Left of Image */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                  PORSCHE
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] tracking-tight drop-shadow-md">
                  Taycan Turbo S
                </h3>
              </div>

              {/* Book Button in Bottom-Right of Image */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
                <Link
                  to="/fleet"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all no-underline cursor-pointer"
                >
                  <span>Rent This Porsche</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Bottom 4-Column Spec Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10 w-full">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-slate-400 block text-[10px] sm:text-xs font-semibold tracking-wider font-mono">POWER</span>
                <span className="font-bold text-white text-sm sm:text-base">750 HP</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-slate-400 block text-[10px] sm:text-xs font-semibold tracking-wider font-mono">ACCELERATION</span>
                <span className="font-bold text-white text-sm sm:text-base">0-100 in 2.8s</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-slate-400 block text-[10px] sm:text-xs font-semibold tracking-wider font-mono">DRIVETRAIN</span>
                <span className="font-bold text-emerald-400 text-sm sm:text-base">Dual Motor AWD</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="text-slate-400 block text-[10px] sm:text-xs font-semibold tracking-wider font-mono">TRANSMISSION</span>
                <span className="font-bold text-cyan-400 text-sm sm:text-base">2-Speed Auto</span>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* ========================================================
          2. FEATURED FLEET SPOTLIGHT
      ======================================================== */}
      <section className="py-24 sm:py-28 bg-[#05070c] border-t border-white/[0.06] relative w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2 font-mono">
                SPOTLIGHT FLEET
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
                Featured Vehicles
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-lg">
                Hand-picked luxury and sports selections ready for turnover today.
              </p>
            </div>

            <Link
              to="/fleet"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors no-underline self-start sm:self-auto"
            >
              <span>View All {totalFleetCount}+ Vehicles</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-emerald-500/30 transition-all no-underline shadow-sm"
            >
              <span>Explore Entire Catalog with Search & Filters</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. HOW IT WORKS
      ======================================================== */}
      <section id="how-it-works" className="py-24 sm:py-32 border-t border-white/[0.06] relative w-full">
        {/* Subtle background ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-emerald-500/5 blur-[160px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 w-full">
          
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2 font-mono">
              SIMPLE & FAST
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight mb-3">
              How RentWheels Works
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg mx-auto">
              Three effortless steps from browsing our curated garage to enjoying the open road.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Select Your Machine',
                desc: 'Explore our catalog of sports cars, SUVs, and luxury sedans with transparent daily rates and specs.',
                tag: 'Guaranteed Available Inventory',
                icon: Car,
                color: '#10b981',
              },
              {
                step: '02',
                title: 'Instant Reservation',
                desc: 'Pick your dates, choose GCash, Credit Card, or Cash payment, and receive your verified receipt.',
                tag: 'Paperless Digital Voucher',
                icon: Calendar,
                color: '#06b6d4',
              },
              {
                step: '03',
                title: 'Turn The Key & Drive',
                desc: 'Meet our concierge at NAIA Airport, BGC, or Makati for rapid inspection and key turnover.',
                tag: 'VIP Airport & Hotel Delivery',
                icon: Key,
                color: '#a855f7',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className="rounded-3xl bg-[#0c111d]/90 border border-white/[0.08] hover:border-emerald-500/35 p-6 sm:p-7 relative overflow-hidden group transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  {/* Accent line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
                  />

                  {/* Header: Step Pill + Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider"
                        style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}35` }}
                      >
                        STEP {item.step}
                      </span>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 duration-300"
                        style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
                      >
                        <Icon size={22} style={{ color: item.color }} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2.5 font-['Outfit'] tracking-tight group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Feature Tag */}
                  <div className="pt-4 border-t border-white/[0.05] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium text-slate-300">
                      {item.tag}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. WHY CHOOSE RENTWHEELS (VALUE PROPS)
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#05070c] border-t border-white/[0.06] relative w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Standards Feature List */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2 font-mono">
                  THE RENTWHEELS STANDARD
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight leading-[1.12] mb-4">
                  Why Discerning Drivers Choose Us
                </h2>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                  We believe renting an exceptional car should feel as exhilarating as owning one. No queues, no hidden surcharges, no compromises.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                {[
                  {
                    title: 'Immaculate Fleet Presentation',
                    desc: 'Every vehicle undergoes multi-point inspection, professional detailing, and arrives with full tank.',
                    icon: ShieldCheck,
                  },
                  {
                    title: 'Doorstep & Airport Concierge',
                    desc: 'Direct handoff at NAIA Terminal 1-3, BGC, Makati CBD, or delivered right to your luxury hotel.',
                    icon: MapPin,
                  },
                  {
                    title: 'All-Inclusive Transparent Pricing',
                    desc: 'Comprehensive insurance, VAT, and roadside coverage clearly detailed with zero deposit friction.',
                    icon: Award,
                  },
                  {
                    title: '24/7 Roadside Assistance & Care',
                    desc: 'Dedicated concierge hotline with immediate replacement guarantee anywhere across Luzon.',
                    icon: PhoneCall,
                  },
                ].map((point, idx) => {
                  const Icon = point.icon
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4.5 rounded-2xl bg-[#0c111d]/60 border border-white/[0.06] hover:border-emerald-500/30 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all mt-0.5">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5 font-['Outfit'] group-hover:text-emerald-300 transition-colors">
                          {point.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Column: 4 Polished Stat Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full">
              {[
                {
                  value: '100%',
                  label: 'Satisfaction Rate',
                  desc: 'Based on 1,200+ verified client rentals',
                  textColor: 'text-emerald-400',
                  icon: Star,
                },
                {
                  value: '60s',
                  label: 'Booking Speed',
                  desc: 'Paperless instant voucher generation',
                  textColor: 'text-cyan-400',
                  icon: Zap,
                },
                {
                  value: '24/7',
                  label: 'Concierge Care',
                  desc: 'Always on-call roadside assistance',
                  textColor: 'text-purple-400',
                  icon: PhoneCall,
                },
                {
                  value: '₱0',
                  label: 'Hidden Surcharges',
                  desc: 'What you see is exactly what you pay',
                  textColor: 'text-emerald-400',
                  icon: ShieldCheck,
                },
              ].map((stat, i) => {
                const StatIcon = stat.icon
                return (
                  <div
                    key={i}
                    className="rounded-3xl bg-[#0c111d]/90 border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300 shadow-xl group relative"
                  >
                    {/* Subtle top accent line */}
                    <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-emerald-500/30 transition-all" />

                    {/* Top row with icon badge */}
                    <div className="flex items-center justify-between mb-3 w-full">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        {stat.label}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors flex-shrink-0">
                        <StatIcon size={13} />
                      </div>
                    </div>

                    {/* Big metric number */}
                    <div className="mb-2">
                      <span className={`text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight ${stat.textColor}`}>
                        {stat.value}
                      </span>
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs text-slate-400 leading-snug">
                      {stat.desc}
                    </p>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. TESTIMONIALS / CLIENT FEEDBACK
      ======================================================== */}
      <section className="py-24 sm:py-32 border-t border-white/[0.06] relative w-full">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          
          <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2 font-mono">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
              Trusted by Discerning Drivers
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Real stories from executives, celebrities, and travelers across Metro Manila.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
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
                className="rounded-3xl bg-[#0c111d]/90 border border-white/[0.08] hover:border-emerald-500/30 p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#f59e0b" />
                      ))}
                    </div>
                    <Quote size={18} className="text-white/10" />
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white font-['Outfit']">{t.author}</h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
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
      <section className="py-24 sm:py-32 border-t border-white/[0.08] relative overflow-hidden w-full">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center relative z-10 w-full">
          <div className="rounded-3xl bg-gradient-to-b from-emerald-500/10 via-[#0c111d] to-[#07090e] border border-emerald-500/25 p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden">
            {/* Ambient inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-emerald-500/15 blur-3xl pointer-events-none rounded-full" />

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-3 font-mono">
              READY TO HIT THE OPEN ROAD?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight mb-4">
              Reserve Your Vehicle in Under 60 Seconds
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Explore our full catalog, filter by your dream specs, and experience luxury automotive freedom with zero paperwork friction.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/fleet"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all no-underline"
              >
                <span>Browse Available Vehicles</span>
                <ArrowRight size={15} />
              </Link>
              {!user && (
                <Link
                  to="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.18] transition-all no-underline"
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
