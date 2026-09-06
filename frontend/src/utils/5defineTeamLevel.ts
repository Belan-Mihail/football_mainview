import type { TeamLevels } from "../types/3ByCategoriesTypes";
import type { Match } from "../types/football";

export const defineTeamLevel = (odd: number): string => {
  if (odd >= 8) {
    return "H";
  }

  const letterIndex = Math.floor(odd) - 1;
  const letter = String.fromCharCode(65 + letterIndex);

  const level = Math.floor((odd % 1) / 0.2) + 1;

  return `${letter}${level}`;
};

export const getTeamLevels = (match: Match): TeamLevels => {
  return {
    homeTeamLevel: defineTeamLevel(match.home_odds!),
    awayTeamLevel: defineTeamLevel(match.away_odds!),
  };
};
