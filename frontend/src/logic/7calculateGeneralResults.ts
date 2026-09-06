import type { GeneralResults } from "../types/2GeneralResults";
import type { Match } from "../types/football";

import {
  getFirstHalfResult,
  getFirstHalfResultSequence,
  getLastMatches,
  getMatchResult,
  getMatchResultSequence,
  getSecondHalfResult,
  getSecondHalfResultSequence,
} from "../utils/matchUtils";

export const calculateGeneralResults = (
  matches: Match[],
  lastMatchesCount = 20,
): GeneralResults => {
  const matchesPlayed = matches.length;

  const lastMatches = getLastMatches(matches, lastMatchesCount);

  let homeWins = 0;
  let draws = 0;
  let awayWins = 0;

  let firstHalfHomeWins = 0;
  let firstHalfDraws = 0;
  let firstHalfAwayWins = 0;

  let secondHalfHomeWins = 0;
  let secondHalfDraws = 0;
  let secondHalfAwayWins = 0;

  matches.forEach((match) => {
    const resultMatch = getMatchResult(match);
    const resultFirstTime = getFirstHalfResult(match);
    const resultSecondTime = getSecondHalfResult(match);

    if (resultMatch === "HOME") {
      homeWins++;
    } else if (resultMatch === "AWAY") {
      awayWins++;
    } else {
      draws++;
    }

    if (resultFirstTime === "HOME") {
      firstHalfHomeWins++;
    } else if (resultFirstTime === "AWAY") {
      firstHalfAwayWins++;
    } else {
      firstHalfDraws++;
    }

    if (resultSecondTime === "HOME") {
      secondHalfHomeWins++;
    } else if (resultSecondTime === "AWAY") {
      secondHalfAwayWins++;
    } else {
      secondHalfDraws++;
    }
  });

  const homeWinsPercent =
  matchesPlayed > 0 ? (homeWins / matchesPlayed) * 100 : 0;

const drawsPercent =
  matchesPlayed > 0 ? (draws / matchesPlayed) * 100 : 0;

const awayWinsPercent =
  matchesPlayed > 0 ? (awayWins / matchesPlayed) * 100 : 0;

  const firstHalfHomeWinsPercent =
    matchesPlayed > 0 ? (firstHalfHomeWins / matchesPlayed) * 100 : 0;

  const firstHalfDrawsPercent =
    matchesPlayed > 0 ? (firstHalfDraws / matchesPlayed) * 100 : 0;

  const firstHalfAwayWinsPercent =
    matchesPlayed > 0 ? (firstHalfAwayWins / matchesPlayed) * 100 : 0;

  const secondHalfHomeWinsPercent =
    matchesPlayed > 0 ? (secondHalfHomeWins / matchesPlayed) * 100 : 0;

  const secondHalfDrawsPercent =
    matchesPlayed > 0 ? (secondHalfDraws / matchesPlayed) * 100 : 0;

  const secondHalfAwayWinsPercent =
    matchesPlayed > 0 ? (secondHalfAwayWins / matchesPlayed) * 100 : 0;

  return {
    matchesPlayed,

    homeWins,
    draws,
    awayWins,

    homeWinsPercent,
    drawsPercent,
    awayWinsPercent,

    firstHalfHomeWins,
    firstHalfDraws,
    firstHalfAwayWins,

    firstHalfHomeWinsPercent,
    firstHalfDrawsPercent,
    firstHalfAwayWinsPercent,

    secondHalfHomeWins,
    secondHalfDraws,
    secondHalfAwayWins,

    secondHalfHomeWinsPercent,
    secondHalfDrawsPercent,
    secondHalfAwayWinsPercent,

    currentForm: getMatchResultSequence(lastMatches),

    firstHalfForm: getFirstHalfResultSequence(lastMatches),

    secondHalfForm: getSecondHalfResultSequence(lastMatches),
  };
};
