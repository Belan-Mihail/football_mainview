import type { GeneralStatistics } from "../types/1GeneralStatistics";
import type { Match } from "../types/football";

import {
  getAwayGoals,
  getAwayTeamFirstHalfGoals,
  getAwayTeamSecondHalfGoals,
  getFirstHalfGoals,
  getGoalDifference,
  getGoalInPeriod,
  getHomeGoals,
  getHomeTeamFirstHalfGoals,
  getHomeTeamSecondHalfGoals,
  getMatchResult,
  getSecondHalfGoals,
  getTotalGoals,
  hasAwayCleanSheet,
  hasHomeCleanSheet,
  isBTTS,
  isOver,
} from "../utils/matchUtils";

export const calculateGeneralStatistics = (
  matches: Match[]
): GeneralStatistics => {
  const matchesPlayed = matches.length;

  let totalGoals = 0;
  let totalHomeGoals = 0;
  let totalAwayGoals = 0;
  let totalFirstHalfGoals = 0;
  let totalSecondHalfGoals = 0;
  let totalHomeTeamFirstHalfGoals = 0;
  let totalHomeTeamSecondHalfGoals = 0;
  let totalAwayTeamFirstHalfGoals = 0;
  let totalAwayTeamSecondHalfGoals = 0;
  let totalGoalsTill15Min = 0;
  let totalGoalsFrom16Till30Min = 0;
  let totalGoalsFrom31Till45Min = 0;
  let totalGoalsFrom46Till60Min = 0;
  let totalGoalsFrom61Till75Min = 0;
  let totalGoalsAfter75Min = 0;
  let totalHomeTeamGoalsTill15Min = 0;
  let totalHomeTeamGoalsFrom16Till30Min = 0;
  let totalHomeTeamGoalsFrom31Till45Min = 0;
  let totalHomeTeamGoalsFrom46Till60Min = 0;
  let totalHomeTeamGoalsFrom61Till75Min = 0;
  let totalHomeTeamGoalsAfter75Min = 0;
  let totalAwayTeamGoalsTill15Min = 0;
  let totalAwayTeamGoalsFrom16Till30Min = 0;
  let totalAwayTeamGoalsFrom31Till45Min = 0;
  let totalAwayTeamGoalsFrom46Till60Min = 0;
  let totalAwayTeamGoalsFrom61Till75Min = 0;
  let totalAwayTeamGoalsAfter75Min = 0;


  let homeWinsCount = 0;
  let drawsCount = 0;
  let awayWinsCount = 0;

  let bothTeamsToScoreCount = 0;

  let over15Count = 0;
  let over25Count = 0;
  let over35Count = 0;

  let homeCleanSheetsCount = 0;
  let awayCleanSheetsCount = 0;

  let biggestHomeWin: Match | null = null;
  let biggestAwayWin: Match | null = null;
  let highestScoringMatch: Match | null = null;

  matches.forEach((match) => {
    const homeGoals = getHomeGoals(match);
    const awayGoals = getAwayGoals(match);
    const totalGoalsInMatch = getTotalGoals(match);
    

    const result = getMatchResult(match);
    const goalDifference = getGoalDifference(match);

    totalGoals += totalGoalsInMatch;
    totalHomeGoals += homeGoals;
    totalAwayGoals += awayGoals;
    totalFirstHalfGoals += getFirstHalfGoals(match);
    totalSecondHalfGoals += getSecondHalfGoals(match);
    totalHomeTeamFirstHalfGoals += getHomeTeamFirstHalfGoals(match);
    totalHomeTeamSecondHalfGoals += getHomeTeamSecondHalfGoals(match);
    totalAwayTeamFirstHalfGoals += getAwayTeamFirstHalfGoals(match);
    totalAwayTeamSecondHalfGoals += getAwayTeamSecondHalfGoals(match);
    totalGoalsTill15Min += getGoalInPeriod(match, 15, null);
    totalGoalsFrom16Till30Min += getGoalInPeriod(match, 30, null);
    totalGoalsFrom31Till45Min += getGoalInPeriod(match, 45, null);
    totalGoalsFrom46Till60Min += getGoalInPeriod(match, 60, null);
    totalGoalsFrom61Till75Min += getGoalInPeriod(match, 75, null);
    totalGoalsAfter75Min += getGoalInPeriod(match, 90, null);
    totalHomeTeamGoalsTill15Min += getGoalInPeriod(match, 15, "HOME");
    totalHomeTeamGoalsFrom16Till30Min += getGoalInPeriod(match, 30, "HOME");
    totalHomeTeamGoalsFrom31Till45Min += getGoalInPeriod(match, 45, "HOME");
    totalHomeTeamGoalsFrom46Till60Min += getGoalInPeriod(match, 60, "HOME");
    totalHomeTeamGoalsFrom61Till75Min += getGoalInPeriod(match, 75, "HOME");
    totalHomeTeamGoalsAfter75Min += getGoalInPeriod(match, 90, "HOME");
    totalAwayTeamGoalsTill15Min += getGoalInPeriod(match, 15, "AWAY");
    totalAwayTeamGoalsFrom16Till30Min += getGoalInPeriod(match, 30, "AWAY");
    totalAwayTeamGoalsFrom31Till45Min += getGoalInPeriod(match, 45, "AWAY");
    totalAwayTeamGoalsFrom46Till60Min += getGoalInPeriod(match, 60, "AWAY");
    totalAwayTeamGoalsFrom61Till75Min += getGoalInPeriod(match, 75, "AWAY");
    totalAwayTeamGoalsAfter75Min += getGoalInPeriod(match, 90, "AWAY");

    if (result === "HOME") {
      homeWinsCount++;

      if (
        biggestHomeWin === null ||
        goalDifference > getGoalDifference(biggestHomeWin)
      ) {
        biggestHomeWin = match;
      }
    } else if (result === "AWAY") {
      awayWinsCount++;

      if (
        biggestAwayWin === null ||
        goalDifference > getGoalDifference(biggestAwayWin)
      ) {
        biggestAwayWin = match;
      }
    } else {
      drawsCount++;
    }

    if (isBTTS(match)) {
      bothTeamsToScoreCount++;
    }

    if (isOver(match, 1.5)) {
      over15Count++;
    }

    if (isOver(match, 2.5)) {
      over25Count++;
    }

    if (isOver(match, 3.5)) {
      over35Count++;
    }

    if (hasHomeCleanSheet(match)) {
      homeCleanSheetsCount++;
    }

    if (hasAwayCleanSheet(match)) {
      awayCleanSheetsCount++;
    }

    if (
      highestScoringMatch === null ||
      totalGoalsInMatch > getTotalGoals(highestScoringMatch)
    ) {
      highestScoringMatch = match;
    }
  });

  const averageGoals =
    matchesPlayed > 0 ? totalGoals / matchesPlayed : 0;

  const averageHomeGoals =
    matchesPlayed > 0 ? totalHomeGoals / matchesPlayed : 0;

  const averageAwayGoals =
    matchesPlayed > 0 ? totalAwayGoals / matchesPlayed : 0;
  
  const averageFirstHalfGoals =
    matchesPlayed > 0 ? totalFirstHalfGoals / matchesPlayed : 0;
  
  const averageSecondHalfGoals =
    matchesPlayed > 0 ? totalSecondHalfGoals / matchesPlayed : 0;
  
  const averageHomeTeamFirstHalfGoals =
    matchesPlayed > 0 ? totalHomeTeamFirstHalfGoals / matchesPlayed : 0;
  
  const averageHomeTeamSecondHalfGoals =
    matchesPlayed > 0 ? totalHomeTeamSecondHalfGoals / matchesPlayed : 0;
  
  const averageAwayTeamFirstHalfGoals =
    matchesPlayed > 0 ? totalAwayTeamFirstHalfGoals / matchesPlayed : 0;
  
  const averageAwayTeamSecondHalfGoals =
    matchesPlayed > 0 ? totalAwayTeamSecondHalfGoals / matchesPlayed : 0;

  const homeWinsPercent =
    matchesPlayed > 0 ? (homeWinsCount / matchesPlayed) * 100 : 0;

  const drawsPercent =
    matchesPlayed > 0 ? (drawsCount / matchesPlayed) * 100 : 0;

  const awayWinsPercent =
    matchesPlayed > 0 ? (awayWinsCount / matchesPlayed) * 100 : 0;

  const bothTeamsToScorePercent =
    matchesPlayed > 0
      ? (bothTeamsToScoreCount / matchesPlayed) * 100
      : 0;
  
  const noBothTeamsToScorePercent =
    matchesPlayed > 0 ? 100 - bothTeamsToScorePercent : 0;

  const over15Percent =
    matchesPlayed > 0 ? (over15Count / matchesPlayed) * 100 : 0;

  const over25Percent =
    matchesPlayed > 0 ? (over25Count / matchesPlayed) * 100 : 0;

  const over35Percent =
    matchesPlayed > 0 ? (over35Count / matchesPlayed) * 100 : 0;

  const homeCleanSheetsPercent =
    matchesPlayed > 0
      ? (homeCleanSheetsCount / matchesPlayed) * 100
      : 0;

  const awayCleanSheetsPercent =
    matchesPlayed > 0
      ? (awayCleanSheetsCount / matchesPlayed) * 100
      : 0;

  return {
    matchesPlayed,

    totalGoals,
    totalHomeGoals,
    totalAwayGoals,

    averageGoals,
    averageHomeGoals,
    averageAwayGoals,
    averageFirstHalfGoals,
    averageSecondHalfGoals,
averageHomeTeamFirstHalfGoals,
averageHomeTeamSecondHalfGoals,
averageAwayTeamFirstHalfGoals,
averageAwayTeamSecondHalfGoals,

    homeWinsPercent,
    drawsPercent,
    awayWinsPercent,

    bothTeamsToScorePercent,
    noBothTeamsToScorePercent,

    over15Percent,
    over25Percent,
    over35Percent,
    

    homeCleanSheetsPercent,
    awayCleanSheetsPercent,

    biggestHomeWin,
    biggestAwayWin,
    highestScoringMatch,


totalFirstHalfGoals,
totalSecondHalfGoals,
totalHomeTeamFirstHalfGoals,
totalHomeTeamSecondHalfGoals,
totalAwayTeamFirstHalfGoals,
totalAwayTeamSecondHalfGoals,
totalGoalsTill15Min,
totalGoalsFrom16Till30Min,
totalGoalsFrom31Till45Min,
totalGoalsFrom46Till60Min,
totalGoalsFrom61Till75Min,
totalGoalsAfter75Min,
totalHomeTeamGoalsTill15Min,
totalHomeTeamGoalsFrom16Till30Min,
totalHomeTeamGoalsFrom31Till45Min,
totalHomeTeamGoalsFrom46Till60Min,
totalHomeTeamGoalsFrom61Till75Min,
totalHomeTeamGoalsAfter75Min,
totalAwayTeamGoalsTill15Min,
totalAwayTeamGoalsFrom16Till30Min,
totalAwayTeamGoalsFrom31Till45Min,
totalAwayTeamGoalsFrom46Till60Min,
totalAwayTeamGoalsFrom61Till75Min,
totalAwayTeamGoalsAfter75Min
  };
};