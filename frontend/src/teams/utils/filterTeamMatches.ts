import type { Match } from "../../types/football";

export interface TeamMatchFilters {
  championship?: number;
  season?: number;
  monthFrom?: number;
  monthTo?: number;
}

const getMonthFromMatchDate = (matchDate: string): number => {
  return new Date(matchDate).getMonth() + 1;
};

export const filterTeamMatches = (
  matches: Match[],
  filters: TeamMatchFilters,
): Match[] => {
  return matches.filter((match) => {
    /*
     * Championship
     */
    if (
      filters.championship !== undefined &&
      match.championship !== filters.championship
    ) {
      return false;
    }

    /*
     * Season
     */
    if (
      filters.season !== undefined &&
      match.season !== filters.season
    ) {
      return false;
    }

    /*
     * Month range
     */
    const month = getMonthFromMatchDate(match.match_date);

    if (
      filters.monthFrom !== undefined &&
      month < filters.monthFrom
    ) {
      return false;
    }

    if (
      filters.monthTo !== undefined &&
      month > filters.monthTo
    ) {
      return false;
    }

    return true;
  });
};