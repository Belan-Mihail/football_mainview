import type {
  BTTSCategoryResults,
  BTTSCategoryResultsMap,
} from "../types/4BTTSTypes";

import type { Match } from "../types/football";

import { getTeamLevels } from "../utils/5defineTeamLevel";

import { getBTTSForPeriods } from "../utils/matchUtils";

const MIN_CATEGORY_MATCHES = 3;

export const calculateBTTSCategoryResults = (
  matches: Match[],
): BTTSCategoryResultsMap => {

  const categories: BTTSCategoryResultsMap = {};

  matches.forEach((match) => {

    const teamLevels = getTeamLevels(match);

    const btts = getBTTSForPeriods(match);

    const levels = [
      teamLevels.homeTeamLevel,
      teamLevels.awayTeamLevel,
    ];

    levels.forEach((level) => {

      if (!categories[level]) {
        categories[level] = {
          matches: 0,

          BTTS: 0,
          noBTTS: 0,

          firstHalfBTTS: 0,
          firstHalfNoBTTS: 0,

          secondHalfBTTS: 0,
          secondHalfNoBTTS: 0,

          sequence: [],
          firstHalfSequence: [],
          secondHalfSequence: [],
        };
      }

      const category = categories[level];

      category.matches++;

      // ---------- FULL TIME ----------

      if (btts.match) {
        category.BTTS++;
      } else {
        category.noBTTS++;
      }

      // ---------- FIRST HALF ----------

      if (btts.firstHalf) {
        category.firstHalfBTTS++;
      } else {
        category.firstHalfNoBTTS++;
      }

      // ---------- SECOND HALF ----------

      if (btts.secondHalf) {
        category.secondHalfBTTS++;
      } else {
        category.secondHalfNoBTTS++;
      }

      // ---------- SEQUENCES ----------

      category.sequence.push(btts.match);

      category.firstHalfSequence.push(
        btts.firstHalf,
      );

      category.secondHalfSequence.push(
        btts.secondHalf,
      );

    });

  });

  // -----------------------------
  // FILTER + PERCENTAGES
  // -----------------------------

  const result: BTTSCategoryResultsMap = {};

  Object.entries(categories).forEach(([level, category]) => {

    if (category.matches < MIN_CATEGORY_MATCHES) {
      return;
    }

    result[level] = {
      ...category,

      BTTSPercent:
        category.BTTS / category.matches * 100,

      noBTTSPercent:
        category.noBTTS / category.matches * 100,

      firstHalfBTTSPercent:
        category.firstHalfBTTS /
        category.matches *
        100,

      firstHalfNoBTTSPercent:
        category.firstHalfNoBTTS /
        category.matches *
        100,

      secondHalfBTTSPercent:
        category.secondHalfBTTS /
        category.matches *
        100,

      secondHalfNoBTTSPercent:
        category.secondHalfNoBTTS /
        category.matches *
        100,
    };

  });

  return result;

};