/**
 * Format seconds to m:ss display string
 */
export function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/**
 * Calculate age from a birth date string
 */
export function calculateAge(birthDateStr: string): number {
  const birthDate = new Date(birthDateStr);
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return Math.max(0, age);
}
