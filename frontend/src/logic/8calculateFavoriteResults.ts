import type { Match } from "../types/football";
import type {
  FavoriteMode,
  GeneralResults,
  FavoriteGroupResults,
  FavoriteResults,
} from "../types/2GeneralResults";

import {
  getFavoriteResult,
  getFavoriteResultSequence,
  getLastMatches,
  getScoredConcededGoalsByFavorite,
  hasOdds,
  isStrongFavorite,
} from "../utils/matchUtils";

const calculateFavoriteGroup = (
  matches: Match[],
  mode: FavoriteMode,
  lastMatchesCount: number,
): GeneralResults => {
  const matchesPlayed = matches.length;

  const lastMatches = getLastMatches(matches, lastMatchesCount);

  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;

  let totalGoalsScored = 0;
  let totalGoalsConceded = 0;

  let firstHalfHomeWins = 0;
  let firstHalfDraws = 0;
  let firstHalfAwayWins = 0;

  let secondHalfHomeWins = 0;
  let secondHalfDraws = 0;
  let secondHalfAwayWins = 0;

  matches.forEach((match) => {
    const matchResult = getFavoriteResult(match, mode, "MATCH");

    const firstHalfResult = getFavoriteResult(match, mode, "FIRST_HALF");

    const secondHalfResult = getFavoriteResult(match, mode, "SECOND_HALF");

    const matchGoals = getScoredConcededGoalsByFavorite(match);

    if (mode === "FAVORITE") {
      totalGoalsScored += matchGoals.favoriteScoredGoals;
      totalGoalsConceded += matchGoals.favoriteConcededGoals;
    } else {
      totalGoalsScored += matchGoals.nonFavoriteScoredGoals;
      totalGoalsConceded += matchGoals.nonFavoriteConcededGoals;
    }

    switch (matchResult) {
      case "WIN":
        homeWins++;
        break;

      case "DRAW":
        draws++;
        break;

      case "LOSS":
        awayWins++;
        break;
    }

    switch (firstHalfResult) {
      case "WIN":
        firstHalfHomeWins++;
        break;

      case "DRAW":
        firstHalfDraws++;
        break;

      case "LOSS":
        firstHalfAwayWins++;
        break;
    }

    switch (secondHalfResult) {
      case "WIN":
        secondHalfHomeWins++;
        break;

      case "DRAW":
        secondHalfDraws++;
        break;

      case "LOSS":
        secondHalfAwayWins++;
        break;
    }
  });

  return {
    matchesPlayed,

    homeWins,
    draws,
    awayWins,

    homeWinsPercent: matchesPlayed > 0 ? (homeWins / matchesPlayed) * 100 : 0,

    drawsPercent: matchesPlayed > 0 ? (draws / matchesPlayed) * 100 : 0,

    awayWinsPercent: matchesPlayed > 0 ? (awayWins / matchesPlayed) * 100 : 0,

    averageGoalsScored:
      matchesPlayed > 0 ? totalGoalsScored / matchesPlayed : 0,

    averageGoalsConceded:
      matchesPlayed > 0 ? totalGoalsConceded / matchesPlayed : 0,

    firstHalfHomeWins,
    firstHalfDraws,
    firstHalfAwayWins,

    firstHalfHomeWinsPercent:
      matchesPlayed > 0 ? (firstHalfHomeWins / matchesPlayed) * 100 : 0,

    firstHalfDrawsPercent:
      matchesPlayed > 0 ? (firstHalfDraws / matchesPlayed) * 100 : 0,

    firstHalfAwayWinsPercent:
      matchesPlayed > 0 ? (firstHalfAwayWins / matchesPlayed) * 100 : 0,

    secondHalfHomeWins,
    secondHalfDraws,
    secondHalfAwayWins,

    secondHalfHomeWinsPercent:
      matchesPlayed > 0 ? (secondHalfHomeWins / matchesPlayed) * 100 : 0,

    secondHalfDrawsPercent:
      matchesPlayed > 0 ? (secondHalfDraws / matchesPlayed) * 100 : 0,

    secondHalfAwayWinsPercent:
      matchesPlayed > 0 ? (secondHalfAwayWins / matchesPlayed) * 100 : 0,

    currentForm: getFavoriteResultSequence(lastMatches, mode, "MATCH"),

    firstHalfForm: getFavoriteResultSequence(lastMatches, mode, "FIRST_HALF"),

    secondHalfForm: getFavoriteResultSequence(lastMatches, mode, "SECOND_HALF"),
  };
};

export const calculateFavoriteResults = (
  matches: Match[],
  lastMatchesCount = 20,
): FavoriteResults => {
  const favoriteMatches = matches.filter(hasOdds);

  const strongFavoriteMatches = favoriteMatches.filter(isStrongFavorite);

  return {
    favorites: calculateFavoriteGroup(
      favoriteMatches,
      "FAVORITE",
      lastMatchesCount,
    ),

    underdogs: calculateFavoriteGroup(
      favoriteMatches,
      "NON_FAVORITE",
      lastMatchesCount,
    ),

    strongFavorites: calculateFavoriteGroup(
      strongFavoriteMatches,
      "FAVORITE",
      lastMatchesCount,
    ),
  };
};
