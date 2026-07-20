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


export function getInitials(displayName) {
  if (!displayName) return "?";
  const words = displayName.trim().split(/\s+/).filter(Boolean);
  const initials = words.slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

export function getAvatarInfo(user) {
  const displayName = getDisplayName(user);
  const initials = getInitials(displayName);

  const imageUrl = user?.role === USER_ROLES.FARMER ? null : user?.avatar || null;
  return { displayName, initials, imageUrl };
}