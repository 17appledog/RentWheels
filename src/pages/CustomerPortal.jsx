import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Search, SlidersHorizontal, Car, Sparkles, X,
  Zap, CheckCircle2, Users, ChevronDown, RotateCcw,
  Check, ArrowRight, Flame
} from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'
import VehicleCard from '../components/VehicleCard.jsx'
import BookingModal from '../components/BookingModal.jsx'

export default function CustomerPortal() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [filters, setFilters] = useState({
    brand: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    status: '',
  })
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false)
  const [bookingVehicle, setBookingVehicle] = useState(null)

  const fetchVehicles = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('vehicle_id', { ascending: true })
    if (!error && data) setVehicles(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  // Filter options based on vehicles
  const filterOptions = useMemo(() => ({
    brands: [...new Set(vehicles.map(v => v.brand))].filter(Boolean).sort(),
    transmissions: [...new Set(vehicles.map(v => v.transmission))].filter(Boolean).sort(),
    fuel_types: [...new Set(vehicles.map(v => v.fuel_type))].filter(Boolean).sort(),
    seating: [...new Set(vehicles.map(v => v.seating_capacity))].filter(Boolean).sort((a, b) => a - b),
  }), [vehicles])

  // Category filters
  const japaneseBrands = ['toyota', 'lexus', 'nissan', 'honda', 'mazda', 'subaru', 'mitsubishi']
  const sportsKeywords = [
    'porsche', 'mustang', 'bmw', 'ferrari', 'lamborghini', 'mclaren', 'aston', 'corvette', 'maserati', 'amg', 'audi',
    'supra', 'gt-r', 'gtr', 'type r', 'wrx', 'miata', 'brz', 'gr86', 'yaris', 'corolla', 'evo', 'lc 500', 'rc f'
  ]
  const suvKeywords = [
    'fortuner', 'montero', 'suv', 'range rover', 'defender', 'urus', 'dbx', 'cayenne', 'escalade', 'x7', 'lx 600', 'g 63', 'g-class', 'q8', 'grecale',
    'land cruiser', 'prado', 'patrol', 'gx 550', 'rx 500', 'cx-90', 'terra', 'cr-v'
  ]

  const categories = [
    { id: 'all', label: 'All Fleet', icon: Car, count: vehicles.length },
    { id: 'japanese', label: 'Japanese & JDM', icon: Flame, count: vehicles.filter(v => japaneseBrands.includes(v.brand.toLowerCase())).length },
    { id: 'sports', label: 'Performance & Exotics', icon: Sparkles, count: vehicles.filter(v => sportsKeywords.some(k => v.brand.toLowerCase().includes(k) || v.model.toLowerCase().includes(k))).length },
    { id: 'suv', label: 'SUVs & 7-Seaters', icon: Users, count: vehicles.filter(v => v.seating_capacity >= 7 || suvKeywords.some(k => v.brand.toLowerCase().includes(k) || v.model.toLowerCase().includes(k))).length },
    { id: 'electric', label: 'Electric & Hybrid', icon: Zap, count: vehicles.filter(v => v.fuel_type === 'Electric' || v.fuel_type === 'Hybrid').length },
    { id: 'available', label: 'Available Now', icon: CheckCircle2, count: vehicles.filter(v => v.status === 'Available').length },
  ]

  // Filtered & Sorted vehicles
  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter(v => {
      const q = searchQuery.toLowerCase().trim()
      const searchMatch = !q ||
        `${v.brand} ${v.model} ${v.plate_number} ${v.fuel_type} ${v.transmission}`.toLowerCase().includes(q)

      // Category matching
      let categoryMatch = true
      if (selectedCategory === 'japanese') {
        categoryMatch = japaneseBrands.includes(v.brand.toLowerCase())
      } else if (selectedCategory === 'electric') {
        categoryMatch = v.fuel_type === 'Electric' || v.fuel_type === 'Hybrid'
      } else if (selectedCategory === 'suv') {
        categoryMatch = v.seating_capacity >= 7 || suvKeywords.some(k => v.brand.toLowerCase().includes(k) || v.model.toLowerCase().includes(k))
      } else if (selectedCategory === 'sports') {
        categoryMatch = sportsKeywords.some(k =>
          v.brand.toLowerCase().includes(k) || v.model.toLowerCase().includes(k)
        )
      } else if (selectedCategory === 'available') {
        categoryMatch = v.status === 'Available'
      }

      // Explicit filters
      const brandMatch = !filters.brand || v.brand === filters.brand
      const transMatch = !filters.transmission || v.transmission === filters.transmission
      const fuelMatch = !filters.fuel_type || v.fuel_type === filters.fuel_type
      const seatMatch = !filters.seating_capacity || v.seating_capacity === Number(filters.seating_capacity)
      const statusMatch = !filters.status || v.status === filters.status

      return searchMatch && categoryMatch && brandMatch && transMatch && fuelMatch && seatMatch && statusMatch
    })

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => Number(a.daily_rate) - Number(b.daily_rate))
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => Number(b.daily_rate) - Number(a.daily_rate))
    } else if (sortBy === 'seats_desc') {
      result.sort((a, b) => Number(b.seating_capacity) - Number(a.seating_capacity))
    } else if (sortBy === 'year_desc') {
      result.sort((a, b) => Number(b.year) - Number(a.year))
    }

    return result
  }, [vehicles, searchQuery, selectedCategory, filters, sortBy])

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setFilters({
      brand: '',
      transmission: '',
      fuel_type: '',
      seating_capacity: '',
      status: '',
    })
  }

  const handleBookClick = (vehicle) => {
    if (!user) {
      toast.error('Please sign in or create an account to reserve this vehicle', { id: 'auth-toast' })
      navigate('/login')
      return
    }
    setBookingVehicle(vehicle)
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 mb-3 font-mono">
              <Car size={14} className="text-emerald-400" />
              <span>THE FLEET COLLECTION</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
              Explore Our Fleet
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Filter by vehicle category, fuel type, transmission, or search for your favorite model.
            </p>
          </div>
          <div className="text-sm text-slate-400 font-medium">
            Showing <span className="font-bold text-white text-base">{filteredVehicles.length}</span> of {vehicles.length} vehicles available
          </div>
        </div>

        {/* ========================================================
            FLEET CONTROL HUB (SEARCH, CATEGORIES, FILTERS, SORT)
        ======================================================== */}
        <div className="rounded-3xl bg-[#0d131f]/95 border border-white/[0.08] p-5 sm:p-6 mb-10 shadow-xl space-y-5">
          
          {/* Row 1: Search Bar + Filter Button + Sort Selector */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search Input Field */}
            <div className="flex-1 relative flex items-center">
              <Search size={18} className="absolute left-4 text-emerald-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand, model, or plate (e.g. Porsche, Mustang, Fortuner, Electric)..."
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] focus:border-emerald-500/50 text-white placeholder-slate-500 text-sm outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Granular Filters Button */}
            <button
              onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
              className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer border ${
                showFiltersDrawer || activeFilterCount > 0
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-sm'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white border-white/[0.08] hover:bg-white/[0.06]'
              }`}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Selector */}
            <div className="relative min-w-[170px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3.5 px-4 pr-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white text-sm font-semibold outline-none cursor-pointer appearance-none hover:border-white/[0.15] transition-all"
              >
                <option value="featured" className="bg-[#0d131f] text-white">Sort: Featured</option>
                <option value="price_asc" className="bg-[#0d131f] text-white">Price: Low to High</option>
                <option value="price_desc" className="bg-[#0d131f] text-white">Price: High to Low</option>
                <option value="seats_desc" className="bg-[#0d131f] text-white">Capacity: Most Seats</option>
                <option value="year_desc" className="bg-[#0d131f] text-white">Newest Year</option>
              </select>
              <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Row 2: Category Quick Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35 shadow-sm shadow-emerald-500/10'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon size={14} className={isSelected ? 'text-emerald-400' : 'text-slate-400'} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'bg-white/[0.06] text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Expandable Granular Filters Drawer */}
          <AnimatePresence>
            {showFiltersDrawer && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="pt-5 border-t border-white/[0.06] overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {/* Brand */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Brand
                    </label>
                    <select
                      value={filters.brand}
                      onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0d131f]">All Brands</option>
                      {filterOptions.brands.map(b => (
                        <option key={b} value={b} className="bg-[#0d131f]">{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Transmission */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Transmission
                    </label>
                    <select
                      value={filters.transmission}
                      onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0d131f]">All Transmissions</option>
                      {filterOptions.transmissions.map(t => (
                        <option key={t} value={t} className="bg-[#0d131f]">{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fuel Type */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Fuel Type
                    </label>
                    <select
                      value={filters.fuel_type}
                      onChange={(e) => setFilters({ ...filters, fuel_type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0d131f]">All Fuel Types</option>
                      {filterOptions.fuel_types.map(f => (
                        <option key={f} value={f} className="bg-[#0d131f]">{f}</option>
                      ))}
                    </select>
                  </div>

                  {/* Capacity */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Min Seats
                    </label>
                    <select
                      value={filters.seating_capacity}
                      onChange={(e) => setFilters({ ...filters, seating_capacity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0d131f]">Any Capacity</option>
                      {filterOptions.seating.map(s => (
                        <option key={s} value={s} className="bg-[#0d131f]">{s}+ Seats</option>
                      ))}
                    </select>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-xs outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0d131f]">All Statuses</option>
                      <option value="Available" className="bg-[#0d131f]">Available Now</option>
                      <option value="Rented" className="bg-[#0d131f]">Rented</option>
                    </select>
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                    >
                      <RotateCcw size={12} />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filter Tags */}
          {(activeFilterCount > 0 || searchQuery || selectedCategory !== 'all') && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
              <span className="text-xs text-slate-400 font-medium mr-1">Applied:</span>

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {categories.find(c => c.id === selectedCategory)?.label}
                  <button onClick={() => setSelectedCategory('all')} className="hover:text-white cursor-pointer">
                    <X size={12} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-white cursor-pointer">
                    <X size={12} />
                  </button>
                </span>
              )}

              {Object.entries(filters).map(([k, v]) => {
                if (!v) return null
                return (
                  <span key={k} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                    {v}
                    <button onClick={() => setFilters({ ...filters, [k]: '' })} className="hover:text-white cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                )
              })}

              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-slate-400 hover:text-white transition-colors underline ml-2 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* ========================================================
            VEHICLE CARDS GRID
        ======================================================== */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-9 h-9 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400">Loading fleet catalog...</p>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="rounded-3xl bg-[#0d131f]/70 border border-white/[0.08] p-12 text-center max-w-md mx-auto">
            <Car size={44} className="mx-auto text-slate-500 mb-3" />
            <h3 className="text-lg font-bold text-white mb-1 font-['Outfit']">No Matching Vehicles Found</h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              We couldn't find vehicles matching your search criteria. Try resetting filters or expanding your search terms.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer"
            >
              Reset Filters & Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredVehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.vehicle_id}
                vehicle={vehicle}
                index={index}
                onBook={handleBookClick}
              />
            ))}
          </div>
        )}

      </div>

      {/* Booking Modal */}
      <BookingModal
        vehicle={bookingVehicle}
        isOpen={!!bookingVehicle}
        onClose={() => setBookingVehicle(null)}
        onSuccess={fetchVehicles}
      />
    </div>
  )
}
