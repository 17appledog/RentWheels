import { motion } from 'framer-motion'
import {
  Fuel, Users, Settings, Zap, Calendar, ArrowRight,
  ShieldCheck, Check, Sparkles, Hash
} from 'lucide-react'

const fuelIcons = {
  Gasoline: Fuel,
  Diesel: Fuel,
  Electric: Zap,
  Hybrid: Zap,
}

// Curated high-res automotive imagery
const VEHICLE_IMAGES = {
  Porsche: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=80',
  Ford: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&auto=format&fit=crop&q=80',
  BMW: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
  Tesla: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
  Toyota: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
  Honda: 'https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=800&auto=format&fit=crop&q=80',
  Mitsubishi: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80',
  Mercedes: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
  Audi: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=80',
  Hyundai: 'https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=800&auto=format&fit=crop&q=80',
  Kia: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&auto=format&fit=crop&q=80',
  Nissan: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80',
  default: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80',
}

function getVehicleImage(brand, model = '') {
  // Model specific overrides
  if (model.toLowerCase().includes('alphard')) {
    return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80'
  }
  return VEHICLE_IMAGES[brand] || VEHICLE_IMAGES.default
}

export default function VehicleCard({ vehicle, onBook, index = 0 }) {
  const FuelIcon = fuelIcons[vehicle.fuel_type] || Fuel
  const isAvailable = vehicle.status === 'Available'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col h-full rounded-2xl bg-[#0d131f]/90 border border-white/[0.08] hover:border-emerald-500/40 backdrop-blur-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-300"
    >
      {/* Glow Hover Backing */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.04] via-transparent to-cyan-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image & Header Overlay */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-[#060a12]">
        <img
          src={getVehicleImage(vehicle.brand, vehicle.model)}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient dark fade at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/30 to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          {/* Year & Category */}
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md border border-white/10 shadow-sm">
            <Calendar size={11} className="text-emerald-400" />
            {vehicle.year}
          </span>

          {/* Status Badge */}
          {isAvailable ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 shadow-lg shadow-emerald-950/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-amber-300 bg-amber-950/80 backdrop-blur-md border border-amber-500/40">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Rented
            </span>
          )}
        </div>

        {/* Plate Number Floating on Bottom Right of Image */}
        <div className="absolute bottom-3 right-3.5">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium text-[#94a3b8] bg-black/60 backdrop-blur-md border border-white/10">
            <Hash size={10} className="text-emerald-400/80" />
            {vehicle.plate_number}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 gap-4">
        {/* Title & Brand */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              {vehicle.brand}
            </span>
            <span className="text-xs text-[#64748b] font-medium">
              ID #{vehicle.vehicle_id}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight leading-snug line-clamp-1 font-['Outfit'] group-hover:text-emerald-300 transition-colors">
            {vehicle.model}
          </h3>
        </div>

        {/* Vehicle Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex flex-col items-center justify-center text-center gap-1">
            <Settings size={15} className="text-[#10b981]" />
            <span className="text-[11px] font-medium text-[#cbd5e1] truncate max-w-full">
              {vehicle.transmission}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center gap-1 border-x border-white/[0.06]">
            <FuelIcon size={15} className="text-[#06b6d4]" />
            <span className="text-[11px] font-medium text-[#cbd5e1] truncate max-w-full">
              {vehicle.fuel_type}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center gap-1">
            <Users size={15} className="text-[#a855f7]" />
            <span className="text-[11px] font-medium text-[#cbd5e1] truncate max-w-full">
              {vehicle.seating_capacity} Seats
            </span>
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/[0.06]">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#64748b]">
              Daily Rate
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
                ₱{Number(vehicle.daily_rate).toLocaleString()}
              </span>
              <span className="text-xs text-[#94a3b8] font-normal">/ day</span>
            </div>
          </div>

          {isAvailable ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onBook?.(vehicle)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all cursor-pointer"
            >
              <span>Book Now</span>
              <ArrowRight size={14} />
            </motion.button>
          ) : (
            <button
              disabled
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-[#64748b] bg-white/[0.04] border border-white/[0.06] cursor-not-allowed"
            >
              Reserved
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
