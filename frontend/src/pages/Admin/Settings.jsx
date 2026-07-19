import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/SideBar/Sidebar'
import { useSidebarNavigation } from '../../hooks/useSidebarNavigation'
import api from '../../api/axios'
import '../../styles/Dashboard.css'

const EMPTY_SETTINGS = {
  platformName: '',
  supportEmail: '',
}

export default function Settings() {
  const { activeKey, onNavigate, onLogout } = useSidebarNavigation('admin')
  const [settings, setSettings] = useState(EMPTY_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    api
      .get('/admin/settings')
      .then((res) => setSettings((prev) => ({ ...prev, ...res.data.data })))
      .catch(() => setError('Failed to load settings.'))
      .finally(() => setLoading(false))
  }, [])

  function handleFieldChange(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setSuccessMsg('')
    setError('')
  }

  async function handleSave() {
    setIsSaving(true)
    setError('')
    setSuccessMsg('')
    try {
      const res = await api.put('/admin/settings', settings)
      setSettings((prev) => ({ ...prev, ...res.data.data }))
      setSuccessMsg('Settings saved.')
    } catch {
      setError('Failed to save settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='dashboard-layout'>
      <Sidebar role='admin' activeKey={activeKey} onNavigate={onNavigate} onLogout={onLogout} />

      <main className='dashboard-main'>
        <div className='page-header'>
          <div>
            <h1>Platform Settings</h1>
            <p>Configure global platform settings and policies.</p>
          </div>
        </div>

        {loading ? (
          <p className='muted-text'>Loading settings…</p>
        ) : (
          <div className='settings-card'>
            {error && <p style={{ color: 'var(--text-danger)', marginBottom: '1rem' }}>{error}</p>}
            {successMsg && <p style={{ color: 'var(--text-success)', marginBottom: '1rem' }}>{successMsg}</p>}

            <div className='settings-grid'>
              <div className='form-field'>
                <label htmlFor='platformName'>Platform Name</label>
                <input
                  id='platformName'
                  type='text'
                  value={settings.platformName}
                  onChange={(e) => handleFieldChange('platformName', e.target.value)}
                />
              </div>
              <div className='form-field'>
                <label htmlFor='supportEmail'>Support Email</label>
                <input
                  id='supportEmail'
                  type='email'
                  value={settings.supportEmail}
                  onChange={(e) => handleFieldChange('supportEmail', e.target.value)}
                />
              </div>
            </div>

            <button className='settings-submit-btn' onClick={handleSave} disabled={isSaving || loading}>
              {isSaving ? 'Saving…' : 'Save Settings'}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}