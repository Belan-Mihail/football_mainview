import type { Match } from "../types/football";
import type {
  CategoryResults,
  CategoryResultsMap,
} from "../types/categoryResults";

import { getTeamLevels } from "../utils/5defineTeamLevel";

import {
  getMatchGoals,
  getTeamsConcededGoals,
  getMatchResultForTwoTeams,
  getFirstHalfResultForTwoTeams,
  getSecondHalfResultForTwoTeams,
} from "../utils/matchUtils";

const MIN_CATEGORY_MATCHES = 3;

export const calculateCategoryResults = (
  matches: Match[],
): CategoryResultsMap => {
  const categories: CategoryResultsMap = {};

  matches.forEach((match) => {
    const teamLevels = getTeamLevels(match);

    const matchGoals = getMatchGoals(match);

    const concededGoals = getTeamsConcededGoals(match);

    const matchResults = getMatchResultForTwoTeams(match);

    const firstHalfResults = getFirstHalfResultForTwoTeams(match);

    const secondHalfResults = getSecondHalfResultForTwoTeams(match);

    // -----------------------------
    // HOME TEAM
    // -----------------------------

    const homeCategory = teamLevels.homeTeamLevel;

    if (!categories[homeCategory]) {
      categories[homeCategory] = {
        matches: 0,

        wins: 0,
        draws: 0,
        losses: 0,

        averageGoalsScored: 0,
        averageGoalsConceded: 0,

        firstHalfWins: 0,
        firstHalfDraws: 0,
        firstHalfLosses: 0,

        secondHalfWins: 0,
        secondHalfDraws: 0,
        secondHalfLosses: 0,
      };
    }

    categories[homeCategory].matches++;

    categories[homeCategory].averageGoalsScored += matchGoals.homeGoals;

    categories[homeCategory].averageGoalsConceded +=
      concededGoals.homeTeamConcededGoals;

    // Full match result
    if (matchResults.resultForHomeTeam === "WIN") {
      categories[homeCategory].wins++;
    }

    if (matchResults.resultForHomeTeam === "DRAW") {
      categories[homeCategory].draws++;
    }

    if (matchResults.resultForHomeTeam === "LOSS") {
      categories[homeCategory].losses++;
    }

    // First half
    if (firstHalfResults.resultForHomeTeam === "WIN") {
      categories[homeCategory].firstHalfWins++;
    }

    if (firstHalfResults.resultForHomeTeam === "DRAW") {
      categories[homeCategory].firstHalfDraws++;
    }

    if (firstHalfResults.resultForHomeTeam === "LOSS") {
      categories[homeCategory].firstHalfLosses++;
    }

    // Second half
    if (secondHalfResults.resultForHomeTeam === "WIN") {
      categories[homeCategory].secondHalfWins++;
    }

    if (secondHalfResults.resultForHomeTeam === "DRAW") {
      categories[homeCategory].secondHalfDraws++;
    }

    if (secondHalfResults.resultForHomeTeam === "LOSS") {
      categories[homeCategory].secondHalfLosses++;
    }

    // -----------------------------
    // AWAY TEAM
    // -----------------------------

    const awayCategory = teamLevels.awayTeamLevel;

    if (!categories[awayCategory]) {
      categories[awayCategory] = {
        matches: 0,

        wins: 0,
        draws: 0,
        losses: 0,

        averageGoalsScored: 0,
        averageGoalsConceded: 0,

        firstHalfWins: 0,
        firstHalfDraws: 0,
        firstHalfLosses: 0,

        secondHalfWins: 0,
        secondHalfDraws: 0,
        secondHalfLosses: 0,
      };
    }

    categories[awayCategory].matches++;

    categories[awayCategory].averageGoalsScored += matchGoals.awayGoals;

    categories[awayCategory].averageGoalsConceded +=
      concededGoals.awayTeamConcededGoals;

    // Full match result
    if (matchResults.resultForAwayTeam === "WIN") {
      categories[awayCategory].wins++;
    }

    if (matchResults.resultForAwayTeam === "DRAW") {
      categories[awayCategory].draws++;
    }

    if (matchResults.resultForAwayTeam === "LOSS") {
      categories[awayCategory].losses++;
    }

    // First half
    if (firstHalfResults.resultForAwayTeam === "WIN") {
      categories[awayCategory].firstHalfWins++;
    }

    if (firstHalfResults.resultForAwayTeam === "DRAW") {
      categories[awayCategory].firstHalfDraws++;
    }

    if (firstHalfResults.resultForAwayTeam === "LOSS") {
      categories[awayCategory].firstHalfLosses++;
    }

    // Second half
    if (secondHalfResults.resultForAwayTeam === "WIN") {
      categories[awayCategory].secondHalfWins++;
    }

    if (secondHalfResults.resultForAwayTeam === "DRAW") {
      categories[awayCategory].secondHalfDraws++;
    }

    if (secondHalfResults.resultForAwayTeam === "LOSS") {
      categories[awayCategory].secondHalfLosses++;
    }
  });

  // -----------------------------
  // AVERAGES
  // -----------------------------

  Object.values(categories).forEach((category) => {
    category.averageGoalsScored =
      category.averageGoalsScored / category.matches;

    category.averageGoalsConceded =
      category.averageGoalsConceded / category.matches;
  });

  // -----------------------------
  // FILTER CATEGORIES
  // -----------------------------

  const filteredCategories: CategoryResultsMap = {};

  Object.entries(categories).forEach(([category, results]) => {
    if (results.matches >= MIN_CATEGORY_MATCHES) {
      filteredCategories[category] = results;
    }
  });

  return filteredCategories;
};