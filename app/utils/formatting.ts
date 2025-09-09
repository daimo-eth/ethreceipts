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
  const dateUTC = timestamp.toUTCString().split(',')[1];
  const dateUTCStr = dateUTC.substring(1, dateUTC.length - 13);
  const hoursUTCStr = timestamp.getUTCHours();
  const minutesUTCStr = timestamp.getUTCMinutes();
  const timeUTCStr =
    minutesUTCStr < 10 ? `${hoursUTCStr}:0${minutesUTCStr}` : `${hoursUTCStr}:${minutesUTCStr}`;
  return dateUTCStr + ', ' + timeUTCStr + ' UTC';
}

export function formatValue(
  rawValue: bigint | string,
  decimals: number | bigint,
  fractionDigits: number = 2,
): string {
  // Coerce inputs safely
  const raw: bigint = typeof rawValue === 'bigint' ? rawValue : BigInt(rawValue);
  let decNum: number = typeof decimals === 'bigint' ? Number(decimals) : decimals;
  if (decimals < 0) decimals = 0;
  if (decNum < 0) decNum = 0;
  const negative = raw < BigInt(0);
  const value = negative ? -raw : raw;

  const dec = Math.max(0, decNum);
  const s = value.toString();
  if (dec === 0) {
    const num = Number(negative ? `-${s}` : s);
    return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  const pad = dec + 1; // ensure at least one integer digit
  const padded = s.padStart(pad, '0');
  const intPart = padded.slice(0, padded.length - dec);
  const fracPartFull = padded.slice(padded.length - dec);

  // Round to desired fraction digits
  const fd = Math.max(0, fractionDigits);
  let roundedInt = BigInt(intPart);
  let fracShown: string;
  if (fd === 0) {
    // Round based on first fractional digit
    if (fracPartFull.length > 0 && fracPartFull[0] >= '5') roundedInt = roundedInt + BigInt(1);
    fracShown = '';
  } else {
    if (fracPartFull.length <= fd) {
      fracShown = fracPartFull.padEnd(fd, '0');
    } else {
      const head = fracPartFull.slice(0, fd);
      const nextDigit = fracPartFull[fd];
      // Perform carry if needed
      if (nextDigit >= '5') {
        // Increment head as integer and handle carry into integer part if overflow
        let headNum = BigInt(head);
        const base = pow10BigInt(fd);
        headNum = headNum + BigInt(1);
        if (headNum >= base) {
          headNum = headNum - base;
          roundedInt = roundedInt + BigInt(1);
        }
        fracShown = headNum.toString().padStart(fd, '0');
      } else {
        fracShown = head;
      }
    }
  }

  const sign = negative ? '-' : '';
  const intFormatted = Number(roundedInt).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return fd > 0 ? `${sign}${intFormatted}.${fracShown}` : `${sign}${intFormatted}`;
}

/**
 * Format a token amount given a raw bigint and decimals without losing precision.
 * Rounds to the specified number of fraction digits (default 2).
 */
export function formatTokenAmount(
  rawValue: bigint | string,
  decimals: number | bigint,
  fractionDigits: number = 2,
): string {
  // Backward compatibility wrapper
  return formatValue(rawValue, decimals, fractionDigits);
}

function pow10BigInt(exp: number): bigint {
  let result = BigInt(1);
  const ten = BigInt(10);
  for (let i = 0; i < exp; i++) result = result * ten;
  return result;
}
