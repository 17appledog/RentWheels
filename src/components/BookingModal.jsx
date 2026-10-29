import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  CalendarDays, CreditCard, DollarSign, Receipt,
  Loader2, Check, ShieldCheck, Car, Clock, Sparkles
} from 'lucide-react'
import Modal from './Modal.jsx'
import { supabase } from '../lib/supabase.js'
import { useAuth } from '../context/AuthContext.jsx'

const PAYMENT_METHODS = [
  { id: 'GCash', label: 'GCash e-Wallet', desc: 'Instant QR / mobile transfer', color: '#007dfc' },
  { id: 'Credit Card', label: 'Credit Card', desc: 'Visa, Mastercard, JCB', color: '#10b981' },
  { id: 'Debit Card', label: 'Debit Card', desc: 'BDO, BPI, UnionBank', color: '#06b6d4' },
  { id: 'Cash', label: 'Cash on Pickup', desc: 'Pay during vehicle turnover', color: '#f59e0b' },
]

function generateReceiptNumber() {
  const year = new Date().getFullYear()
  const rand = String(Math.floor(Math.random() * 9000) + 1000)
  return `RW-${year}-${rand}`
}

export default function BookingModal({
  vehicle,
  isOpen,
  onClose,
  onSuccess,
  prefilledPickup = '',
  prefilledReturn = ''
}) {
  const { user } = useAuth()
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('GCash')
  const [submitting, setSubmitting] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (isOpen) {
      if (prefilledPickup) setPickupDate(prefilledPickup)
      if (prefilledReturn) setReturnDate(prefilledReturn)
      if (!paymentMethod) setPaymentMethod('GCash')
    }
  }, [isOpen, prefilledPickup, prefilledReturn])

  const { days, totalAmount } = useMemo(() => {
    if (!pickupDate || !returnDate) return { days: 0, totalAmount: 0 }
    const start = new Date(pickupDate)
    const end = new Date(returnDate)
    const diffTime = end - start
    const diffDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0)
    return {
      days: diffDays,
      totalAmount: diffDays * Number(vehicle?.daily_rate || 0),
    }
  }, [pickupDate, returnDate, vehicle?.daily_rate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!pickupDate || !returnDate || !paymentMethod) {
      toast.error('Please specify both pickup and return dates')
      return
    }
    if (days <= 0) {
      toast.error('Return date must be at least 1 day after pickup date')
      return
    }

    setSubmitting(true)
    try {
      const receiptNumber = generateReceiptNumber()

      const { error } = await supabase.from('rentals').insert([{
        account_id: user.account_id,
        vehicle_id: vehicle.vehicle_id,
        pickup_date: pickupDate,
        return_date: returnDate,
        total_amount: totalAmount,
        payment_method: paymentMethod,
        payment_status: 'Pending',
        receipt_number: receiptNumber,
        rentals_status: 'Reserved',
      }])

      if (error) throw error

      // Update vehicle status in db
      await supabase
        .from('vehicles')
        .update({ status: 'Rented' })
        .eq('vehicle_id', vehicle.vehicle_id)

      toast.success(`Booking confirmed! Receipt #${receiptNumber}`, {
        duration: 5000,
      })

      onSuccess?.()
      onClose()

      // Reset
      setPickupDate('')
      setReturnDate('')
    } catch (err) {
      toast.error(err.message || 'Failed to submit booking reservation')
    } finally {
      setSubmitting(false)
    }
  }

  if (!vehicle) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Vehicle Reservation" maxWidth="520px">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Vehicle Preview Card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex-shrink-0">
            <Car size={26} className="text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                {vehicle.brand}
              </span>
              <span className="text-[10px] text-[#64748b] font-mono">
                {vehicle.plate_number}
              </span>
            </div>
            <h4 className="text-base font-bold text-white truncate font-['Outfit']">
              {vehicle.model} ({vehicle.year})
            </h4>
            <p className="text-xs text-[#94a3b8] mt-0.5">
              <span className="text-white font-semibold">₱{Number(vehicle.daily_rate).toLocaleString()}</span> / day · {vehicle.transmission} · {vehicle.fuel_type}
            </p>
          </div>
        </div>

        {/* Date Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="flex flex-col">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#94a3b8] mb-1.5">
              <CalendarDays size={13} className="text-emerald-400" />
              Pickup Date
            </label>
            <input
              type="date"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none focus:border-emerald-500/50 transition-colors cursor-pointer"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={today}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#94a3b8] mb-1.5">
              <CalendarDays size={13} className="text-cyan-400" />
              Return Date
            </label>
            <input
              type="date"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm outline-none focus:border-emerald-500/50 transition-colors cursor-pointer"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={pickupDate || today}
              required
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#94a3b8] mb-2">
            <CreditCard size={13} className="text-emerald-400" />
            Preferred Payment Channel
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = paymentMethod === method.id
              return (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-sm'
                      : 'bg-white/[0.02] border-white/[0.06] text-[#94a3b8] hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-0.5">
                    <span className="text-xs font-bold text-white">{method.label}</span>
                    {isSelected && <Check size={13} className="text-emerald-400" />}
                  </div>
                  <span className="text-[10px] text-[#64748b] leading-tight">{method.desc}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-1.5">
            <span>Daily Rate</span>
            <span className="text-white font-medium">₱{Number(vehicle.daily_rate).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-2">
            <span>Rental Duration</span>
            <span className="text-emerald-300 font-semibold">{days} Day{days !== 1 ? 's' : ''}</span>
          </div>
          <div className="pt-2.5 border-t border-white/[0.06] flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Estimated Total</span>
              <p className="text-[10px] text-[#64748b]">Includes VAT & insurance</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
                ₱{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold text-[#94a3b8] bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || days <= 0}
            className="flex-2 py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#10b981] via-[#059669] to-[#06b6d4] shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Receipt size={16} />
                <span>Confirm & Reserve</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  )
}
