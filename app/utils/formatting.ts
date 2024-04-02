export function getDateDifference(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  if (diffInDays > 0) return `${diffInDays} days ago`;
  else if (diffInHours > 0) return `${diffInHours} hours ago`;
  else if (diffInMinutes > 0) return `${diffInMinutes} minutes ago`;
  else return 'Just now';
}
