import type { Match } from "../types/football";

import {
  awayWinByStats,
  getAwayStats,
  getHomeStats,
  homeWinByStats,
  winByStatAndMatch,
  winByStatAndMatchWithoutSide,
} from "../utils/additionalStatsUtils";

import type {
  AdditionalStatResult,
  AdditionalStatsGeneralResults,
  MatchStat,
} from "../types/7AdditionalStatistikTypes";


const calculateStat = (
  matches: Match[],
  statsType: MatchStat,
): AdditionalStatResult => {
  let total = 0;

  let home = 0;
  let away = 0;

  let homeWins = 0;
  let awayWins = 0;

  let homeMatchWins = 0;
  let awayMatchWins = 0;

  let winnerMatchWins = 0;

  matches.forEach((match) => {
    const homeStats = getHomeStats(match, statsType);
    const awayStats = getAwayStats(match, statsType);

    if (homeStats === undefined || awayStats === undefined) {
      return;
    }

    total += homeStats + awayStats;

    home += homeStats;
    away += awayStats;

    if (homeWinByStats(match, statsType)) {
      homeWins++;
    }

    if (awayWinByStats(match, statsType)) {
      awayWins++;
    }

    if (winByStatAndMatch(match, statsType, "HOME")) {
      homeMatchWins++;
    }

    if (winByStatAndMatch(match, statsType, "AWAY")) {
      awayMatchWins++;
    }

    if (winByStatAndMatchWithoutSide(match, statsType)) {
      winnerMatchWins++;
    }
  });

  const matchesWithStats = matches.filter((match) => {
    const homeStats = getHomeStats(match, statsType);
    const awayStats = getAwayStats(match, statsType);

    return homeStats !== undefined && awayStats !== undefined;
  }).length;


  const average =
    matchesWithStats > 0
      ? total / matchesWithStats
      : 0;

  const homeAverage =
    matchesWithStats > 0
      ? home / matchesWithStats
      : 0;

  const awayAverage =
    matchesWithStats > 0
      ? away / matchesWithStats
      : 0;


  const homeWinPercent =
    matchesWithStats > 0
      ? (homeWins / matchesWithStats) * 100
      : 0;

  const awayWinPercent =
    matchesWithStats > 0
      ? (awayWins / matchesWithStats) * 100
      : 0;


  const homeMatchWinPercent =
    matchesWithStats > 0
      ? (homeMatchWins / matchesWithStats) * 100
      : 0;

  const awayMatchWinPercent =
    matchesWithStats > 0
      ? (awayMatchWins / matchesWithStats) * 100
      : 0;

  const winnerMatchWinPercent =
    matchesWithStats > 0
      ? (winnerMatchWins / matchesWithStats) * 100
      : 0;


  return {
    total,

    home,
    away,

    homeWins,
    awayWins,

    homeMatchWins,
    awayMatchWins,

    winnerMatchWins,

    average,
    homeAverage,
    awayAverage,

    homeWinPercent,
    awayWinPercent,

    homeMatchWinPercent,
    awayMatchWinPercent,

    winnerMatchWinPercent,
  };
};


export const calculateAdditionalStatsGeneralResults = (
  matches: Match[],
): AdditionalStatsGeneralResults => {

  return {
    matchesPlayed: matches.length,

    corners: calculateStat(matches, "corners"),

    shots: calculateStat(matches, "shots"),

    shotsOnTarget: calculateStat(
      matches,
      "shots_on_target",
    ),

    yellowCards: calculateStat(
      matches,
      "yellow_cards",
    ),

    xg: calculateStat(
      matches,
      "xg",
    ),
  };
};