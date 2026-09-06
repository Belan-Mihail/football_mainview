export const calculatePercent = (
  value: number,
  total: number,
): number => {
  return total ? (value / total) * 100 : 0;
};