import React from "react";
import { Download, FileSpreadsheet, Share2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

// Mirrors GET /api/admin/reports/donation-trends?months=6
const DONATION_TRENDS = [
  { month: "Feb", foodDonations: 420, itemDonations: 470 },
  { month: "Mar", foodDonations: 560, itemDonations: 660 },
  { month: "Apr", foodDonations: 500, itemDonations: 560 },
  { month: "May", foodDonations: 640, itemDonations: 900 },
  { month: "Jun", foodDonations: 610, itemDonations: 780 },
  { month: "Jul", foodDonations: 720, itemDonations: 1150 },
];

export default function Reports({
  onNavigate = () => {},
  onLogout = () => {},
  onDownloadPdf = () => {},
  onExportCsv = () => {},
  onShareReport = () => {},
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" activeKey="reports" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Reports</h1>
            <p>Platform-wide analytics and impact reporting.</p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Donation Trends (6 months)</h3>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={DONATION_TRENDS} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="itemDonationsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="foodDonations"
                  name="Food Donations"
                  stroke="var(--chart-1)"
                  fill="transparent"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="itemDonations"
                  name="Item Donations"
                  stroke="var(--chart-2)"
                  fill="url(#itemDonationsFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem", fontSize: "0.85rem" }}>
            <span><span className="legend-swatch" style={{ background: "var(--chart-1)" }} /> Food Donations</span>
            <span><span className="legend-swatch" style={{ background: "var(--chart-2)" }} /> Item Donations</span>
          </div>
        </div>

        <div className="report-actions">
          <button className="report-action-btn" onClick={onDownloadPdf}>
            <Download size={16} />
            Download PDF Report
          </button>
          <button className="report-action-btn" onClick={onExportCsv}>
            <FileSpreadsheet size={16} />
            Export CSV
          </button>
          <button className="report-action-btn" onClick={onShareReport}>
            <Share2 size={16} />
            Share Report
          </button>
        </div>
      </main>
    </div>
  );
}
