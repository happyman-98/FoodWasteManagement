/**
 * authHelpers.js
 * ---------------------------------------------------------------------------
 * Shared helpers for rendering the logged-in account across the app
 * (Navbar avatar, dropdown label, etc.). Keeping this logic in one place
 * means any component can resolve "what do we call this user / what image
 * do we show" the same way.
 *
 * ============================================================================
 * DATA CONTRACT — READ THIS IF YOU ARE WIRING UP AUTH / THE BACKEND
 * ============================================================================
 *
 * The Navbar does NOT fetch or manage auth state itself. It is a
 * presentational component that expects the parent app (wherever you keep
 * auth state — Context, Redux, a custom hook, etc.) to pass it a `user`
 * prop shaped like this:
 *
 *   user = null                     -> logged out (shows Login / Sign Up buttons)
 *   user = { ...UserShape }         -> logged in (shows avatar + dropdown)
 *
 * UserShape (all fields are top-level, flat — no nesting):
 * ----------------------------------------------------------------------------
 *  id            string   REQUIRED   Unique user id from your DB/auth provider.
 *  role          string   REQUIRED   One of USER_ROLES below. Determines which
 *                                    name field is used and how the avatar
 *                                    fallback renders.
 *  name          string   REQUIRED for role "donor".
 *                         optional   Full name of an individual donor account.
 *  orgName       string   REQUIRED for role "ngo" and "restaurant".
 *                                    Organization / restaurant display name.
 *  farmName      string   REQUIRED for role "farmer".
 *                                    Farm display name.
 *  avatar         string   OPTIONAL   Profile photo (donor) or logo (ngo /
 *                                    restaurant) image URL.
 *                                    - Recommended: square image, ≥128x128px,
 *                                      jpg/png/webp.
 *                                    - If missing/null, the UI falls back to
 *                                      a colored circle with initials.
 *                                    - NOTE: for role "farmer", avatarUrl is
 *                                      intentionally ignored — farmer accounts
 *                                      always render as a text/initials
 *                                      circle from farmName. Remove the
 *                                      special-case in getAvatarInfo() below
 *                                      if you later want farmer logos too.
 *                                    - IMPLEMENTATION NOTE: the actual field
 *                                      returned by the backend and set by
 *                                      Profile.jsx is `avatar`, not
 *                                      `avatarUrl`. getAvatarInfo() below
 *                                      reads `user.avatar` accordingly. If
 *                                      you rename the backend field, update
 *                                      both this doc and getAvatarInfo().
 *
 * Example payloads your login/auth endpoint should resolve to:
 *
 *   // Donor
 *   { id: "u_123", role: "donor", name: "Aditi Sharma", avatar: "https://.../photo.jpg" }
 *
 *   // NGO
 *   { id: "ngo_45", role: "ngo", orgName: "Hope Foundation", avatar: "https://.../logo.png" }
 *
 *   // Farmer
 *   { id: "farm_9", role: "farmer", farmName: "Green Valley Farm" }
 *
 *   // Restaurant
 *   { id: "rest_7", role: "restaurant", orgName: "Spice Route Kitchen", avatar: "https://.../logo.png" }
 *
 * Other props the Navbar expects from the parent:
 * ----------------------------------------------------------------------------
 *  isLoadingUser  boolean   Set true while auth state is still resolving
 *                           (e.g. checking a token on page load) so the
 *                           Navbar can show a neutral skeleton instead of
 *                           flashing the Login/Sign Up buttons then
 *                           swapping to the avatar a moment later.
 *
 *  onLogout       function  Called when the user clicks "Logout" in the
 *                           dropdown. This function should clear the
 *                           session/token on your end and then update the
 *                           `user` state back to null. The Navbar does not
 *                           clear anything itself.
 * ============================================================================
 */

export const USER_ROLES = {
  DONOR: "donor",
  NGO: "ngo",
  FARMER: "farmer",
  RESTAURANT: "restaurant",
  ADMIN: "admin",
};

export const ROLE_LABELS = {
  [USER_ROLES.DONOR]: "Donor",
  [USER_ROLES.NGO]: "NGO",
  [USER_ROLES.FARMER]: "Farmer",
  [USER_ROLES.RESTAURANT]: "Restaurant",
  [USER_ROLES.ADMIN]: "Admin",
};

/**
 * Resolves the correct display name for any account type.
 */
export function getDisplayName(user) {
  if (!user) return "";

  switch (user.role) {
    case USER_ROLES.NGO:
    case USER_ROLES.RESTAURANT:
      return user.orgName || user.name || "Account";
    case USER_ROLES.FARMER:
      return user.farmName || user.name || "Account";
    case USER_ROLES.ADMIN:
      return user.name || "Admin";
    case USER_ROLES.DONOR:
    default:
      return user.name || "Account";
  }
}

/** Builds up to 2 initials from a display name, e.g. "Green Valley Farm" -> "GV" */
export function getInitials(displayName) {
  if (!displayName) return "?";
  const words = displayName.trim().split(/\s+/).filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

/**
 * Returns everything the avatar UI needs to render for a given user:
 *   { displayName, initials, imageUrl }
 * imageUrl is null when there's nothing to show (or the role opts out of
 * images, like farmer) — the component should fall back to initials.
 */
export function getAvatarInfo(user) {
  const displayName = getDisplayName(user);
  const initials = getInitials(displayName);

  // Farmer accounts always render as a text circle from the farm name,
  // per product spec — image intentionally ignored even if provided.
  const imageUrl = user?.role === USER_ROLES.FARMER ? null : user?.avatar || null;
  return { displayName, initials, imageUrl };
}