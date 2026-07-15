import React from "react";
import { UtensilsCrossed, TrendingUp, Building2, Leaf } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

/**
 * ---------------------------------------------------------------------------
 * BACKEND / API CONTRACT — Analytics (GET /api/restaurant/:id/analytics)
 * ---------------------------------------------------------------------------
 * Suggested response shape:
 * {
 *   "totalMeals": 3420,
 *   "avgMealsPerWeek": 214,
 *   "ngosReached": 24,
 *   "co2SavedKg": 820,
 *   "donationsOverTime": [                // one point per month, same shape as Overview's chart
 *     { "month": "Feb", "meals": 480 },
 *     { "month": "Mar", "meals": 640 }
 *   ]
 * }
 *
 * `donationsOverTime` can be re-used from the same source that powers the
 * Overview page's "Monthly Food Donations" chart — this page just shows a
 * larger version of it with a longer time range if desired.
 * ---------------------------------------------------------------------------
 */

const MOCK_STATS = [
  { key: "totalMeals", icon: UtensilsCrossed, variant: "green", value: "3,420", label: "Total Meals" },
  { key: "avgMealsPerWeek", icon: TrendingUp, variant: "blue", value: "214", label: "Avg. Per Week" },
  { key: "ngosReached", icon: Building2, variant: "orange", value: "24", label: "NGOs Reached" },
  { key: "co2SavedKg", icon: Leaf, variant: "green", value: "820", label: "CO₂ Saved (kg)" },
];

const MOCK_CHART_DATA = [
  { month: "Feb", meals: 480 },
  { month: "Mar", meals: 660 },
  { month: "Apr", meals: 580 },
  { month: "May", meals: 900 },
  { month: "Jun", meals: 860 },
  { month: "Jul", meals: 1050 },
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
      <Sidebar role="restaurant" activeKey="analytics" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Analytics</h1>
            <p>Understand your donation impact over time.</p>
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
                <h3>Donations Over Time</h3>
              </div>
              <div style={{ width: "100%", height: 320 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData} margin={{ left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="meals" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
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