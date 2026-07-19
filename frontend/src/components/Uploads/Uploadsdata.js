// uploadsData.js
// Helpers shared by the "Featured Donations" (Uploads) section.

// Turns a target Date (or ISO string) into a short label like:
// "Today 8 PM", "Tomorrow 10 AM", "2 days left", "Closed".
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
// Matches Post.tag enum exactly: Urgent, Fresh, New, Popular, Verified, Available.
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