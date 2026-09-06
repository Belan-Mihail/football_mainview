import type { Match } from "./football";


export interface GeneralStatistics {
    matchesPlayed: number;

    totalGoals: number;
    totalHomeGoals: number;
    totalAwayGoals: number;

    averageGoals: number;
    averageHomeGoals: number;
    averageAwayGoals: number;

    averageFirstHalfGoals: number;
    averageSecondHalfGoals: number;
    averageHomeTeamFirstHalfGoals: number;
    averageHomeTeamSecondHalfGoals: number;
    averageAwayTeamFirstHalfGoals: number;
    averageAwayTeamSecondHalfGoals: number;

    homeWinsPercent: number;
    drawsPercent: number;
    awayWinsPercent: number;

    bothTeamsToScorePercent: number;
    noBothTeamsToScorePercent: number;

    over15Percent: number;
    over25Percent: number;
    over35Percent: number;

    homeCleanSheetsPercent: number;
    awayCleanSheetsPercent: number;

    biggestHomeWin: Match | null;
    biggestAwayWin: Match | null;
    highestScoringMatch: Match | null;

totalFirstHalfGoals: number;
totalSecondHalfGoals: number;
totalHomeTeamFirstHalfGoals: number;
totalHomeTeamSecondHalfGoals: number;
totalAwayTeamFirstHalfGoals: number;
totalAwayTeamSecondHalfGoals: number;
totalGoalsTill15Min: number;
totalGoalsFrom16Till30Min: number;
totalGoalsFrom31Till45Min: number;
totalGoalsFrom46Till60Min: number;
totalGoalsFrom61Till75Min: number;
totalGoalsAfter75Min: number;
totalHomeTeamGoalsTill15Min: number;
totalHomeTeamGoalsFrom16Till30Min: number;
totalHomeTeamGoalsFrom31Till45Min: number;
totalHomeTeamGoalsFrom46Till60Min: number;
totalHomeTeamGoalsFrom61Till75Min: number;
totalHomeTeamGoalsAfter75Min: number;
totalAwayTeamGoalsTill15Min: number;
totalAwayTeamGoalsFrom16Till30Min: number;
totalAwayTeamGoalsFrom31Till45Min: number;
totalAwayTeamGoalsFrom46Till60Min: number;
totalAwayTeamGoalsFrom61Till75Min: number;
totalAwayTeamGoalsAfter75Min: number;
}

export type GamePeriods = 15 | 30 | 45 | 60 | 75 | 90;

export type TeamSide = "HOME" | "AWAY";