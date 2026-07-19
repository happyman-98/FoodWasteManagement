import React, { useState } from 'react'
import { Search, Pencil, Trash2, Check, X } from 'lucide-react'
import Sidebar from '../../components/SideBar/Sidebar'
import { useAdminUsers } from '../../hooks/useAdmin'
import { useSidebarNavigation } from '../../hooks/useSidebarNavigation'
import '../../styles/Dashboard.css'

function formatShortDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Ngos() {
  const { activeKey, onNavigate, onLogout } = useSidebarNavigation('admin')
  const { users, total, loading, error, query, setQuery, update, remove } = useAdminUsers({ role: 'ngo' })
  const [editingId, setEditingId] = useState(null)
  const [editStatus, setEditStatus] = useState('')

  const handleSearch = (e) => setQuery((q) => ({ ...q, q: e.target.value, page: 1 }))

  const startEdit = (ngo) => {
    setEditingId(ngo._id)
    setEditStatus(ngo.status)
  }

  const saveEdit = async (id) => {
    await update(id, { status: editStatus })
    setEditingId(null)
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete NGO "${name}"? This also removes their donations and pickups.`)) return
    await remove(id)
  }

  return (
    <div className='dashboard-layout'>
      <Sidebar role='admin' activeKey={activeKey} onNavigate={onNavigate} onLogout={onLogout} />

      <main className='dashboard-main'>
        <div className='page-header'>
          <div>
            <h1>NGOs</h1>
            <p>{total} registered NGOs</p>
          </div>
          <div className='search-bar' style={{ maxWidth: 280 }}>
            <Search size={16} />
            <input
              type='text'
              placeholder='Search NGOs…'
              value={query.q}
              onChange={handleSearch}
            />
          </div>
        </div>

        {error && <p style={{ color: 'var(--text-danger)' }}>{error}</p>}

        <div className='panel' style={{ padding: '1.5rem' }}>
          <table className='data-table'>
            <thead>
              <tr>
                <th>NGO</th>
                <th>Reg. Number</th>
                <th>City</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem 0' }}>Loading…</td></tr>
              )}
              {!loading && users.map((ngo) => (
                <tr key={ngo._id}>
                  <td>
                    <div className='data-table-user-cell'>
                      {ngo.avatar
                        ? <img className='data-table-avatar' src={ngo.avatar} alt={ngo.name} />
                        : <span className='data-table-avatar' style={{ background: 'var(--surface-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{ngo.name[0]}</span>
                      }
                      <div>
                        <div>{ngo.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{ngo.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{ngo.licenseNumber ?? '—'}</td>
                  <td>{ngo.city || '—'}</td>
                  <td>{formatShortDate(ngo.createdAt)}</td>
                  <td>
                    {editingId === ngo._id ? (
                      <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{ fontSize: 13 }}>
                        <option value='Active'>Active</option>
                        <option value='Inactive'>Inactive</option>
                      </select>
                    ) : (
                      <span className={`badge badge--${ngo.status === 'Active' ? 'active' : 'inactive'}`}>
                        {ngo.status}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingId === ngo._id ? (
                      <div className='table-actions'>
                        <button className='icon-btn icon-btn--confirm' onClick={() => saveEdit(ngo._id)}><Check size={15} /></button>
                        <button className='icon-btn' onClick={() => setEditingId(null)}><X size={15} /></button>
                      </div>
                    ) : (
                      <div className='table-actions'>
                        <button className='icon-btn' title='Edit status' onClick={() => startEdit(ngo)}><Pencil size={15} /></button>
                        <button className='icon-btn icon-btn--danger' title='Delete' onClick={() => handleDelete(ngo._id, ngo.name)}><Trash2 size={15} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && users.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>No NGOs found.</td></tr>
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