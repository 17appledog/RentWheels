import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  LayoutDashboard, Car, Users, DollarSign, TrendingUp,
  Plus, Pencil, Trash2, Save, X, Filter, Loader2,
  CheckCircle2, Clock, XCircle, CreditCard, Receipt,
  Settings, Fuel, Calendar, Search
} from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import Modal from '../components/Modal.jsx'

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'vehicles', label: 'Vehicles', icon: Car },
  { id: 'rentals', label: 'Rentals', icon: Receipt },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [vehicles, setVehicles] = useState([])
  const [rentals, setRentals] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  // Vehicle modal
  const [vehicleModal, setVehicleModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [vehicleForm, setVehicleForm] = useState({
    brand: '', model: '', year: new Date().getFullYear(),
    plate_number: '', transmission: 'Automatic', fuel_type: 'Gasoline',
    seating_capacity: 5, daily_rate: '', status: 'Available',
  })
  const [saving, setSaving] = useState(false)

  // Rental filter
  const [rentalFilter, setRentalFilter] = useState('all')
  const [rentalSearch, setRentalSearch] = useState('')

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    const [v, r, a] = await Promise.all([
      supabase.from('vehicles').select('*').order('vehicle_id', { ascending: true }),
      supabase.from('rentals').select('*, vehicles(*), accounts(*)').order('rental_id', { ascending: false }),
      supabase.from('accounts').select('*').eq('role', 'Customer'),
    ])
    if (v.data) setVehicles(v.data)
    if (r.data) setRentals(r.data)
    if (a.data) setAccounts(a.data)
    setLoading(false)
  }

  // ===== OVERVIEW METRICS =====
  const metrics = {
    totalRevenue: rentals.filter(r => r.payment_status === 'Paid').reduce((sum, r) => sum + Number(r.total_amount), 0),
    activeRentals: rentals.filter(r => r.rentals_status === 'Reserved').length,
    availableCars: vehicles.filter(v => v.status === 'Available').length,
    totalCustomers: accounts.length,
  }

  // ===== VEHICLE MANAGEMENT =====
  const openAddVehicle = () => {
    setEditingVehicle(null)
    setVehicleForm({
      brand: '', model: '', year: new Date().getFullYear(),
      plate_number: '', transmission: 'Automatic', fuel_type: 'Gasoline',
      seating_capacity: 5, daily_rate: '', status: 'Available',
    })
    setVehicleModal(true)
  }

  const openEditVehicle = (v) => {
    setEditingVehicle(v)
    setVehicleForm({
      brand: v.brand, model: v.model, year: v.year,
      plate_number: v.plate_number, transmission: v.transmission,
      fuel_type: v.fuel_type, seating_capacity: v.seating_capacity,
      daily_rate: v.daily_rate, status: v.status,
    })
    setVehicleModal(true)
  }

  const saveVehicle = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...vehicleForm,
        year: Number(vehicleForm.year),
        seating_capacity: Number(vehicleForm.seating_capacity),
        daily_rate: Number(vehicleForm.daily_rate),
      }

      if (editingVehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update(payload)
          .eq('vehicle_id', editingVehicle.vehicle_id)
        if (error) throw error
        toast.success('Vehicle updated successfully')
      } else {
        const { error } = await supabase
          .from('vehicles')
          .insert([payload])
        if (error) throw error
        toast.success('Vehicle added successfully')
      }
      setVehicleModal(false)
      fetchAll()
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteVehicle = async (v) => {
    if (!confirm(`Delete ${v.brand} ${v.model} (${v.plate_number})?`)) return
    const { error } = await supabase.from('vehicles').delete().eq('vehicle_id', v.vehicle_id)
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Vehicle deleted')
      fetchAll()
    }
  }

  // ===== RENTAL MANAGEMENT =====
  const updateRentalStatus = async (rental, newStatus) => {
    const { error } = await supabase
      .from('rentals')
      .update({ rentals_status: newStatus })
      .eq('rental_id', rental.rental_id)

    if (error) {
      toast.error(error.message)
      return
    }

    // If completed or cancelled, set vehicle back to Available
    if (newStatus === 'Completed' || newStatus === 'Cancelled') {
      await supabase
        .from('vehicles')
        .update({ status: 'Available' })
        .eq('vehicle_id', rental.vehicle_id)

      // If completed, set actual return date
      if (newStatus === 'Completed') {
        await supabase
          .from('rentals')
          .update({ actual_return_date: new Date().toISOString().split('T')[0] })
          .eq('rental_id', rental.rental_id)
      }
    }

    toast.success(`Rental status updated to ${newStatus}`)
    fetchAll()
  }

  const updatePaymentStatus = async (rental, newStatus) => {
    const { error } = await supabase
      .from('rentals')
      .update({ payment_status: newStatus })
      .eq('rental_id', rental.rental_id)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success(`Payment marked as ${newStatus}`)
      fetchAll()
    }
  }

  const filteredRentals = rentals.filter(r => {
    const matchesFilter = rentalFilter === 'all' || r.rentals_status === rentalFilter
    const q = rentalSearch.toLowerCase()
    const customerName = (r.accounts?.full_name || r.Accounts?.full_name || '').toLowerCase()
    const vehicleName = `${r.vehicles?.brand || r.Vehicles?.brand || ''} ${r.vehicles?.model || r.Vehicles?.model || ''}`.toLowerCase()
    const matchesSearch = !q ||
      r.receipt_number?.toLowerCase().includes(q) ||
      customerName.includes(q) ||
      vehicleName.includes(q)
    return matchesFilter && matchesSearch
  })

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="inline-flex items-center gap-3 text-[#64748b]">
          <div className="w-5 h-5 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin" />
          Loading dashboard...
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8 w-full">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          <span className="gradient-text">Admin Dashboard</span>
        </h1>
        <p className="text-[#64748b]">Manage vehicles, rentals, and monitor business metrics</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#10b981]/20 to-[#06b6d4]/20 text-white border border-[#10b981]/40 shadow-sm'
                  : 'bg-white/5 text-[#94a3b8] border border-white/5 hover:bg-white/10'
              }`}
            >
              <Icon size={16} className={activeTab === tab.id ? 'text-[#10b981]' : ''} />
              {tab.label}
            </button>
          )
        })}
      </motion.div>

      {/* ========== OVERVIEW TAB ========== */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { label: 'Total Revenue', value: `₱${metrics.totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#10b981' },
              { label: 'Active Rentals', value: metrics.activeRentals, icon: TrendingUp, color: '#22d3ee' },
              { label: 'Available Cars', value: metrics.availableCars, icon: Car, color: '#bf5af2' },
              { label: 'Total Customers', value: metrics.totalCustomers, icon: Users, color: '#f59e0b' },
            ].map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={m.label}
                  className="glass stat-card p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#64748b] text-sm font-medium">{m.label}</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}15` }}>
                      <Icon size={18} style={{ color: m.color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    {m.value}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Recent Rentals */}
          <motion.div
            className="glass p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
              <Receipt size={18} className="text-[#10b981]" />
              Recent Bookings
            </h3>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Receipt</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Dates</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rentals.slice(0, 5).map((r) => (
                    <tr key={r.rental_id}>
                      <td className="font-mono text-xs text-[#10b981]">{r.receipt_number}</td>
                      <td>{r.accounts?.full_name || r.Accounts?.full_name || '—'}</td>
                      <td>{r.vehicles?.brand || r.Vehicles?.brand} {r.vehicles?.model || r.Vehicles?.model}</td>
                      <td className="text-sm text-[#94a3b8]">
                        {formatDate(r.pickup_date)} → {formatDate(r.return_date)}
                      </td>
                      <td className="font-semibold">₱{Number(r.total_amount).toLocaleString()}</td>
                      <td>
                        <span className={`badge badge-${r.rentals_status?.toLowerCase()}`}>
                          {r.rentals_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {rentals.length === 0 && (
                    <tr><td colSpan={6} className="text-center text-[#64748b] py-8">No rentals yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ========== VEHICLES TAB ========== */}
      {activeTab === 'vehicles' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#64748b]">
              <span className="text-white font-semibold">{vehicles.length}</span> vehicles in fleet
            </p>
            <motion.button
              className="btn-primary flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddVehicle}
            >
              <Plus size={16} />
              Add Vehicle
            </motion.button>
          </div>

          <div className="glass overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Plate</th>
                  <th>Year</th>
                  <th>Transmission</th>
                  <th>Fuel</th>
                  <th>Seats</th>
                  <th>Daily Rate</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v, i) => (
                  <motion.tr
                    key={v.vehicle_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <td className="font-semibold text-white">{v.brand} {v.model}</td>
                    <td className="font-mono text-xs">{v.plate_number}</td>
                    <td>{v.year}</td>
                    <td>{v.transmission}</td>
                    <td>{v.fuel_type}</td>
                    <td>{v.seating_capacity}</td>
                    <td className="font-semibold">₱{Number(v.daily_rate).toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${v.status?.toLowerCase()}`}>{v.status}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditVehicle(v)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94a3b8] hover:text-[#10b981] transition-all"
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => deleteVehicle(v)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#94a3b8] hover:text-red-400 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ========== RENTALS TAB ========== */}
      {activeTab === 'rentals' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
            <div className="flex-1 glass-strong flex items-center gap-2 px-3.5 py-2.5 rounded-2xl">
              <Search size={16} className="text-[#64748b]" />
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-[#475569]"
                placeholder="Search by receipt, customer, or vehicle..."
                value={rentalSearch}
                onChange={(e) => setRentalSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['all', 'Reserved', 'Completed', 'Cancelled'].map((s) => (
                <button
                  key={s}
                  onClick={() => setRentalFilter(s)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    rentalFilter === s
                      ? 'bg-gradient-to-r from-[#10b981]/20 to-[#06b6d4]/20 text-white border border-[#10b981]/40 shadow-sm'
                      : 'bg-white/5 text-[#94a3b8] border border-white/5 hover:bg-white/10'
                  }`}
                >
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>
          </div>

          <div className="glass overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Receipt</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Pickup</th>
                  <th>Return</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRentals.map((r, i) => (
                  <motion.tr
                    key={r.rental_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <td className="font-mono text-xs text-[#10b981]">{r.receipt_number}</td>
                    <td>{r.accounts?.full_name || r.Accounts?.full_name || '—'}</td>
                    <td>{r.vehicles?.brand || r.Vehicles?.brand} {r.vehicles?.model || r.Vehicles?.model}</td>
                    <td className="text-sm">{formatDate(r.pickup_date)}</td>
                    <td className="text-sm">{formatDate(r.return_date)}</td>
                    <td className="font-semibold">₱{Number(r.total_amount).toLocaleString()}</td>
                    <td>
                      <select
                        value={r.payment_status}
                        onChange={(e) => updatePaymentStatus(r, e.target.value)}
                        className="text-xs py-1 px-2 rounded-lg bg-white/5 border border-white/10 text-white outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </td>
                    <td>
                      <span className={`badge badge-${r.rentals_status?.toLowerCase()}`}>
                        {r.rentals_status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        {r.rentals_status === 'Reserved' && (
                          <>
                            <button
                              onClick={() => updateRentalStatus(r, 'Completed')}
                              className="p-1.5 rounded-lg bg-[#10b981]/10 hover:bg-[#10b981]/20 text-[#10b981] transition-all"
                              title="Mark Completed"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                            <button
                              onClick={() => updateRentalStatus(r, 'Cancelled')}
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                              title="Cancel"
                            >
                              <XCircle size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filteredRentals.length === 0 && (
                  <tr><td colSpan={9} className="text-center text-[#64748b] py-8">No rentals found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ========== VEHICLE FORM MODAL ========== */}
      <Modal
        isOpen={vehicleModal}
        onClose={() => setVehicleModal(false)}
        title={editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
        maxWidth="520px"
      >
        <form onSubmit={saveVehicle} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="input-label">Brand</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Toyota"
                value={vehicleForm.brand}
                onChange={(e) => setVehicleForm({ ...vehicleForm, brand: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="input-label">Model</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., Camry"
                value={vehicleForm.model}
                onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="input-label">Year</label>
              <input
                type="number"
                className="input-field"
                value={vehicleForm.year}
                onChange={(e) => setVehicleForm({ ...vehicleForm, year: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="input-label">Plate Number</label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., ABC-1234"
                value={vehicleForm.plate_number}
                onChange={(e) => setVehicleForm({ ...vehicleForm, plate_number: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="input-label">Transmission</label>
              <select className="input-field" value={vehicleForm.transmission} onChange={(e) => setVehicleForm({ ...vehicleForm, transmission: e.target.value })}>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="input-label">Fuel Type</label>
              <select className="input-field" value={vehicleForm.fuel_type} onChange={(e) => setVehicleForm({ ...vehicleForm, fuel_type: e.target.value })}>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="input-label">Seating Capacity</label>
              <input
                type="number"
                className="input-field"
                min="1"
                max="50"
                value={vehicleForm.seating_capacity}
                onChange={(e) => setVehicleForm({ ...vehicleForm, seating_capacity: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="input-label">Daily Rate (₱)</label>
              <input
                type="number"
                className="input-field"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={vehicleForm.daily_rate}
                onChange={(e) => setVehicleForm({ ...vehicleForm, daily_rate: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="input-label">Status</label>
            <select className="input-field" value={vehicleForm.status} onChange={(e) => setVehicleForm({ ...vehicleForm, status: e.target.value })}>
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setVehicleModal(false)} className="btn-secondary flex-1">
              Cancel
            </button>
            <motion.button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={saving}
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {editingVehicle ? 'Update' : 'Add'} Vehicle
            </motion.button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
