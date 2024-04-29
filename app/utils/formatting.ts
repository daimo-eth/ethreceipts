/** Retrieves how many days/hours/minutes ago the given timestamp is relative to current timestamp */
export function getDateDifference(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diff / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diff / (1000 * 60));
  if (diffInDays > 0) return `Sent ${diffInDays} day${diffInDays == 1 ? '' : 's'} ago`;
  else if (diffInHours > 0) return `Sent ${diffInHours} hour${diffInHours == 1 ? '' : 's'} ago`;
  else if (diffInMinutes > 0)
    return `Sent ${diffInMinutes} min${diffInMinutes == 1 ? '' : 's'} ago`;
  else return 'Just now';
}

/** Truncates address hash */
export function truncateAddress(address: string, startSize: number = 8): string {
  return (
    address.substring(0, startSize) + '...' + address.substring(address.length - 4, address.length)
  );
}

/** Format the timestamp into "26 Mar 2024, 5:09 UTC" format*/
export function formatTimestamp(timestamp: Date): string {
  // Options for the DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated day of the week
    month: 'short', // abbreviated month
    day: '2-digit', // two-digit day
    hour: 'numeric', // numeric hour
    minute: '2-digit', // two-digit minute
    hour12: true, // use 12-hour format
    timeZoneName: 'short', // abbreviated time zone name
  };

  // Create a formatter with the local timezone
  const formatter = new Intl.DateTimeFormat('en-US', options);

  // Format the date
  return formatter.format(timestamp);
}

export function formatValue(value: Number): string {
  const valStr = value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return valStr;
}
