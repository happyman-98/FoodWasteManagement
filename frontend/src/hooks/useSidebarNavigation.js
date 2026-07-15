import { useNavigate, useLocation } from "react-router-dom";

/**
 * Bridges the role-based dashboards (Admin, NGO, ...) to React Router.
 *
 * Each dashboard page passes `role="admin" activeKey="dashboard"` etc. to
 * <Sidebar>, and calls `onNavigate(key)` when a link is clicked. Without
 * this hook, `onNavigate` was a no-op default and `activeKey` was
 * hardcoded per page — clicking a sidebar link did nothing.
 *
 * This hook makes both of those come from the URL instead:
 *   - `activeKey` is read off the current path (e.g. "/admin/users" -> "users")
 *   - `onNavigate(key)` calls React Router's navigate() to `/{rolePrefix}/{key}`
 *   - `onLogout()` clears whatever session you use, then sends the user home
 *
 * Usage inside a page component:
 *
 *   const { activeKey, onNavigate, onLogout } = useSidebarNavigation("admin");
 *   <Sidebar role="admin" activeKey={activeKey} onNavigate={onNavigate} onLogout={onLogout} />
 *
 * Swap the body of `onLogout` for your real auth teardown (clear token,
 * call /api/auth/logout, etc.) — the navigate("/") at the end is just
 * where the user lands afterward.
 */
export function useSidebarNavigation(rolePrefix) {
  const navigate = useNavigate();
  const location = useLocation();

  // "/admin/users" -> "users"   |   "/ngo/browse-donations" -> "browse-donations"
  const activeKey = location.pathname.replace(`/${rolePrefix}/`, "").split("/")[0];

  function onNavigate(key) {
    navigate(`/${rolePrefix}/${key}`);
  }

  function onLogout() {
    // TODO: replace with your real logout — clear stored token/session,
    // call a /api/auth/logout endpoint if you have one, etc.
    navigate("/");
  }

  return { activeKey, onNavigate, onLogout };
}
