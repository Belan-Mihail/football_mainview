import type { Match } from "../types/football";
import type { TeamSide } from "../types/1GeneralStatistics";
import { getFavoriteSide, getMatchResult, isStrongFavorite } from "./matchUtils";
import type { FavoriteAdditionalStats, FullTeamStats } from "../types/7AdditionalStatistikTypes";

export type MatchStat =
  | "corners"
  | "shots"
  | "shots_on_target"
  | "yellow_cards"
  | "red_cards"
  | "xg";


export const getHomeStats = (
  match: Match,
  statsType: MatchStat
): number | undefined => {
  const stats = match.stats;

  if (!stats) {
    return undefined;
  }

  switch (statsType) {
    case "corners":
      return stats.home_corners;

    case "shots":
      return stats.home_shots;

    case "shots_on_target":
      return stats.home_shots_on_target;

    case "yellow_cards":
      return stats.home_yellow_cards;

    case "red_cards":
      return stats.home_red_cards;

    case "xg":
      return Number(stats.home_xg);

    default:
      return undefined;
  }
};


export const getAwayStats = (
  match: Match,
  statsType: MatchStat
): number | undefined => {
  const stats = match.stats;

  if (!stats) {
    return undefined;
  }

  switch (statsType) {
    case "corners":
      return stats.away_corners;

    case "shots":
      return stats.away_shots;

    case "shots_on_target":
      return stats.away_shots_on_target;

    case "yellow_cards":
      return stats.away_yellow_cards;

    case "red_cards":
      return stats.away_red_cards;

    case "xg":
      return Number(stats.away_xg);

    default:
      return undefined;
  }
};


export const homeWinByStats = (
  match: Match,
  statsType: MatchStat
): boolean => {
  const homeStats = getHomeStats(match, statsType);
  const awayStats = getAwayStats(match, statsType);

  if (homeStats === undefined || awayStats === undefined) {
    return false;
  }

  return homeStats > awayStats;
};


export const awayWinByStats = (
  match: Match,
  statsType: MatchStat
): boolean => {
  const homeStats = getHomeStats(match, statsType);
  const awayStats = getAwayStats(match, statsType);

  if (homeStats === undefined || awayStats === undefined) {
    return false;
  }

  return awayStats > homeStats;
};


export const getStatsWinnerSide = (
  match: Match,
  statsType: MatchStat
): "HOME" | "AWAY" | "DRAW" | undefined => {
  const homeStats = getHomeStats(match, statsType);
  const awayStats = getAwayStats(match, statsType);

  if (homeStats === undefined || awayStats === undefined) {
    return undefined;
  }

  if (homeStats > awayStats) {
    return "HOME";
  }

  if (homeStats < awayStats) {
    return "AWAY";
  }

  return "DRAW";
};


export const winByStatAndMatch = (
  match: Match,
  statsType: MatchStat,
  side: TeamSide
): boolean => {
  const matchResult = getMatchResult(match);
  const statsWinner = getStatsWinnerSide(match, statsType);

  if (!statsWinner) {
    return false;
  }

  return (
    matchResult === side &&
    statsWinner === side
  );
};

export const winByStatAndMatchWithoutSide = (
  match: Match,
  statsType: MatchStat,
): boolean => {
  const matchResult = getMatchResult(match);
  const statsWinner = getStatsWinnerSide(match, statsType);

  return (
    matchResult === statsWinner
  );
};


export const getFullHomeStats = (
  match: Match,
): FullTeamStats => {
  const stats = match.stats;

  return {
    corners: stats?.home_corners,
    shots: stats?.home_shots,
    shotsOT: stats?.home_shots_on_target,
    xG: stats?.home_xg,
    yellowCards: stats?.home_yellow_cards,
    winByCorners: stats?.home_corners > stats?.away_corners,
    winByShots: stats?.home_shots > stats?.away_shots,
    winByShotsOT: stats?.home_shots_on_target > stats?.away_shots_on_target,
    winByYellowCards: stats?.home_yellow_cards > stats?.away_yellow_cards,
    winByXg: Number(stats?.home_xg) > Number(stats?.away_xg),
    winByCornersAndMatch: (stats?.home_corners > stats?.away_corners) && (getMatchResult(match) == "HOME"),
    winByShotsAndMatch: (stats?.home_shots > stats?.away_shots) && (getMatchResult(match) == "HOME"),
    winByShotsOTAndMatch: (stats?.home_shots_on_target > stats?.away_shots_on_target) && (getMatchResult(match) == "HOME"),
    winByYellowCardsAndMatch: (stats?.home_yellow_cards > stats?.away_yellow_cards) && (getMatchResult(match) == "HOME"),
    winByXgAndMatch: (Number(stats?.home_xg) > Number(stats?.away_xg)) && (getMatchResult(match) == "HOME"),

  }
};


export const getFullAwayStats = (
  match: Match,
): FullTeamStats => {
  const stats = match.stats;

  return {
    corners: stats?.away_corners,
    shots: stats?.away_shots,
    shotsOT: stats?.away_shots_on_target,
    xG: stats?.away_xg,
    yellowCards: stats?.away_yellow_cards,
    winByCorners: stats?.home_corners < stats?.away_corners,
    winByShots: stats?.home_shots < stats?.away_shots,
    winByShotsOT: stats?.home_shots_on_target < stats?.away_shots_on_target,
    winByYellowCards: stats?.home_yellow_cards < stats?.away_yellow_cards,
    winByXg: Number(stats?.home_xg) < Number(stats?.away_xg),
    winByCornersAndMatch: (stats?.home_corners < stats?.away_corners) && (getMatchResult(match) == "AWAY"),
    winByShotsAndMatch: (stats?.home_shots < stats?.away_shots) && (getMatchResult(match) == "AWAY"),
    winByShotsOTAndMatch: (stats?.home_shots_on_target < stats?.away_shots_on_target) && (getMatchResult(match) == "AWAY"),
    winByYellowCardsAndMatch: (stats?.home_yellow_cards < stats?.away_yellow_cards) && (getMatchResult(match) == "AWAY"),
    winByXgAndMatch: (Number(stats?.home_xg) < Number(stats?.away_xg)) && (getMatchResult(match) == "AWAY"),

  }
};

export const getFavoriteAdditionalStats = (
  match: Match,
): FavoriteAdditionalStats => {
  const favoriteSide = getFavoriteSide(match);
  const strongFavorite = isStrongFavorite(match);

  const favoriteAdditionalStats = favoriteSide === "HOME" ? getFullHomeStats(match) : getFullAwayStats(match);
  const nonfavoriteAdditionalStats = favoriteSide === "HOME" ? getFullAwayStats(match) : getFullHomeStats(match);
  let strongFavoriteAdditionalStats;

  if (strongFavorite) {
    strongFavoriteAdditionalStats = favoriteAdditionalStats;
  }


  return {
    favoriteAdditionalStats,
    nonfavoriteAdditionalStats,
    strongFavoriteAdditionalStats

  };
};