import type {
  ChampionshipData,
  Match,
  MatchFilter,
} from "../types/football";

const filterMatches = (
  data: ChampionshipData,
  filter: MatchFilter
): Match[] => {

  const seasonFrom = Number(filter.seasonFrom);
  const seasonTo = Number(filter.seasonTo);

  const roundFrom = Number(filter.roundFrom);
  const roundTo = Number(filter.roundTo);

  // ----------------------------------------------------------
  // Find selected rounds
  // ----------------------------------------------------------

  const fromRound = data.rounds.find(
    (round) => round.id === roundFrom
  );

  const toRound = data.rounds.find(
    (round) => round.id === roundTo
  );

  if (!fromRound || !toRound) {
    return [];
  }

  // ----------------------------------------------------------
  // Same season
  // ----------------------------------------------------------

  if (seasonFrom === seasonTo) {

    const minRoundNumber = Math.min(
      fromRound.number,
      toRound.number
    );

    const maxRoundNumber = Math.max(
      fromRound.number,
      toRound.number
    );

    return data.matches.filter(
      (match: Match) => {

        const season = Number(match.season);
        const matchRoundId = Number(match.round);

        if (season !== seasonFrom) {
          return false;
        }

        const matchRound = data.rounds.find(
          (round) => round.id === matchRoundId
        );

        if (!matchRound) {
          return false;
        }

        return (
          matchRound.number >= minRoundNumber &&
          matchRound.number <= maxRoundNumber
        );
      }
    );
  }

  // ----------------------------------------------------------
  // Different seasons
  // ----------------------------------------------------------

  return data.matches.filter(
    (match: Match) => {

      const season = Number(match.season);
      const matchRoundId = Number(match.round);

      const matchRound = data.rounds.find(
        (round) => round.id === matchRoundId
      );

      if (!matchRound) {
        return false;
      }

      // First selected season
      if (season === seasonFrom) {
        return matchRound.number >= fromRound.number;
      }

      // Last selected season
      if (season === seasonTo) {
        return matchRound.number <= toRound.number;
      }

      // Seasons between
      if (season > seasonFrom && season < seasonTo) {
        return true;
      }

      return false;
    }
  );
};

export default filterMatches;


// ============================================================
// FILTER MATCHES BY ROUND
// ============================================================

export const filterMatchesByRound = (
  data: ChampionshipData,
  season: number,
  round: number
): Match[] => {

  return data.matches.filter(
    (match: Match) =>
      Number(match.season) === Number(season) &&
      Number(match.round) === Number(round)
  );
};

