export type MatchResultType = "HOME" | "DRAW" | "AWAY";
export type MatchOutcome = "WIN" | "DRAW" | "LOSS";
export type FavoriteMode = "FAVORITE" | "NON_FAVORITE";

export interface GeneralResults {
    matchesPlayed: number;

    homeWins: number;
    draws: number;
    awayWins: number;

    averageGoalsScored: number;
    averageGoalsConceded: number;

    homeWinsPercent: number;
    drawsPercent: number;
    awayWinsPercent: number;

    firstHalfHomeWins: number;
    firstHalfDraws: number;
    firstHalfAwayWins: number;

    firstHalfHomeWinsPercent: number;
    firstHalfDrawsPercent: number;
    firstHalfAwayWinsPercent: number;

    secondHalfHomeWins: number;
    secondHalfDraws: number;
    secondHalfAwayWins: number;

    secondHalfHomeWinsPercent: number;
    secondHalfDrawsPercent: number;
    secondHalfAwayWinsPercent: number;

    currentForm: MatchResultType[];
    firstHalfForm: MatchResultType[];
    secondHalfForm: MatchResultType[];
}

export interface FavoriteGroupResults {
    matchesPlayed: number;

    homeWins: number;
    draws: number;
    awayWins: number;

    homeWinsPercent: number;
    drawsPercent: number;
    awayWinsPercent: number;

    firstHalfHomeWins: number;
    firstHalfDraws: number;
    firstHalfAwayWins: number;

    firstHalfHomeWinsPercent: number;
    firstHalfDrawsPercent: number;
    firstHalfAwayWinsPercent: number;

    secondHalfHomeWins: number;
    secondHalfDraws: number;
    secondHalfAwayWins: number;

    secondHalfHomeWinsPercent: number;
    secondHalfDrawsPercent: number;
    secondHalfAwayWinsPercent: number;

    currentForm: MatchOutcome[];
    firstHalfForm: MatchOutcome[];
    secondHalfForm: MatchOutcome[];
}

export interface FavoriteResults {
    favorites: FavoriteGroupResults;
    underdogs: FavoriteGroupResults;
    strongFavorites: FavoriteGroupResults;
}

export interface ScoredConcededGoalsByFavorite {
  favoriteScoredGoals: number;
  favoriteConcededGoals: number;
  nonFavoriteScoredGoals: number;
  nonFavoriteConcededGoals: number;
}