export const limits = {
  '1': 100_000,
  '2': 80_000,
  '3': 1_000_000,
  '4': 10_000_000,
  '5': 500_000,
} as const;

export function getLimit(user: keyof typeof limits) {
  return limits[user] || 0;
}
