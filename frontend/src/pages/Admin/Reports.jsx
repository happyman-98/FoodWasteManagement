import React from 'react'
import { Download, FileSpreadsheet, Share2 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Sidebar from '../../components/SideBar/Sidebar'
import { useAdminReports } from '../../hooks/useAdmin'
import { useSidebarNavigation } from '../../hooks/useSidebarNavigation'
import '../../styles/Dashboard.css'

export default function Reports({
  onDownloadPdf = () => {},
  onExportCsv = () => {},
  onShareReport = () => {},
}) {
  const { activeKey, onNavigate, onLogout } = useSidebarNavigation('admin')
  const { reports, loading, error } = useAdminReports()

  const donationTrends = reports?.donationTrends ?? []
  const summary = reports?.summary ?? []

  return (
    <div className='dashboard-layout'>
      <Sidebar role='admin' activeKey={activeKey} onNavigate={onNavigate} onLogout={onLogout} />

      <main className='dashboard-main'>
        <div className='page-header'>
          <div>
            <h1>Reports</h1>
            <p>Platform-wide analytics and impact reporting.</p>
          </div>
        </div>

        {error && <p style={{ color: 'var(--text-danger)' }}>{error}</p>}

        {summary.length > 0 && (
          <div className='stat-grid' style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
            {summary.map((item) => (
              <div className='stat-card' key={item.label} style={{ textAlign: 'center' }}>
                <div className='stat-card-value'>{item.value}</div>
                <div className='stat-card-label'>{item.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className='panel'>
          <div className='panel-header'>
            <h3>Donation Trends (6 months)</h3>
          </div>

          {loading && <p className='muted-text'>Loading…</p>}

          {!loading && donationTrends.length === 0 && (
            <p className='muted-text'>No trend data available yet.</p>
          )}

          {!loading && donationTrends.length > 0 && (
            <>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={donationTrends} margin={{ left: -20 }}>
                    <defs>
                      <linearGradient id='itemDonationsFill' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor='var(--chart-2)' stopOpacity={0.35} />
                        <stop offset='100%' stopColor='var(--chart-2)' stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='var(--border)' />
                    <XAxis dataKey='month' tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                    <Tooltip />
                    <Area type='monotone' dataKey='foodDonations' name='Food Donations' stroke='var(--chart-1)' fill='transparent' strokeWidth={2} />
                    <Area type='monotone' dataKey='itemDonations' name='Item Donations' stroke='var(--chart-2)' fill='url(#itemDonationsFill)' strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                <span><span className='legend-swatch' style={{ background: 'var(--chart-1)' }} /> Food Donations</span>
                <span><span className='legend-swatch' style={{ background: 'var(--chart-2)' }} /> Item Donations</span>
              </div>
            </>
          )}
        </div>

        <div className='report-actions'>
          <button className='report-action-btn' onClick={onDownloadPdf}>
            <Download size={16} />
            Download PDF Report
          </button>
          <button className='report-action-btn' onClick={onExportCsv}>
            <FileSpreadsheet size={16} />
            Export CSV
          </button>
          <button className='report-action-btn' onClick={onShareReport}>
            <Share2 size={16} />
            Share Report
          </button>
        </div>
      </main>
    </div>
  )
}