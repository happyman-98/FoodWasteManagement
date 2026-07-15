// uploadsData.js
// Sample data + helpers for the "Featured Donations" (Uploads) section.
// Each donation has a real image, a category, a quantity, a location,
// a status "tag" (Urgent / Fresh / New / Popular / Verified / Available),
// and a `claimBy` date-time used to compute the "time left" badge live.

export const donations = [
  {
    id: "don-1",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    category: "Surplus Food",
    title: "Fresh Cooked Rice & Curry",
    quantity: "50 portions",
    location: "Koramangala, Bangalore",
    tag: "Urgent",
    claimBy: () => addHours(4),
  },
  {
    id: "don-2",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=400&fit=crop",
    category: "Fresh Vegetables",
    title: "Organic Tomatoes & Greens",
    quantity: "30 kg",
    location: "Whitefield, Bangalore",
    tag: "Fresh",
    claimBy: () => addHours(20),
  },
  {
    id: "don-3",
    image:
      "https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600&h=400&fit=crop",
    category: "Clothes",
    title: "Children's Clothing Bundle",
    quantity: "45 pieces",
    location: "Indiranagar, Bangalore",
    tag: "New",
    claimBy: () => addDays(3),
  },
  {
    id: "don-4",
    image:
      "https://images.unsplash.com/photo-1521123845560-14093637aa7d?w=600&h=400&fit=crop",
    category: "Books",
    title: "School Textbooks Set",
    quantity: "22 books",
    location: "HSR Layout, Bangalore",
    tag: "Popular",
    claimBy: () => addDays(5),
  },
  {
    id: "don-5",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    category: "Electronics",
    title: "Working Laptop & Accessories",
    quantity: "2 units",
    location: "Electronic City, Bangalore",
    tag: "Verified",
    claimBy: () => addDays(2),
  },
  {
    id: "don-6",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    category: "Furniture",
    title: "Wooden Dining Table Set",
    quantity: "1 set (6 chairs)",
    location: "Jayanagar, Bangalore",
    tag: "Available",
    claimBy: () => addDays(7),
  },
];

function addHours(h) {
  const d = new Date();
  d.setHours(d.getHours() + h);
  return d;
}

function addDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(20, 0, 0, 0);
  return d;
}

// Turns a target Date into a short label like the reference designs:
// "Today 8 PM", "Tomorrow 10 AM", "2 days left", "5 days left".
export function formatTimeLeft(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const diffMs = target - now;

  if (diffMs <= 0) return "Closed";

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTarget = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );
  const dayDiff = Math.round((startOfTarget - startOfToday) / 86400000);

  const timeStr = target.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: target.getMinutes() === 0 ? undefined : "2-digit",
  });

  if (dayDiff === 0) return `Today ${timeStr}`;
  if (dayDiff === 1) return `Tomorrow ${timeStr}`;
  if (dayDiff > 1) return `${dayDiff} days left`;
  return "Closed";
}

// Badge color family keyed by tag text (used as a CSS modifier class).
export function tagClass(tag) {
  const map = {
    Urgent: "up-tag--urgent",
    Fresh: "up-tag--fresh",
    New: "up-tag--new",
    Popular: "up-tag--popular",
    Verified: "up-tag--verified",
    Available: "up-tag--available",
  };
  return map[tag] || "up-tag--default";
}