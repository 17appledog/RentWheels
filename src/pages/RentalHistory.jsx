import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, CreditCard, Clock, CheckCircle2, XCircle,
  FileText, Car, AlertCircle, History, ArrowRight,
  ShieldCheck, Hash, Printer, Download, Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'
import Modal from '../components/Modal.jsx'

const statusConfig = {
  Reserved: {
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.3)',
    icon: Clock,
    label: 'Reserved'
  },
  Completed: {
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.3)',
    icon: CheckCircle2,
    label: 'Completed'
  },
  Cancelled: {
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.12)',
    border: 'rgba(239, 68, 68, 0.3)',
    icon: XCircle,
    label: 'Cancelled'
  },
}

export default function RentalHistory() {
  const { user } = useAuth()
  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [receiptModal, setReceiptModal] = useState(null)

  useEffect(() => {
    if (user?.account_id) {
      fetchRentals()
    }
  }, [user])

  const fetchRentals = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('rentals')
      .select('*, vehicles(*)')
      .eq('account_id', user.account_id)
      .order('rental_id', { ascending: false })

    if (!error && data) setRentals(data)
    setLoading(false)
  }

  const filtered = filter === 'all' ? rentals : rentals.filter(r => r.rentals_status === filter)

  const tabs = [
    { key: 'all', label: 'All Bookings', count: rentals.length },
    { key: 'Reserved', label: 'Active', count: rentals.filter(r => r.rentals_status === 'Reserved').length },
    { key: 'Completed', label: 'Completed', count: rentals.filter(r => r.rentals_status === 'Completed').length },
    { key: 'Cancelled', label: 'Cancelled', count: rentals.filter(r => r.rentals_status === 'Cancelled').length },
  ]

  const formatDate = (d) => {
    if (!d) return '—'
    return new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handlePrintReceipt = () => {
    window.print()
  }

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14 w-full">
      
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 mb-3">
          <History size={13} className="text-emerald-400" />
          <span>Booking Management</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
          My Rental Reservations
        </h1>
        <p className="text-[#94a3b8] text-sm mt-1">
          Review your rental itineraries, payment statuses, and digital receipts.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {tabs.map((tab) => {
          const isSelected = filter === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/40 shadow-sm'
                  : 'bg-white/[0.03] text-[#94a3b8] hover:text-white border border-white/[0.05] hover:bg-white/[0.06]'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                isSelected ? 'bg-emerald-500/30 text-white' : 'bg-white/[0.08] text-[#94a3b8]'
              }`}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </motion.div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[#94a3b8]">Loading your rentals...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl bg-[#0b1120]/60 border border-white/[0.08] p-12 text-center max-w-md mx-auto">
          <History size={42} className="mx-auto text-[#475569] mb-3" />
          <h3 className="text-lg font-bold text-white mb-1 font-['Outfit']">No Reservations Found</h3>
          <p className="text-xs text-[#94a3b8]">
            {filter === 'all'
              ? "You haven't reserved any vehicles yet. Explore the fleet to book your next ride!"
              : `You have no ${filter.toLowerCase()} bookings.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((rental, i) => {
            const vehicle = rental.vehicles || rental.Vehicles
            const sc = statusConfig[rental.rentals_status] || statusConfig.Reserved
            const StatusIcon = sc.icon

            return (
              <motion.div
                key={rental.rental_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-3xl bg-[#0b1120]/80 border border-white/[0.08] hover:border-emerald-500/30 backdrop-blur-xl p-5 sm:p-6 transition-all shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  
                  {/* Left: Vehicle Title, Plate, Receipt */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex-shrink-0">
                      <Car size={24} className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          {vehicle?.brand}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#94a3b8] border border-white/[0.08]">
                          {vehicle?.plate_number}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Outfit']">
                        {vehicle?.brand} {vehicle?.model}
                      </h3>
                      <p className="text-xs text-[#64748b] font-mono mt-0.5 flex items-center gap-1">
                        <Hash size={11} />
                        Receipt: <span className="text-emerald-300 font-semibold">{rental.receipt_number}</span>
                      </p>
                    </div>
                  </div>

                  {/* Middle: Timeline Dates */}
                  <div className="flex items-center gap-3 py-2 px-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] sm:self-auto">
                    <div>
                      <span className="text-[10px] font-semibold text-[#64748b] block uppercase">Pickup</span>
                      <span className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                        <Calendar size={12} className="text-emerald-400" />
                        {formatDate(rental.pickup_date)}
                      </span>
                    </div>

                    <ArrowRight size={14} className="text-[#475569] mx-1" />

                    <div>
                      <span className="text-[10px] font-semibold text-[#64748b] block uppercase">Return</span>
                      <span className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
                        <Calendar size={12} className="text-cyan-400" />
                        {formatDate(rental.return_date)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Amount & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#64748b] block">Total Amount</span>
                      <span className="text-xl font-black text-white font-['Outfit']">
                        ₱{Number(rental.total_amount).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                        style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}
                      >
                        <StatusIcon size={12} />
                        {rental.rentals_status}
                      </span>

                      <button
                        onClick={() => setReceiptModal(rental)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] transition-all cursor-pointer"
                        title="View Official Receipt"
                      >
                        <FileText size={13} />
                        <span>Receipt</span>
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* ========================================================
          RECEIPT MODAL (OFFICIAL SLIP)
      ======================================================== */}
      <Modal
        isOpen={!!receiptModal}
        onClose={() => setReceiptModal(null)}
        title="Official Rental Receipt"
        maxWidth="460px"
      >
        {receiptModal && (
          <div className="space-y-5">
            {/* Receipt Banner */}
            <div className="text-center p-5 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-2 text-emerald-400 border border-emerald-500/30">
                <FileText size={20} />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">Verified Booking Voucher</p>
              <p className="text-xl font-black font-mono text-white mt-1">{receiptModal.receipt_number}</p>
            </div>

            {/* Receipt Rows */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#64748b]">Reserved Vehicle</span>
                <span className="text-white font-semibold">
                  {receiptModal.vehicles?.brand || receiptModal.Vehicles?.brand} {receiptModal.vehicles?.model || receiptModal.Vehicles?.model}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#64748b]">Plate Number</span>
                <span className="text-white font-mono">
                  {receiptModal.vehicles?.plate_number || receiptModal.Vehicles?.plate_number}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#64748b]">Pickup Date</span>
                <span className="text-white font-medium">{formatDate(receiptModal.pickup_date)}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#64748b]">Return Date</span>
                <span className="text-white font-medium">{formatDate(receiptModal.return_date)}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#64748b]">Payment Channel</span>
                <span className="text-white font-medium">{receiptModal.payment_method}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#64748b]">Payment Status</span>
                <span className="text-emerald-300 font-semibold">{receiptModal.payment_status}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-[#64748b]">Rental Status</span>
                <span className="text-amber-300 font-semibold">{receiptModal.rentals_status}</span>
              </div>
            </div>

            {/* Total */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-baseline justify-between">
              <span className="text-xs uppercase font-bold text-[#94a3b8]">Total Amount Paid/Due</span>
              <span className="text-2xl font-black text-white font-['Outfit']">
                ₱{Number(receiptModal.total_amount).toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer size={14} />
                <span>Print Slip</span>
              </button>
              <button
                onClick={() => setReceiptModal(null)}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
