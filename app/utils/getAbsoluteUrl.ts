const publicUrl = (function () {
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL;
  } else if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  } else {
    return 'https://ethreceipts.org';
  }
})();

export function getAbsoluteUrl(path: string) {
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  return `${publicUrl}${path}`;
}
