// Compact human numbers: 9660502 -> "9.6M", 80000 -> "80K", 4200 -> "4.2K"
export function compact(n: number): string {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return (v >= 100 ? Math.round(v) : +v.toFixed(1)) + "M";
  }
  if (n >= 1_000) {
    const v = n / 1_000;
    return (v >= 100 ? Math.round(v) : +v.toFixed(v >= 10 ? 0 : 1)) + "K";
  }
  return String(n);
}

export function withCommas(n: number): string {
  return n.toLocaleString("en-US");
}
