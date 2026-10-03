import type {
  AdditionalCategoryResults,
  FullTeamStats,
} from "../types/7AdditionalStatistikTypes";

import type { Match } from "../types/football";

import { getFavoriteAdditionalStats } from "../utils/additionalStatsUtils";


// ==========================================================
// EMPTY OBJECT
// ==========================================================

const createEmptyAddStatsObj = (): AdditionalCategoryResults => ({
  matches: 0,

  totalCorners: 0,
  totalShots: 0,
  totalShotsOT: 0,
  totalYellowCards: 0,
  totalXG: 0,

  winByCorners: 0,
  winByShots: 0,
  winByShotsOT: 0,
  winByYellowCards: 0,
  winByXG: 0,

  winByCornersAndMatch: 0,
  winByShotsAndMatch: 0,
  winByShotsOTAndMatch: 0,
  winByYellowCardsAndMatch: 0,
  winByXGAndMatch: 0,

  cornersAverage: 0,
  shotsAverage: 0,
  shotsOTAverage: 0,
  yellowCardsAverage: 0,
  xGAverage: 0,

  winByCornersPercent: 0,
  winByShotsPercent: 0,
  winByShotsOTPercent: 0,
  winByYellowCardsPercent: 0,
  winByXGPercent: 0,

  winByCornersAndMatchPercent: 0,
  winByShotsAndMatchPercent: 0,
  winByShotsOTAndMatchPercent: 0,
  winByYellowCardsAndMatchPercent: 0,
  winByXGAndMatchPercent: 0,
});


// ==========================================================
// ADD ONE TEAM'S STATS
// ==========================================================

const addAdditionalStats = (
  result: AdditionalCategoryResults,
  stats: FullTeamStats,
): void => {

  result.matches++;

  result.totalCorners += stats.corners;
  result.totalShots += stats.shots;
  result.totalShotsOT += stats.shotsOT;
  result.totalYellowCards += stats.yellowCards;
  result.totalXG += Number(stats.xG);


  // --------------------------------------------------------
  // STAT WINS
  // --------------------------------------------------------

  if (stats.winByCorners) {
    result.winByCorners++;
  }

  if (stats.winByShots) {
    result.winByShots++;
  }

  if (stats.winByShotsOT) {
    result.winByShotsOT++;
  }

  if (stats.winByYellowCards) {
    result.winByYellowCards++;
  }

  if (stats.winByXg) {
    result.winByXG++;
  }


  // --------------------------------------------------------
  // STAT + MATCH WINS
  // --------------------------------------------------------

  if (stats.winByCornersAndMatch) {
    result.winByCornersAndMatch++;
  }

  if (stats.winByShotsAndMatch) {
    result.winByShotsAndMatch++;
  }

  if (stats.winByShotsOTAndMatch) {
    result.winByShotsOTAndMatch++;
  }

  if (stats.winByYellowCardsAndMatch) {
    result.winByYellowCardsAndMatch++;
  }

  if (stats.winByXgAndMatch) {
    result.winByXGAndMatch++;
  }
};


// ==========================================================
// CALCULATE AVERAGES AND PERCENTAGES
// ==========================================================

const finalizeAdditionalStats = (
  result: AdditionalCategoryResults,
): void => {

  if (result.matches === 0) {
    return;
  }

  // --------------------------------------------------------
  // AVERAGES
  // --------------------------------------------------------

  result.cornersAverage =
    result.totalCorners / result.matches;

  result.shotsAverage =
    result.totalShots / result.matches;

  result.shotsOTAverage =
    result.totalShotsOT / result.matches;

  result.yellowCardsAverage =
    result.totalYellowCards / result.matches;

  result.xGAverage =
    result.totalXG / result.matches;


  // --------------------------------------------------------
  // STAT WIN %
  // --------------------------------------------------------

  result.winByCornersPercent =
    (result.winByCorners / result.matches) * 100;

  result.winByShotsPercent =
    (result.winByShots / result.matches) * 100;

  result.winByShotsOTPercent =
    (result.winByShotsOT / result.matches) * 100;

  result.winByYellowCardsPercent =
    (result.winByYellowCards / result.matches) * 100;

  result.winByXGPercent =
    (result.winByXG / result.matches) * 100;


  // --------------------------------------------------------
  // STAT + MATCH WIN %
  // --------------------------------------------------------

  result.winByCornersAndMatchPercent =
    (result.winByCornersAndMatch / result.matches) * 100;

  result.winByShotsAndMatchPercent =
    (result.winByShotsAndMatch / result.matches) * 100;

  result.winByShotsOTAndMatchPercent =
    (result.winByShotsOTAndMatch / result.matches) * 100;

  result.winByYellowCardsAndMatchPercent =
    (result.winByYellowCardsAndMatch / result.matches) * 100;

  result.winByXGAndMatchPercent =
    (result.winByXGAndMatch / result.matches) * 100;
};


// ==========================================================
// MAIN CALCULATOR
// ==========================================================

export const calculateFavoriteAdditionalStats = (
  matches: Match[],
): {
  favorite: AdditionalCategoryResults;
  nonFavorite: AdditionalCategoryResults;
  strongFavorite: AdditionalCategoryResults;
} => {

  const favorite = createEmptyAddStatsObj();

  const nonFavorite = createEmptyAddStatsObj();

  const strongFavorite = createEmptyAddStatsObj();


  // ========================================================
  // COLLECT DATA
  // ========================================================

  matches.forEach((match) => {

    const statsData = getFavoriteAdditionalStats(match);


    // ------------------------------------------------------
    // FAVORITE
    // ------------------------------------------------------

    addAdditionalStats(
      favorite,
      statsData.favoriteAdditionalStats,
    );


    // ------------------------------------------------------
    // NON-FAVORITE
    // ------------------------------------------------------

    addAdditionalStats(
      nonFavorite,
      statsData.nonfavoriteAdditionalStats,
    );


    // ------------------------------------------------------
    // STRONG FAVORITE
    // ------------------------------------------------------

    if (statsData.strongFavoriteAdditionalStats) {

      addAdditionalStats(
        strongFavorite,
        statsData.strongFavoriteAdditionalStats,
      );

    }

  });


  // ========================================================
  // FINALIZE
  // ========================================================

  finalizeAdditionalStats(favorite);

  finalizeAdditionalStats(nonFavorite);

  finalizeAdditionalStats(strongFavorite);


  // ========================================================
  // RETURN
  // ========================================================

  return {
    favorite,
    nonFavorite,
    strongFavorite,
  };
};