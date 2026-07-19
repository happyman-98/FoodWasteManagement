import React from 'react'
import { Users, Gift, Leaf, Package, Download, ShieldCheck, Sprout, Truck, UserPlus, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Sidebar from '../../components/SideBar/Sidebar'
import { useSidebarNavigation } from '../../hooks/useSidebarNavigation'
import { useAdminStats } from '../../hooks/useAdmin'
import '../../styles/Dashboard.css'

const CATEGORY_COLORS = {
  Food: '#2e7d32',
  Clothing: '#f57c00',
  Medicine: '#1565c0',
  Books: '#6a1b9a',
  Electronics: '#00838f',
  'Household Items': '#ffb74d',
}

const STATUS_ICON_MAP = {
  ngo_registered: { icon: ShieldCheck, variant: 'blue' },
  donation_posted: { icon: Sprout, variant: 'green' },
  pickup_confirmed: { icon: Truck, variant: 'teal' },
  user_signup: { icon: UserPlus, variant: 'purple' },
  donation_expired: { icon: AlertCircle, variant: 'red' },
}

function formatShortDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function AdminDashboard() {
  const { activeKey, onNavigate, onLogout } = useSidebarNavigation('admin')
  const { stats, loading, error } = useAdminStats()

  const counts = stats?.counts || {}
  const recentUsers = stats?.recentUsers || []
  const recentDonations = stats?.recentDonations || []

  const statCards = [
    { icon: Users, variant: 'blue', value: counts.totalUsers?.toLocaleString() ?? '—', label: 'Total Users', meta: `${counts.totalDonors ?? 0} donors` },
    { icon: Gift, variant: 'green', value: counts.activeDonations?.toLocaleString() ?? '—', label: 'Active Donations', meta: `${counts.totalDonations ?? 0} total` },
    { icon: Leaf, variant: 'green', value: counts.totalNgos?.toLocaleString() ?? '—', label: 'NGOs', meta: `${counts.totalRestaurants ?? 0} restaurants` },
    { icon: Package, variant: 'orange', value: counts.completedPickups?.toLocaleString() ?? '—', label: 'Completed Pickups', meta: `${counts.pendingPickups ?? 0} pending` },
  ]

  return (
    <div className='dashboard-layout'>
      <Sidebar role='admin' activeKey={activeKey} onNavigate={onNavigate} onLogout={onLogout} />

      <main className='dashboard-main'>
        <div className='page-header'>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Platform overview</p>
          </div>
          <button className='page-header-action'>
            <Download size={16} />
            Export Report
          </button>
        </div>

        {error && <p style={{ color: 'var(--text-danger)' }}>{error}</p>}

        <div className='stat-grid'>
          {statCards.map(({ icon: Icon, variant, value, label, meta }) => (
            <div className='stat-card' key={label}>
              <div className='stat-card-top'>
                <span className={`stat-card-icon stat-card-icon--${variant}`}>
                  <Icon size={16} />
                </span>
              </div>
              <div className='stat-card-value'>{loading ? '…' : value}</div>
              <div className='stat-card-label'>{label}</div>
              <div className='stat-card-meta stat-card-meta--up' style={{ marginTop: '0.35rem' }}>{meta}</div>
            </div>
          ))}
        </div>

        <div className='panel-grid' style={{ marginTop: '1.25rem' }}>
          <div className='panel'>
            <div className='panel-header'>
              <h3>Recent Users</h3>
              <button className='panel-link' onClick={() => onNavigate('users')}>Manage All</button>
            </div>
            {loading ? (
              <p className='muted-text'>Loading…</p>
            ) : (
              <table className='data-table'>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className='data-table-user-cell'>
                          {user.avatar
                            ? <img className='data-table-avatar' src={user.avatar} alt={user.name} />
                            : <span className='data-table-avatar' style={{ background: 'var(--surface-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{user.name[0]}</span>
                          }
                          {user.name}
                        </div>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                      <td>{formatShortDate(user.createdAt)}</td>
                      <td>
                        <span className={`badge badge--${user.status === 'Active' ? 'active' : 'inactive'}`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className='panel'>
            <div className='panel-header'>
              <h3>Recent Donations</h3>
              <button className='panel-link' onClick={() => onNavigate('donations')}>View All</button>
            </div>
            {loading ? (
              <p className='muted-text'>Loading…</p>
            ) : (
              recentDonations.map((d) => (
                <div className='list-item' key={d._id}>
                  <span className={`list-item-icon list-item-icon--green`}>
                    <Sprout size={18} />
                  </span>
                  <div className='list-item-body'>
                    <p className='list-item-title'>{d.title}</p>
                    <p className='list-item-sub'>{d.donor?.name} · {d.category}</p>
                  </div>
                  <span className={`badge badge--${d.status === 'Active' ? 'active' : 'picked-up'}`}>{d.status}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}