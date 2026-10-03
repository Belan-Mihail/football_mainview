import type { Match } from "../types/football";

import type {
  AdditionalCategoryResults,
  AdditionalCategoryResultsMap,
} from "../types/7AdditionalStatistikTypes";

import {
  getFullAwayStats,
  getFullHomeStats,
} from "../utils/additionalStatsUtils";

import { getTeamLevels } from "../utils/5defineTeamLevel";


const MIN_CATEGORY_MATCHES = 3;


const createEmptyCategory = (): AdditionalCategoryResults => ({
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


export const calculateAdditionalStatsByCategory = (
  matches: Match[],
): AdditionalCategoryResultsMap => {

  const categories: AdditionalCategoryResultsMap = {};


  matches.forEach((match) => {

    const teamLevels = getTeamLevels(match);


    // ---------- CREATE HOME CATEGORY ----------

    if (!categories[teamLevels.homeTeamLevel]) {
      categories[teamLevels.homeTeamLevel] = createEmptyCategory();
    }


    // ---------- CREATE AWAY CATEGORY ----------

    if (!categories[teamLevels.awayTeamLevel]) {
      categories[teamLevels.awayTeamLevel] = createEmptyCategory();
    }


    // ---------- HOME TEAM STAT ----------

    const categoryHomeTeam =
      categories[teamLevels.homeTeamLevel];

    const homeTeamStats = getFullHomeStats(match);

    categoryHomeTeam.matches++;

    categoryHomeTeam.totalCorners += homeTeamStats.corners;
    categoryHomeTeam.totalShots += homeTeamStats.shots;
    categoryHomeTeam.totalShotsOT += homeTeamStats.shotsOT;
    categoryHomeTeam.totalYellowCards += homeTeamStats.yellowCards;
    categoryHomeTeam.totalXG += Number(homeTeamStats.xG);

    if (homeTeamStats.winByCorners) {
      categoryHomeTeam.winByCorners++;
    }

    if (homeTeamStats.winByShots) {
      categoryHomeTeam.winByShots++;
    }

    if (homeTeamStats.winByShotsOT) {
      categoryHomeTeam.winByShotsOT++;
    }

    if (homeTeamStats.winByYellowCards) {
      categoryHomeTeam.winByYellowCards++;
    }

    if (homeTeamStats.winByXg) {
      categoryHomeTeam.winByXG++;
    }

    if (homeTeamStats.winByCornersAndMatch) {
      categoryHomeTeam.winByCornersAndMatch++;
    }

    if (homeTeamStats.winByShotsAndMatch) {
      categoryHomeTeam.winByShotsAndMatch++;
    }

    if (homeTeamStats.winByShotsOTAndMatch) {
      categoryHomeTeam.winByShotsOTAndMatch++;
    }

    if (homeTeamStats.winByYellowCardsAndMatch) {
      categoryHomeTeam.winByYellowCardsAndMatch++;
    }

    if (homeTeamStats.winByXgAndMatch) {
      categoryHomeTeam.winByXGAndMatch++;
    }


    // ---------- AWAY TEAM STAT ----------

    const categoryAwayTeam =
      categories[teamLevels.awayTeamLevel];

    const awayTeamStats = getFullAwayStats(match);

    categoryAwayTeam.matches++;

    categoryAwayTeam.totalCorners += awayTeamStats.corners;
    categoryAwayTeam.totalShots += awayTeamStats.shots;
    categoryAwayTeam.totalShotsOT += awayTeamStats.shotsOT;
    categoryAwayTeam.totalYellowCards += awayTeamStats.yellowCards;
    categoryAwayTeam.totalXG += Number(awayTeamStats.xG);

    if (awayTeamStats.winByCorners) {
      categoryAwayTeam.winByCorners++;
    }

    if (awayTeamStats.winByShots) {
      categoryAwayTeam.winByShots++;
    }

    if (awayTeamStats.winByShotsOT) {
      categoryAwayTeam.winByShotsOT++;
    }

    if (awayTeamStats.winByYellowCards) {
      categoryAwayTeam.winByYellowCards++;
    }

    if (awayTeamStats.winByXg) {
      categoryAwayTeam.winByXG++;
    }

    if (awayTeamStats.winByCornersAndMatch) {
      categoryAwayTeam.winByCornersAndMatch++;
    }

    if (awayTeamStats.winByShotsAndMatch) {
      categoryAwayTeam.winByShotsAndMatch++;
    }

    if (awayTeamStats.winByShotsOTAndMatch) {
      categoryAwayTeam.winByShotsOTAndMatch++;
    }

    if (awayTeamStats.winByYellowCardsAndMatch) {
      categoryAwayTeam.winByYellowCardsAndMatch++;
    }

    if (awayTeamStats.winByXgAndMatch) {
      categoryAwayTeam.winByXGAndMatch++;
    }

  });


  // ---------- CALCULATE FINAL RESULTS ----------

  const result: AdditionalCategoryResultsMap = {};


  Object.entries(categories).forEach(([level, category]) => {

    if (category.matches < MIN_CATEGORY_MATCHES) {
      return;
    }


    result[level] = {
      ...category,

      // ---------- AVERAGES ----------

      cornersAverage:
        category.totalCorners / category.matches,

      shotsAverage:
        category.totalShots / category.matches,

      shotsOTAverage:
        category.totalShotsOT / category.matches,

      yellowCardsAverage:
        category.totalYellowCards / category.matches,

      xGAverage:
        category.totalXG / category.matches,


      // ---------- STAT WIN PERCENT ----------

      winByCornersPercent:
        (category.winByCorners / category.matches) * 100,

      winByShotsPercent:
        (category.winByShots / category.matches) * 100,

      winByShotsOTPercent:
        (category.winByShotsOT / category.matches) * 100,

      winByYellowCardsPercent:
        (category.winByYellowCards / category.matches) * 100,

      winByXGPercent:
        (category.winByXG / category.matches) * 100,


      // ---------- STAT + MATCH WIN PERCENT ----------

      winByCornersAndMatchPercent:
        (category.winByCornersAndMatch / category.matches) * 100,

      winByShotsAndMatchPercent:
        (category.winByShotsAndMatch / category.matches) * 100,

      winByShotsOTAndMatchPercent:
        (category.winByShotsOTAndMatch / category.matches) * 100,

      winByYellowCardsAndMatchPercent:
        (category.winByYellowCardsAndMatch / category.matches) * 100,

      winByXGAndMatchPercent:
        (category.winByXGAndMatch / category.matches) * 100,
    };

  });


  return result;
};