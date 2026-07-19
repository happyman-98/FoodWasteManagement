import React from "react";
import { Sprout, Truck, Building2, Heart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";



const MOCK_STATS = [
  { key: "totalDonated", icon: Sprout, variant: "green", value: "4.2 tons", label: "Total Donated" },
  { key: "pickupsDone", icon: Truck, variant: "green", value: "38", label: "Pickups Done" },
  { key: "ngosServed", icon: Building2, variant: "blue", value: "9", label: "NGOs Served" },
  { key: "familiesFed", icon: Heart, variant: "orange", value: "1,840", label: "Families Fed" },
];

const MOCK_CHART_DATA = [
  { month: "Feb", kg: 480 },
  { month: "Mar", kg: 660 },
  { month: "Apr", kg: 580 },
  { month: "May", kg: 900 },
  { month: "Jun", kg: 860 },
  { month: "Jul", kg: 1050 },
];

export default function Analytics({
  stats = MOCK_STATS,
  chartData = MOCK_CHART_DATA,
  isLoading = false,
  onNavigate = () => {},
  onLogout = () => {},
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar role="farmer" activeKey="analytics" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Analytics</h1>
            <p>Your farm's donation impact over time.</p>
          </div>
        </div>

        {isLoading ? (
          <p className="muted-text">Loading analytics…</p>
        ) : (
          <>
            <div className="stat-grid">
              {stats.map(({ key, icon: Icon, variant, value, label }) => (
                <div className="stat-card" key={key}>
                  <div className="stat-card-top">
                    <span className={`stat-card-icon stat-card-icon--${variant}`}>
                      <Icon size={16} />
                    </span>
                  </div>
                  <div className="stat-card-value">{value}</div>
                  <div className="stat-card-label">{label}</div>
                </div>
              ))}
            </div>

            <div className="panel">
              <div className="panel-header">
                <h3>Donations Over Time (kg)</h3>
              </div>
              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData} margin={{ left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="kg" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
