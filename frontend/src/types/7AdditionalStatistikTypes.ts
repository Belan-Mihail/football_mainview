export interface AdditionalStatResult {
  total: number;

  home: number;
  away: number;

  homeWins: number;
  awayWins: number;

  homeMatchWins: number;
  awayMatchWins: number;

  winnerMatchWins: number;

  average: number;
  homeAverage: number;
  awayAverage: number;

  homeWinPercent: number;
  awayWinPercent: number;

  homeMatchWinPercent: number;
  awayMatchWinPercent: number;

  winnerMatchWinPercent: number;
}


export interface AdditionalStatsGeneralResults {
  matchesPlayed: number;

  corners: AdditionalStatResult;

  shots: AdditionalStatResult;

  shotsOnTarget: AdditionalStatResult;

  yellowCards: AdditionalStatResult;

  xg: AdditionalStatResult;
}

export interface AdditionalCategoryStatResult {
  total: number;
  average: number;
  statWinPercent: number;
  statAndMatchWinPercent: number;
}

export interface AdditionalCategoryResult {
  matches: number;
  corners: AdditionalCategoryStatResult;
  shots: AdditionalCategoryStatResult;
  shotsOnTarget: AdditionalCategoryStatResult;
  yellowCards: AdditionalCategoryStatResult;
  xg: AdditionalCategoryStatResult;
}

export interface FullTeamStats {
  corners: number;
  shots: number;
  shotsOT: number;
  xG: string;
  yellowCards: number;

  winByCorners: boolean;
  winByShots: boolean;
  winByShotsOT: boolean;
  winByYellowCards: boolean;
  winByXg: boolean;

  winByCornersAndMatch: boolean;
  winByShotsAndMatch: boolean;
  winByShotsOTAndMatch: boolean;
  winByYellowCardsAndMatch: boolean;
  winByXgAndMatch: boolean;
}

export interface AdditionalCategoryResults {
  matches: number;

  totalCorners: number;
  totalShots: number;
  totalShotsOT: number;
  totalYellowCards: number;
  totalXG: number;

  winByCorners: number;
  winByShots: number;
  winByShotsOT: number;
  winByYellowCards: number;
  winByXG: number;

  winByCornersAndMatch: number;
  winByShotsAndMatch: number;
  winByShotsOTAndMatch: number;
  winByYellowCardsAndMatch: number;
  winByXGAndMatch: number;

  cornersAverage: number;
  shotsAverage: number;
  shotsOTAverage: number;
  yellowCardsAverage: number;
  xGAverage: number;

  winByCornersPercent: number;
  winByShotsPercent: number;
  winByShotsOTPercent: number;
  winByYellowCardsPercent: number;
  winByXGPercent: number;

  winByCornersAndMatchPercent: number;
  winByShotsAndMatchPercent: number;
  winByShotsOTAndMatchPercent: number;
  winByYellowCardsAndMatchPercent: number;
  winByXGAndMatchPercent: number;
}

export type AdditionalCategoryResultsMap = Record<
  string,
  AdditionalCategoryResults
>;

export interface FavoriteAdditionalStats {
  favoriteAdditionalStats: FullTeamStats;
  nonfavoriteAdditionalStats: FullTeamStats;
  strongFavoriteAdditionalStats?: FullTeamStats;
}