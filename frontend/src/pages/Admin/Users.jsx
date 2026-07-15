import React, { useMemo, useState } from "react";
import { Search, Eye, Pencil, Trash2 } from "lucide-react";
import Sidebar from "../../components/SideBar/Sidebar";
import "../../styles/Dashboard.css";

/**
 * Mirrors GET /api/admin/users
 * `status` stays a plain enum ("active" | "inactive") — the badge label
 * and color are decided in this file, not by the API.
 */
const USERS = [
  { userId: "u_1007", fullName: "Sunita Rao", avatarUrl: "/avatars/sunita-rao.jpg", role: "Restaurant", joinedAt: "2026-07-07", status: "active" },
  { userId: "u_1006", fullName: "Arvind Patel", avatarUrl: "/avatars/arvind-patel.jpg", role: "Farmer", joinedAt: "2026-07-06", status: "active" },
  { userId: "u_1005", fullName: "Meena Joshi", avatarUrl: "/avatars/meena-joshi.jpg", role: "NGO", joinedAt: "2026-07-05", status: "active" },
  { userId: "u_1004", fullName: "Kiran Kumar", avatarUrl: "/avatars/kiran-kumar.jpg", role: "Donor", joinedAt: "2026-07-04", status: "inactive" },
  { userId: "u_1003", fullName: "Priya Sharma", avatarUrl: "/avatars/priya-sharma.jpg", role: "Donor", joinedAt: "2026-07-03", status: "active" },
  { userId: "u_1002", fullName: "Suresh Nair", avatarUrl: "/avatars/suresh-nair.jpg", role: "Restaurant", joinedAt: "2026-07-02", status: "active" },
];

function formatShortDate(isoDate) {
  const [, month, day] = isoDate.split("-");
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(day, 10)}`;
}

export default function Users({
  onNavigate = () => {},
  onLogout = () => {},
  onViewUser = () => {},
  onEditUser = () => {},
  onDeleteUser = () => {},
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Client-side filter for now — swap for a debounced call to
  // GET /api/admin/users?q=<searchQuery> once the list grows past a page.
  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return USERS;
    return USERS.filter(
      (user) =>
        user.fullName.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" activeKey="users" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="page-header">
          <div>
            <h1>Users</h1>
            <p>Manage all registered platform users.</p>
          </div>
          <div className="search-bar" style={{ maxWidth: 280 }}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="panel" style={{ padding: "1.5rem" }}>
          <table className="data-table">
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
              {filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>
                    <div className="data-table-user-cell">
                      <img className="data-table-avatar" src={user.avatarUrl} alt={user.fullName} />
                      {user.fullName}
                    </div>
                  </td>
                  <td>{user.role}</td>
                  <td>{formatShortDate(user.joinedAt)}</td>
                  <td>
                    <span className={`badge badge--${user.status}`}>
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn" title="View" onClick={() => onViewUser(user.userId)}>
                        <Eye size={16} />
                      </button>
                      <button className="icon-btn" title="Edit" onClick={() => onEditUser(user.userId)}>
                        <Pencil size={16} />
                      </button>
                      <button
                        className="icon-btn icon-btn--danger"
                        title="Delete"
                        onClick={() => onDeleteUser(user.userId)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "var(--muted-foreground)", padding: "2rem 0" }}>
                    No users match "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
