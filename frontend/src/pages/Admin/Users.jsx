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

export default function Users() {
  const { activeKey, onNavigate, onLogout } = useSidebarNavigation('admin')
  const { users, total, loading, error, query, setQuery, update, remove } = useAdminUsers()
  const [editingId, setEditingId] = useState(null)
  const [editStatus, setEditStatus] = useState('')

  const handleSearch = (e) => setQuery((q) => ({ ...q, q: e.target.value, page: 1 }))

  const startEdit = (user) => {
    setEditingId(user._id)
    setEditStatus(user.status)
  }

  const saveEdit = async (id) => {
    await update(id, { status: editStatus })
    setEditingId(null)
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"? This also removes their donations and pickups.`)) return
    await remove(id)
  }

  return (
    <div className='dashboard-layout'>
      <Sidebar role='admin' activeKey={activeKey} onNavigate={onNavigate} onLogout={onLogout} />

      <main className='dashboard-main'>
        <div className='page-header'>
          <div>
            <h1>Users</h1>
            <p>{total} registered users</p>
          </div>
          <div className='search-bar' style={{ maxWidth: 280 }}>
            <Search size={16} />
            <input
              type='text'
              placeholder='Search users…'
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
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem 0' }}>Loading…</td></tr>
              )}
              {!loading && users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className='data-table-user-cell'>
                      {user.avatar
                        ? <img className='data-table-avatar' src={user.avatar} alt={user.name} />
                        : <span className='data-table-avatar' style={{ background: 'var(--surface-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{user.name[0]}</span>
                      }
                      <div>
                        <div>{user.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                  <td>{formatShortDate(user.createdAt)}</td>
                  <td>
                    {editingId === user._id ? (
                      <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} style={{ fontSize: 13 }}>
                        <option value='Active'>Active</option>
                        <option value='Inactive'>Inactive</option>
                      </select>
                    ) : (
                      <span className={`badge badge--${user.status === 'Active' ? 'active' : 'inactive'}`}>
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingId === user._id ? (
                      <div className='table-actions'>
                        <button className='icon-btn icon-btn--confirm' onClick={() => saveEdit(user._id)}><Check size={15} /></button>
                        <button className='icon-btn' onClick={() => setEditingId(null)}><X size={15} /></button>
                      </div>
                    ) : (
                      <div className='table-actions'>
                        <button className='icon-btn' title='Edit status' onClick={() => startEdit(user)}><Pencil size={15} /></button>
                        <button className='icon-btn icon-btn--danger' title='Delete' onClick={() => handleDelete(user._id, user.name)}><Trash2 size={15} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && users.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>No users found.</td></tr>
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