import type {
  Championship,
  Match,
  Season,
} from "../../types/football";

export interface TeamFilterOptions {
  championships: Championship[];
  seasons: Season[];
  months: number[];
}

const getMonthFromMatchDate = (matchDate: string): number => {
  return new Date(matchDate).getMonth() + 1;
};

export const getTeamFilterOptions = (
  matches: Match[],
  championships: Championship[],
  seasons: Season[],
  selectedChampionship?: number,
): TeamFilterOptions => {
  /*
   * We only use championships/seasons that are actually present
   * in the team's matches.
   */
  const championshipIds = new Set(
    matches.map((match) => match.championship),
  );

  const availableChampionships = championships.filter((championship) =>
    championshipIds.has(championship.id),
  );

  /*
   * If a championship is selected, seasons are restricted to it.
   * Otherwise all seasons represented by the team's matches are available.
   */
  const filteredMatches = selectedChampionship
    ? matches.filter(
        (match) => match.championship === selectedChampionship,
      )
    : matches;

  const seasonIds = new Set(
    filteredMatches.map((match) => match.season),
  );

  const availableSeasons = seasons.filter(
  (season, index, allSeasons) => {
    if (!seasonIds.has(season.id)) {
      return false;
    }

    if (
      selectedChampionship &&
      season.championship !== selectedChampionship
    ) {
      return false;
    }

    return (
      allSeasons.findIndex(
        (item) =>
          item.name === season.name &&
          (
            !selectedChampionship ||
            item.championship === selectedChampionship
          ) &&
          seasonIds.has(item.id),
      ) === index
    );
  },
);

  /*
   * Months are calculated from the actual matches.
   *
   * We return only months that contain at least one match.
   */
  const monthSet = new Set(
    filteredMatches.map((match) =>
      getMonthFromMatchDate(match.match_date),
    ),
  );

  const availableMonths = Array.from(monthSet).sort(
    (a, b) => a - b,
  );

  return {
    championships: availableChampionships,
    seasons: availableSeasons,
    months: availableMonths,
  };
};