export interface TeamLevels {
  homeTeamLevel: string;
  awayTeamLevel: string;
}

export interface MatchGoals {
  homeGoals: number;
  awayGoals: number;
}

export interface TeamsConcededGoals {
  homeTeamConcededGoals: number;
  awayTeamConcededGoals: number;
}

export type TeamResult = "WIN" | "DRAW" | "LOSS";

export interface MatchResultForTwoTeams {
  resultForHomeTeam: TeamResult;
  resultForAwayTeam: TeamResult;
}

export interface CategoryResults {
  matches: number;

  wins: number;
  draws: number;
  losses: number;

  averageGoalsScored: number;
  averageGoalsConceded: number;

  firstHalfWins: number;
  firstHalfDraws: number;
  firstHalfLosses: number;

  secondHalfWins: number;
  secondHalfDraws: number;
  secondHalfLosses: number;
}

export type CategoryResultsMap = Record<string, CategoryResults>;


export interface BTTSForPeriod {
    match: boolean,
    firstHalf: boolean,
    secondHalf: boolean,
}
