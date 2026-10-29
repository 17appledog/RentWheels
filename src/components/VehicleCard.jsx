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
  Ferrari: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&auto=format&fit=crop&q=80',
  Lamborghini: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80',
  McLaren: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&auto=format&fit=crop&q=80',
  Bentley: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
  'Rolls-Royce': 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&auto=format&fit=crop&q=80',
  'Aston Martin': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
  'Land Rover': 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&auto=format&fit=crop&q=80',
  Cadillac: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80',
  Lexus: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
  Maserati: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop&q=80',
  Chevrolet: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop&q=80',
  Mercedes: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80',
  BMW: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
  Audi: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=80',
  Ford: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&auto=format&fit=crop&q=80',
  Tesla: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=80',
  Toyota: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
  Honda: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?w=800&auto=format&fit=crop&q=80',
  Mitsubishi: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80',
  Hyundai: 'https://images.unsplash.com/photo-1629897048514-3dd7414fe72a?w=800&auto=format&fit=crop&q=80',
  Kia: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&auto=format&fit=crop&q=80',
  Nissan: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop&q=80',
  Mazda: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=80',
  Subaru: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800&auto=format&fit=crop&q=80',
  default: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80',
}

function getVehicleImage(brand, model = '') {
  const m = (model || '').toLowerCase()
  // Model specific overrides for recognizable flagships
  if (m.includes('alphard') || m.includes('lm 350') || m.includes('hiace') || m.includes('zenix')) {
    return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('g 63') || m.includes('g-class')) {
    return 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('urus')) {
    return 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('911')) {
    return 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('defender')) {
    return 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('escalade') || m.includes('patrol')) {
    return 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('civic') || m.includes('accord')) {
    return 'https://images.unsplash.com/photo-1605816988069-b11383b50717?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('supra') || m.includes('gr86') || m.includes('brz')) {
    return 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('gt-r') || m.includes('gtr')) {
    return 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('land cruiser') || m.includes('prado')) {
    return 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('miata') || m.includes('mx-5')) {
    return 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('wrx')) {
    return 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80'
  }
  if (m.includes('evo') || m.includes('evolution')) {
    return 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=80'
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
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#060a12]">
        <img
          src={getVehicleImage(vehicle.brand, vehicle.model)}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== VEHICLE_IMAGES.default) {
              e.currentTarget.src = VEHICLE_IMAGES.default
            }
          }}
        />

        {/* Gradient dark fade at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d131f] via-transparent to-black/30" />

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
      </div>

      {/* Card Body - Generous Spacing from Picture */}
      <div className="flex-1 flex flex-col justify-between p-6 gap-5">
        {/* Title & Brand */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
              {vehicle.brand}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.06]">
              <Hash size={10} className="text-emerald-400/80" />
              {vehicle.plate_number}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight leading-snug line-clamp-1 font-['Outfit'] group-hover:text-emerald-300 transition-colors">
            {vehicle.model}
          </h3>
        </div>

        {/* Vehicle Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex flex-col items-center justify-center text-center gap-1 py-0.5">
            <Settings size={14} className="text-emerald-400" />
            <span className="text-[11px] font-medium text-slate-300 truncate max-w-full">
              {vehicle.transmission}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center gap-1 py-0.5 border-x border-white/[0.06]">
            <FuelIcon size={14} className="text-cyan-400" />
            <span className="text-[11px] font-medium text-slate-300 truncate max-w-full">
              {vehicle.fuel_type}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center gap-1 py-0.5">
            <Users size={14} className="text-purple-400" />
            <span className="text-[11px] font-medium text-slate-300 truncate max-w-full">
              {vehicle.seating_capacity} Seats
            </span>
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div className="pt-4 flex items-center justify-between gap-3 border-t border-white/[0.06]">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 font-mono">
              Daily Rate
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
                ₱{Number(vehicle.daily_rate).toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-normal">/ day</span>
            </div>
          </div>

          {isAvailable ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onBook?.(vehicle)}
              className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all cursor-pointer"
            >
              <span>Book Now</span>
              <ArrowRight size={14} />
            </motion.button>
          ) : (
            <button
              disabled
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 bg-white/[0.04] border border-white/[0.06] cursor-not-allowed"
            >
              Reserved
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
