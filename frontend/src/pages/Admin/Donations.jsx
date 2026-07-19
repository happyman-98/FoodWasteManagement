import React from 'react'
import { Trash2 } from 'lucide-react'
import Sidebar from '../../components/SideBar/Sidebar'
import { useAdminDonations } from '../../hooks/useAdmin'
import { useSidebarNavigation } from '../../hooks/useSidebarNavigation'
import '../../styles/Dashboard.css'

const STATUS_DISPLAY = {
  Active: { label: 'Active', badgeClass: 'active' },
  'Picked Up': { label: 'Picked Up', badgeClass: 'picked-up' },
  Delivered: { label: 'Delivered', badgeClass: 'delivered' },
  Cancelled: { label: 'Cancelled', badgeClass: 'cancelled' },
}

function formatShortDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Donations() {
  const { activeKey, onNavigate, onLogout } = useSidebarNavigation('admin')
  const { donations, summary, total, loading, error, query, setQuery, remove } = useAdminDonations()

  const summaryMap = {}
  summary.forEach(({ _id, count }) => { summaryMap[_id] = count })

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    await remove(id)
  }

  return (
    <div className='dashboard-layout'>
      <Sidebar role='admin' activeKey={activeKey} onNavigate={onNavigate} onLogout={onLogout} />

      <main className='dashboard-main'>
        <div className='page-header'>
          <div>
            <h1>All Donations</h1>
            <p>{total} total donations on the platform</p>
          </div>
          <select
            style={{ fontSize: 13, padding: '0.4rem 0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
            value={query.status}
            onChange={(e) => setQuery((q) => ({ ...q, status: e.target.value, page: 1 }))}
          >
            <option value=''>All statuses</option>
            <option value='Active'>Active</option>
            <option value='Picked Up'>Picked Up</option>
            <option value='Delivered'>Delivered</option>
            <option value='Cancelled'>Cancelled</option>
          </select>
        </div>

        {error && <p style={{ color: 'var(--text-danger)' }}>{error}</p>}

        <div className='stat-grid' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          {['Active', 'Picked Up', 'Delivered', 'Cancelled'].map((s) => (
            <div className='stat-card' key={s} style={{ textAlign: 'center' }}>
              <div className='stat-card-value'>{summaryMap[s] ?? 0}</div>
              <div className='stat-card-label'>{s}</div>
            </div>
          ))}
        </div>

        <div className='panel' style={{ padding: '1.5rem' }}>
          <table className='data-table'>
            <thead>
              <tr>
                <th>Donation</th>
                <th>Donor</th>
                <th>Category</th>
                <th>Posted</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem 0' }}>Loading…</td></tr>
              )}
              {!loading && donations.map((d) => {
                const display = STATUS_DISPLAY[d.status] || { label: d.status, badgeClass: 'active' }
                return (
                  <tr key={d._id}>
                    <td>{d.title}</td>
                    <td>{d.donor?.name ?? '—'}</td>
                    <td><span className='badge badge--active'>{d.category}</span></td>
                    <td>{formatShortDate(d.createdAt)}</td>
                    <td><span className={`badge badge--${display.badgeClass}`}>{display.label}</span></td>
                    <td>
                      <button className='icon-btn icon-btn--danger' title='Delete' onClick={() => handleDelete(d._id, d.title)}>
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                )
              })}
              {!loading && donations.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>No donations found.</td></tr>
              )}
            </tbody>
          </table>

          {total > query.limit && (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className='icon-btn' disabled={query.page === 1} onClick={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}>←</button>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', alignSelf: 'center' }}>Page {query.page}</span>
              <button className='icon-btn' disabled={query.page * query.limit >= total} onClick={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}>→</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}