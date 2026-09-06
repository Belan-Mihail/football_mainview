import type {
  ChampionshipData,
  Round,
  Season,
} from "../types/football";

const getDefaultFilter = (
  data: ChampionshipData
) => {

  if (
    !data?.seasons?.length ||
    !data?.rounds?.length
  ) {

    return {
      seasonFrom: 0,
      roundFrom: 0,
      seasonTo: 0,
      roundTo: 0,
    };
  }

  // ----------------------------------------------------------
  // Active season
  // ----------------------------------------------------------

  const activeSeason =
    data.seasons.find(
      (season: Season) =>
        season.status === "active"
    ) ??
    data.seasons[0];

  // ----------------------------------------------------------
  // Rounds of active season
  // ----------------------------------------------------------

  const seasonRounds =
    data.rounds
      .filter(
        (round: Round) =>
          round.season === activeSeason.id
      )
      .sort(
        (a, b) =>
          a.number - b.number
      );

  // ----------------------------------------------------------
  // Finished rounds
  // ----------------------------------------------------------

  const finishedRounds =
    seasonRounds.filter(
      (round: Round) =>
        round.status === "finished"
    );

  // ----------------------------------------------------------
  // Default filter
  // ----------------------------------------------------------

  return {

    seasonFrom:
      activeSeason.id,

    seasonTo:
      activeSeason.id,

    // IMPORTANT:
    // filter stores Round.id,
    // not Round.number

    roundFrom:
      finishedRounds.length
        ? finishedRounds[0].id
        : seasonRounds[0]?.id ?? 0,

    roundTo:
      finishedRounds.length
        ? finishedRounds[
            finishedRounds.length - 1
          ].id
        : seasonRounds[
            seasonRounds.length - 1
          ]?.id ?? 0,
  };
};

export default getDefaultFilter;

