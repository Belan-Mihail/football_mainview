import type {
  TotalsCategoryResults,
  TotalsCategoryResultsMap,
} from "../types/Totals";

import type { Match } from "../types/football";

import { getTeamLevels } from "../utils/5defineTeamLevel";

import { getTotalsForPeriods } from "../utils/matchUtils";

const MIN_CATEGORY_MATCHES = 3;

export const calculateTotalsByCategory = (
  matches: Match[],
): TotalsCategoryResultsMap => {

  const categories: TotalsCategoryResultsMap = {};

  matches.forEach((match) => {

    const teamLevels = getTeamLevels(match);

    const totals = getTotalsForPeriods(match);

    const levels = [
      teamLevels.homeTeamLevel,
      teamLevels.awayTeamLevel,
    ];

    levels.forEach((level) => {

      if (!categories[level]) {
        categories[level] = {

          matches: 0,

          matchOver15: 0,
          matchOver25: 0,
          matchOver35: 0,
          matchOver45: 0,
          matchOver55: 0,

          matchNotOver15: 0,
          matchNotOver25: 0,
          matchNotOver35: 0,
          matchNotOver45: 0,
          matchNotOver55: 0,

          firstHalfOver05: 0,
          firstHalfOver15: 0,
          firstHalfOver25: 0,

          firstHalfNotOver05: 0,
          firstHalfNotOver15: 0,
          firstHalfNotOver25: 0,

          secondHalfOver05: 0,
          secondHalfOver15: 0,
          secondHalfOver25: 0,

          secondHalfNotOver05: 0,
          secondHalfNotOver15: 0,
          secondHalfNotOver25: 0,

          matchOver15Percent: 0,
          matchOver25Percent: 0,
          matchOver35Percent: 0,
          matchOver45Percent: 0,
          matchOver55Percent: 0,

          matchNotOver15Percent: 0,
          matchNotOver25Percent: 0,
          matchNotOver35Percent: 0,
          matchNotOver45Percent: 0,
          matchNotOver55Percent: 0,

          firstHalfOver05Percent: 0,
          firstHalfOver15Percent: 0,
          firstHalfOver25Percent: 0,

          firstHalfNotOver05Percent: 0,
          firstHalfNotOver15Percent: 0,
          firstHalfNotOver25Percent: 0,

          secondHalfOver05Percent: 0,
          secondHalfOver15Percent: 0,
          secondHalfOver25Percent: 0,

          secondHalfNotOver05Percent: 0,
          secondHalfNotOver15Percent: 0,
          secondHalfNotOver25Percent: 0,
        };
      }

      const category = categories[level];

      category.matches++;

      // ---------- FULL TIME ----------

      totals.match.over15
        ? category.matchOver15++
        : category.matchNotOver15++;

      totals.match.over25
        ? category.matchOver25++
        : category.matchNotOver25++;

      totals.match.over35
        ? category.matchOver35++
        : category.matchNotOver35++;

      totals.match.over45
        ? category.matchOver45++
        : category.matchNotOver45++;

      totals.match.over55
        ? category.matchOver55++
        : category.matchNotOver55++;

      // ---------- FIRST HALF ----------

      totals.firstHalf.over05
        ? category.firstHalfOver05++
        : category.firstHalfNotOver05++;

      totals.firstHalf.over15
        ? category.firstHalfOver15++
        : category.firstHalfNotOver15++;

      totals.firstHalf.over25
        ? category.firstHalfOver25++
        : category.firstHalfNotOver25++;

      // ---------- SECOND HALF ----------

      totals.secondHalf.over05
        ? category.secondHalfOver05++
        : category.secondHalfNotOver05++;

      totals.secondHalf.over15
        ? category.secondHalfOver15++
        : category.secondHalfNotOver15++;

      totals.secondHalf.over25
        ? category.secondHalfOver25++
        : category.secondHalfNotOver25++;
    });
  });

  const result: TotalsCategoryResultsMap = {};

  Object.entries(categories).forEach(([level, category]) => {

    if (category.matches < MIN_CATEGORY_MATCHES) {
      return;
    }

    result[level] = {

      ...category,

      matchOver15Percent:
        category.matchOver15 / category.matches * 100,

      matchOver25Percent:
        category.matchOver25 / category.matches * 100,

      matchOver35Percent:
        category.matchOver35 / category.matches * 100,

      matchOver45Percent:
        category.matchOver45 / category.matches * 100,

      matchOver55Percent:
        category.matchOver55 / category.matches * 100,

      matchNotOver15Percent:
        category.matchNotOver15 / category.matches * 100,

      matchNotOver25Percent:
        category.matchNotOver25 / category.matches * 100,

      matchNotOver35Percent:
        category.matchNotOver35 / category.matches * 100,

      matchNotOver45Percent:
        category.matchNotOver45 / category.matches * 100,

      matchNotOver55Percent:
        category.matchNotOver55 / category.matches * 100,

      firstHalfOver05Percent:
        category.firstHalfOver05 / category.matches * 100,

      firstHalfOver15Percent:
        category.firstHalfOver15 / category.matches * 100,

      firstHalfOver25Percent:
        category.firstHalfOver25 / category.matches * 100,

      firstHalfNotOver05Percent:
        category.firstHalfNotOver05 / category.matches * 100,

      firstHalfNotOver15Percent:
        category.firstHalfNotOver15 / category.matches * 100,

      firstHalfNotOver25Percent:
        category.firstHalfNotOver25 / category.matches * 100,

      secondHalfOver05Percent:
        category.secondHalfOver05 / category.matches * 100,

      secondHalfOver15Percent:
        category.secondHalfOver15 / category.matches * 100,

      secondHalfOver25Percent:
        category.secondHalfOver25 / category.matches * 100,

      secondHalfNotOver05Percent:
        category.secondHalfNotOver05 / category.matches * 100,

      secondHalfNotOver15Percent:
        category.secondHalfNotOver15 / category.matches * 100,

      secondHalfNotOver25Percent:
        category.secondHalfNotOver25 / category.matches * 100,
    };
  });

  return result;
};