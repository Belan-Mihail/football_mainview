export const getTeamLevelDescription = (
  level: string,
): string => {
  if (level === "H") {
    return "Odds 8.00+";
  }

  const letter = level[0];
  const index = Number(level[1]);

  const baseOdd = letter.charCodeAt(0) - 65 + 1;

  const minOdd = baseOdd + (index - 1) * 0.2;
  const maxOdd = baseOdd + index * 0.2 - 0.01;

  return `Odds ${minOdd.toFixed(2)}–${maxOdd.toFixed(2)}`;
};