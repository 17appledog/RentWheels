import { Link } from 'react-router-dom'
import { Car, Mail, Phone, MapPin, ShieldCheck, Clock, Award, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070c] text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 no-underline group">
              <img
                src="/logo.svg"
                alt="RentWheels Logo"
                className="w-10 h-10 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all duration-300 object-contain"
              />
              <span className="text-2xl font-black tracking-tight text-white font-['Outfit']">
                Rent<span className="text-emerald-400">Wheels</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier web-based car rental platform in Metro Manila. Delivering immaculate luxury, exotic sports, and executive SUVs with zero friction and guaranteed satisfaction.
            </p>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" /> Fully Insured
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-cyan-400" /> 24/7 Support
              </span>
              <span className="flex items-center gap-1.5">
                <Award size={14} className="text-purple-400" /> Top Rated
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors no-underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-emerald-400 transition-colors no-underline">
                  Browse Fleet Catalog
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-emerald-400 transition-colors no-underline">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-emerald-400 transition-colors no-underline">
                  Fleet Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Types */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
              Vehicle Classes
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/fleet" className="hover:text-emerald-400 transition-colors no-underline">
                  Electric & Hybrids
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-emerald-400 transition-colors no-underline">
                  Exotic Sports Cars
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-emerald-400 transition-colors no-underline">
                  Executive Luxury SUVs
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-emerald-400 transition-colors no-underline">
                  VIP Passenger Vans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
              Concierge Hub
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  Bonifacio Global City, Taguig, Metro Manila, Philippines
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-cyan-400 flex-shrink-0" />
                <span className="text-xs">+63 (2) 8888-9433</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-purple-400 flex-shrink-0" />
                <span className="text-xs">concierge@rentwheels.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RentWheels Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Rental Terms</span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">Insurance FAQs</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
