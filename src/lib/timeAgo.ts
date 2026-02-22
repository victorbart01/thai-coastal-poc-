export function timeAgo(dateStr: string, locale: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return locale === "th" ? "เมื่อสักครู่" : "just now";
  if (minutes < 60)
    return locale === "th" ? `${minutes} นาทีที่แล้ว` : `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return locale === "th" ? `${hours} ชั่วโมงที่แล้ว` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30)
    return locale === "th" ? `${days} วันที่แล้ว` : `${days}d ago`;
  const months = Math.floor(days / 30);
  return locale === "th" ? `${months} เดือนที่แล้ว` : `${months}mo ago`;
}
