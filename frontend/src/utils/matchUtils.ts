import type { GamePeriods, TeamSide } from "../types/1GeneralStatistics";
import type {
  FavoriteMode,
  MatchOutcome,
  MatchResultType,
  ScoredConcededGoalsByFavorite,
} from "../types/2GeneralResults";
import type {
  BTTSForPeriod,
  MatchGoals,
  MatchResultForTwoTeams,
  TeamsConcededGoals,
} from "../types/3ByCategoriesTypes";
import type { TotalGeneral, TotalInTimes, TotalsForPeriods } from "../types/5TotalTypes";
import type { HandicapCategory, HandicapGeneral, HandicapGeneralFav, HandicapHalf, HandicapHalfFav } from "../types/6HandicapTypes";
import type { Match } from "../types/football";
import { defineTeamLevel } from "./5defineTeamLevel";

export const getHomeGoals = (match: Match): number => {
  let homeGoals = 0;

  match.goals.forEach((goal) => {
    if (goal.team == match.home_team) {
      homeGoals++;
    }
  });

  return homeGoals;
};

export const getAwayGoals = (match: Match): number => {
  let awayGoals = 0;

  match.goals.forEach((goal) => {
    if (goal.team == match.away_team) {
      awayGoals++;
    }
  });

  return awayGoals;
};

export const getFirstHalfGoals = (match: Match): number => {
  let firstHalfGoals = 0;

  match.goals.forEach((goal) => {
    if (goal.minute <= 45) {
      firstHalfGoals++;
    }
  });

  return firstHalfGoals;
};

export const getHomeTeamFirstHalfGoals = (match: Match): number => {
  let firstHalfGoals = 0;

  match.goals.forEach((goal) => {
    if (goal.minute <= 45 && goal.team === match.home_team) {
      firstHalfGoals++;
    }
  });

  return firstHalfGoals;
};

export const getAwayTeamFirstHalfGoals = (match: Match): number => {
  let firstHalfGoals = 0;

  match.goals.forEach((goal) => {
    if (goal.minute <= 45 && goal.team === match.away_team) {
      firstHalfGoals++;
    }
  });

  return firstHalfGoals;
};

export const getSecondHalfGoals = (match: Match): number => {
  let secondHalfGoals = 0;

  match.goals.forEach((goal) => {
    if (goal.minute > 45) {
      secondHalfGoals++;
    }
  });

  return secondHalfGoals;
};

export const getHomeTeamSecondHalfGoals = (match: Match): number => {
  let secondHalfGoals = 0;

  match.goals.forEach((goal) => {
    if (goal.minute > 45 && goal.team === match.home_team) {
      secondHalfGoals++;
    }
  });

  return secondHalfGoals;
};

export const getAwayTeamSecondHalfGoals = (match: Match): number => {
  let secondHalfGoals = 0;

  match.goals.forEach((goal) => {
    if (goal.minute > 45 && goal.team === match.away_team) {
      secondHalfGoals++;
    }
  });

  return secondHalfGoals;
};

export const getGoalInPeriod = (
  match: Match,
  period: GamePeriods,
  teamSide: TeamSide | null
): number => {
  let minMinute = 0;
  let maxMinute = period;

  switch (period) {
    case 15:
      minMinute = 0;
      maxMinute = 15;
      break;

    case 30:
      minMinute = 15;
      maxMinute = 30;
      break;

    case 45:
      minMinute = 30;
      maxMinute = 45;
      break;

    case 60:
      minMinute = 45;
      maxMinute = 60;
      break;

    case 75:
      minMinute = 60;
      maxMinute = 75;
      break;

    case 90:
      minMinute = 75;
      maxMinute = Infinity;
      break;
  }

  return match.goals.filter((goal) => {
    const inPeriod =
      goal.minute > minMinute && goal.minute <= maxMinute;

    if (!inPeriod) {
      return false;
    }

    if (teamSide === null) {
      return true;
    }

    const team =
      teamSide === "HOME"
        ? match.home_team
        : match.away_team;

    return goal.team === team;
  }).length;
};

export const getTotalGoals = (match: Match): number => {
  return getHomeGoals(match) + getAwayGoals(match);
};

export const getMatchResult = (match: Match): "HOME" | "AWAY" | "DRAW" => {
  const homeGoals = getHomeGoals(match);
  const awayGoals = getAwayGoals(match);

  if (homeGoals > awayGoals) {
    return "HOME";
  }

  if (homeGoals < awayGoals) {
    return "AWAY";
  }

  return "DRAW";
};

export const getGoalDifference = (match: Match): number => {
  return Math.abs(getHomeGoals(match) - getAwayGoals(match));
};

export const isBTTS = (match: Match): boolean => {
  return getHomeGoals(match) > 0 && getAwayGoals(match) > 0;
};

export const isOver = (match: Match, total: number): boolean => {
  return getHomeGoals(match) + getAwayGoals(match) > total;
};

export const hasHomeCleanSheet = (match: Match): boolean => {
  return getAwayGoals(match) == 0;
};

export const hasAwayCleanSheet = (match: Match): boolean => {
  return getHomeGoals(match) == 0;
};

export const getFirstHalfHomeGoals = (match: Match): number => {
  let homeGoalsFirstTime = 0;

  match.goals.forEach((goal) => {
    if (goal.team == match.home_team && goal.minute < 46) {
      homeGoalsFirstTime++;
    }
  });

  return homeGoalsFirstTime;
};

export const getFirstHalfAwayGoals = (match: Match): number => {
  let awayGoalsFirstTime = 0;

  match.goals.forEach((goal) => {
    if (goal.team == match.away_team && goal.minute < 46) {
      awayGoalsFirstTime++;
    }
  });

  return awayGoalsFirstTime;
};

export const getFirstHalfResult = (match: Match): "HOME" | "AWAY" | "DRAW" => {
  const homeGoals = getFirstHalfHomeGoals(match);
  const awayGoals = getFirstHalfAwayGoals(match);

  if (homeGoals > awayGoals) {
    return "HOME";
  }

  if (homeGoals < awayGoals) {
    return "AWAY";
  }

  return "DRAW";
};

export const getSecondHalfHomeGoals = (match: Match): number => {
  let homeGoalsSecondTime = 0;

  match.goals.forEach((goal) => {
    if (goal.team == match.home_team && goal.minute > 45) {
      homeGoalsSecondTime++;
    }
  });

  return homeGoalsSecondTime;
};

export const getSecondHalfAwayGoals = (match: Match): number => {
  let awayGoalsSecondTime = 0;

  match.goals.forEach((goal) => {
    if (goal.team == match.away_team && goal.minute > 45) {
      awayGoalsSecondTime++;
    }
  });

  return awayGoalsSecondTime;
};

export const getSecondHalfResult = (match: Match): "HOME" | "AWAY" | "DRAW" => {
  const homeGoals = getSecondHalfHomeGoals(match);
  const awayGoals = getSecondHalfAwayGoals(match);

  if (homeGoals > awayGoals) {
    return "HOME";
  }

  if (homeGoals < awayGoals) {
    return "AWAY";
  }

  return "DRAW";
};

export const getLastMatches = (matches: Match[], count: number): Match[] => {
  return [...matches]
    .sort(
      (a, b) =>
        new Date(b.match_date).getTime() - new Date(a.match_date).getTime(),
    )
    .slice(0, count)
    .reverse();
};

export const getMatchResultSequence = (matches: Match[]): MatchResultType[] => {
  return matches.map((match) => getMatchResult(match));
};

export const getFirstHalfResultSequence = (
  matches: Match[],
): MatchResultType[] => {
  return matches.map((match) => getFirstHalfResult(match));
};

export const getSecondHalfResultSequence = (
  matches: Match[],
): MatchResultType[] => {
  return matches.map((match) => getSecondHalfResult(match));
};

export const getFavoriteSide = (match: Match): "HOME" | "AWAY" => {
  return match.home_odds! < match.away_odds! ? "HOME" : "AWAY";
};

export const isStrongFavorite = (match: Match): boolean => {
  return Math.abs(match.home_odds! - match.away_odds!) >= 3;
};

export const getScoredConcededGoalsByFavorite = (
  match: Match,
): ScoredConcededGoalsByFavorite => {
  const favoriteSide = getFavoriteSide(match);

  let favoriteScoredGoals = 0;
  let favoriteConcededGoals = 0;
  let nonFavoriteScoredGoals = 0;
  let nonFavoriteConcededGoals = 0;

  if (favoriteSide === "HOME") {
    favoriteScoredGoals = getHomeGoals(match);
    favoriteConcededGoals = getAwayGoals(match);
    nonFavoriteScoredGoals = getAwayGoals(match);
    nonFavoriteConcededGoals = getHomeGoals(match);

  } else {
    favoriteScoredGoals = getAwayGoals(match);
    favoriteConcededGoals = getHomeGoals(match);
    nonFavoriteScoredGoals = getHomeGoals(match);
    nonFavoriteConcededGoals = getAwayGoals(match);
  }

  return {
    favoriteScoredGoals,
    favoriteConcededGoals,
    nonFavoriteScoredGoals,
    nonFavoriteConcededGoals
  }
};

export const getFavoriteResult = (
  match: Match,
  mode: FavoriteMode,
  period: "MATCH" | "FIRST_HALF" | "SECOND_HALF" = "MATCH",
): MatchOutcome => {
  const favoriteSide = getFavoriteSide(match);

  let homeGoals = 0;
  let awayGoals = 0;

  if (period === "MATCH") {
    homeGoals = getHomeGoals(match);
    awayGoals = getAwayGoals(match);
  }

  if (period === "FIRST_HALF") {
    homeGoals = getFirstHalfHomeGoals(match);
    awayGoals = getFirstHalfAwayGoals(match);
  }

  if (period === "SECOND_HALF") {
    homeGoals = getSecondHalfHomeGoals(match);
    awayGoals = getSecondHalfAwayGoals(match);
  }

  let result: MatchOutcome;

  if (favoriteSide === "HOME") {
    if (homeGoals > awayGoals) {
      result = "WIN";
    } else if (homeGoals < awayGoals) {
      result = "LOSS";
    } else {
      result = "DRAW";
    }
  } else {
    if (awayGoals > homeGoals) {
      result = "WIN";
    } else if (awayGoals < homeGoals) {
      result = "LOSS";
    } else {
      result = "DRAW";
    }
  }

  if (mode === "FAVORITE") {
    return result;
  }

  if (result === "WIN") {
    return "LOSS";
  }

  if (result === "LOSS") {
    return "WIN";
  }

  return "DRAW";
};

export const getFavoriteResultSequence = (
  matches: Match[],
  mode: FavoriteMode,
  period: "MATCH" | "FIRST_HALF" | "SECOND_HALF" = "MATCH",
): MatchOutcome[] => {
  return matches.map((match) => getFavoriteResult(match, mode, period));
};

export const hasOdds = (match: Match): boolean => {
  return match.home_odds != null && match.away_odds != null;
};

export const getMatchGoals = (match: Match): MatchGoals => {
  return {
    homeGoals: getHomeGoals(match),
    awayGoals: getAwayGoals(match),
  };
};

export const getTeamsConcededGoals = (match: Match): TeamsConcededGoals => {
  return {
    homeTeamConcededGoals: getAwayGoals(match),
    awayTeamConcededGoals: getHomeGoals(match),
  };
};

export const getMatchResultForOneTeam = (
  match: Match,
  team: number,
): "WIN" | "DRAW" | "LOSS" => {
  const homeGoals = getHomeGoals(match);
  const awayGoals = getAwayGoals(match);

  if (team == match.home_team) {
    if (homeGoals > awayGoals) {
      return "WIN";
    }

    if (homeGoals < awayGoals) {
      return "LOSS";
    }
  }

  if (team == match.away_team) {
    if (homeGoals > awayGoals) {
      return "LOSS";
    }

    if (homeGoals < awayGoals) {
      return "WIN";
    }
  }

  return "DRAW";
};

export const getMatchResultForTwoTeams = (
  match: Match,
): MatchResultForTwoTeams => {
  return {
    resultForHomeTeam: getMatchResultForOneTeam(match, match.home_team),
    resultForAwayTeam: getMatchResultForOneTeam(match, match.away_team),
  };
};

export const getFirstHalfResultForOneTeam = (match: Match, team: number): "WIN" | "DRAW" | "LOSS" => {
  const homeGoals = getFirstHalfHomeGoals(match);
  const awayGoals = getFirstHalfAwayGoals(match);

  if (team == match.home_team) {
    if (homeGoals > awayGoals) {
      return "WIN";
    }

    if (homeGoals < awayGoals) {
      return "LOSS";
    }
  }

  if (team == match.away_team) {
    if (homeGoals > awayGoals) {
      return "LOSS";
    }

    if (homeGoals < awayGoals) {
      return "WIN";
    }
  }

  return "DRAW";
};

export const getFirstHalfResultForTwoTeams = (
  match: Match,
): MatchResultForTwoTeams => {
  return {
    resultForHomeTeam: getFirstHalfResultForOneTeam(match, match.home_team),
    resultForAwayTeam: getFirstHalfResultForOneTeam(match, match.away_team),
  };
};

export const getSecondHalfResultForOneTeam = (match: Match, team: number): "WIN" | "DRAW" | "LOSS" => {
  const homeGoals = getSecondHalfHomeGoals(match);
  const awayGoals = getSecondHalfAwayGoals(match);

  if (team == match.home_team) {
    if (homeGoals > awayGoals) {
      return "WIN";
    }

    if (homeGoals < awayGoals) {
      return "LOSS";
    }
  }

  if (team == match.away_team) {
    if (homeGoals > awayGoals) {
      return "LOSS";
    }

    if (homeGoals < awayGoals) {
      return "WIN";
    }
  }

  return "DRAW";
};

export const getSecondHalfResultForTwoTeams = (
  match: Match,
): MatchResultForTwoTeams => {
  return {
    resultForHomeTeam: getSecondHalfResultForOneTeam(match, match.home_team),
    resultForAwayTeam: getSecondHalfResultForOneTeam(match, match.away_team),
  };
};

export const isFirstHalfBTTS = (match: Match): boolean => {
  return getFirstHalfHomeGoals(match) > 0 && getFirstHalfAwayGoals(match) > 0;
}

export const isSecondHalfBTTS = (match: Match): boolean => {
  return getSecondHalfHomeGoals(match) > 0 && getSecondHalfAwayGoals(match) > 0;
}


export const getMatchResultSequenceBTTS = (matches: Match[]): boolean[] => {
  return matches.map((match) => getMatchResultBTTS(match, "MATCH"));
};

export const getFirstHalfResultSequenceBTTS = (
  matches: Match[],
): boolean[] => {
  return matches.map((match) => getMatchResultBTTS(match, "FIRST_HALF"));
};

export const getSecondHalfResultSequenceBTTS = (
  matches: Match[],
): boolean[] => {
  return matches.map((match) => getMatchResultBTTS(match, "SECOND_HALF"));
};

export const getMatchResultBTTS = (match: Match, period: "MATCH" | "FIRST_HALF" | "SECOND_HALF"): boolean => {
  const homeGoals = period === "MATCH" ? getHomeGoals(match) : period === "FIRST_HALF" ? getFirstHalfHomeGoals(match) : getSecondHalfHomeGoals(match);
  const awayGoals = period === "MATCH" ? getAwayGoals(match) : period === "FIRST_HALF" ? getFirstHalfAwayGoals(match) : getSecondHalfAwayGoals(match)

  return homeGoals > 0 && awayGoals > 0;
};


export const getBTTSForPeriods = (match: Match): BTTSForPeriod => {

  const matchResult = getHomeGoals(match) > 0 && getAwayGoals(match) > 0;
  const firstHalfResult = getFirstHalfHomeGoals(match) > 0 && getFirstHalfAwayGoals(match) > 0;
  const secondHalfResult = getSecondHalfHomeGoals(match) > 0 && getSecondHalfAwayGoals(match) > 0;

  return {
    match: matchResult,
    firstHalf: firstHalfResult,
    secondHalf: secondHalfResult,
  }
}

// ********** TOTALS ************ //

export const getTotalGeneral = (match: Match): TotalGeneral => {
  const over15 = (getHomeGoals(match) + getAwayGoals(match)) > 1.5;
  const over25 = (getHomeGoals(match) + getAwayGoals(match)) > 2.5;
  const over35 = (getHomeGoals(match) + getAwayGoals(match)) > 3.5;
  const over45 = (getHomeGoals(match) + getAwayGoals(match)) > 4.5;
  const over55 = (getHomeGoals(match) + getAwayGoals(match)) > 5.5;

  return {
    over15: over15,
    over25: over25,
    over35: over35,
    over45: over45,
    over55: over55
  }
}

export const getTotalFirstHalf = (match: Match): TotalInTimes => {
  const over05 = (getFirstHalfHomeGoals(match) + getFirstHalfAwayGoals(match)) > 0.5;
  const over15 = (getFirstHalfHomeGoals(match) + getFirstHalfAwayGoals(match)) > 1.5;
  const over25 = (getFirstHalfHomeGoals(match) + getFirstHalfAwayGoals(match)) > 2.5;
  ;

  return {
    over05: over05,
    over15: over15,
    over25: over25,
  }
}

export const getTotalSecondHalf = (match: Match): TotalInTimes => {
  const over05 = (getSecondHalfHomeGoals(match) + getSecondHalfAwayGoals(match)) > 0.5;
  const over15 = (getSecondHalfHomeGoals(match) + getSecondHalfAwayGoals(match)) > 1.5;
  const over25 = (getSecondHalfHomeGoals(match) + getSecondHalfAwayGoals(match)) > 2.5;
  ;

  return {
    over05: over05,
    over15: over15,
    over25: over25,
  }
}

export const getTotalsForPeriods = (match: Match): TotalsForPeriods => {

  const matchResult = getTotalGeneral(match);
  const firstHalfResult = getTotalFirstHalf(match);
  const secondHalfResult = getTotalSecondHalf(match)

  return {
    match: matchResult,
    firstHalf: firstHalfResult,
    secondHalf: secondHalfResult,
  }
}

export const getMatchResultSequenceTotal = (
  matches: Match[],
): TotalGeneral[] => {
  return matches.map(getTotalGeneral);
};

export const getFirstHalfResultSequenceTotal = (
  matches: Match[],
): TotalInTimes[] => {
  return matches.map(getTotalFirstHalf);
};

export const getSecondHalfResultSequenceTotal = (
  matches: Match[],
): TotalInTimes[] => {
  return matches.map(getTotalSecondHalf);
};

export const getMatchResultTotal = (match: Match): TotalGeneral => {
  return getTotalGeneral(match);
};

export const getMatchResultTotalHalf = (match: Match, period: "FIRST_HALF" | "SECOND_HALF"): TotalInTimes => {
  return period === "FIRST_HALF" ? getTotalFirstHalf(match) : getTotalSecondHalf(match);

};

// ********** HANDICAP ************ //

export const getHandicap = (
  match: Match,
  side: "HOME" | "AWAY",
): HandicapGeneral => {
  const scored =
    side === "HOME"
      ? getHomeGoals(match)
      : getAwayGoals(match);

  const conceded =
    side === "HOME"
      ? getAwayGoals(match)
      : getHomeGoals(match);

  return {
    minus05: scored - (conceded + 0.5) > 0,
    minus15: scored - (conceded + 1.5) > 0,
    minus25: scored - (conceded + 2.5) > 0,

    plus05: scored - (conceded - 0.5) > 0,
    plus15: scored - (conceded - 1.5) > 0,
    plus25: scored - (conceded - 2.5) > 0,
  };
};

export const getHandicapHalf = (
  match: Match,
  side: "HOME" | "AWAY",
  period: "FIRST_HALF" | "SECOND_HALF",
): HandicapHalf => {
  const homeGoals =
    period === "FIRST_HALF"
      ? getFirstHalfHomeGoals(match)
      : getSecondHalfHomeGoals(match);

  const awayGoals =
    period === "FIRST_HALF"
      ? getFirstHalfAwayGoals(match)
      : getSecondHalfAwayGoals(match);

  const scored =
    side === "HOME"
      ? homeGoals
      : awayGoals;

  const conceded =
    side === "HOME"
      ? awayGoals
      : homeGoals;

  return {
    minus05: scored - (conceded + 0.5) > 0,
    minus15: scored - (conceded + 1.5) > 0,

    plus05: scored - (conceded - 0.5) > 0,
    plus15: scored - (conceded - 1.5) > 0,
  };
};

export const getHandicapSequence = (
  matches: Match[],
  side: "HOME" | "AWAY",
): HandicapGeneral[] => {
  return matches.map((match) => getHandicap(match, side));
};

export const getFirstHalfHandicapSequence = (
  matches: Match[],
  side: "HOME" | "AWAY",
): HandicapHalf[] => {
  return matches.map((match) =>
    getHandicapHalf(match, side, "FIRST_HALF"),
  );
};

export const getSecondHalfHandicapSequence = (
  matches: Match[],
  side: "HOME" | "AWAY",
): HandicapHalf[] => {
  return matches.map((match) =>
    getHandicapHalf(match, side, "SECOND_HALF"),
  );
};

export const getMatchResultHandicap = (
  match: Match,
  side: "HOME" | "AWAY",
): HandicapGeneral => {
  return getHandicap(match, side);
};

export const getMatchResultHandicapHalf = (
  match: Match,
  side: "HOME" | "AWAY",
  period: "FIRST_HALF" | "SECOND_HALF",
): HandicapHalf => {
  return getHandicapHalf(match, side, period);
};

//  HANDICAP FAVORITE //


export const getHandicapFavorite = (
  match: Match,
): HandicapGeneralFav => {
  const favoriteSide = getFavoriteSide(match);
  const strongFavorite = isStrongFavorite(match);

  const favoriteScored =
    favoriteSide === "HOME"
      ? getHomeGoals(match)
      : getAwayGoals(match);

  const favoriteConceded =
    favoriteSide === "HOME"
      ? getAwayGoals(match)
      : getHomeGoals(match);

  return {
    favoriteMinus05: favoriteScored - (favoriteConceded + 0.5) > 0,
    favoriteMinus15: favoriteScored - (favoriteConceded + 1.5) > 0,
    favoriteMinus25: favoriteScored - (favoriteConceded + 2.5) > 0,

    nonFavoritePlus05: (favoriteConceded + 0.5) - favoriteScored > 0,
    nonFavoritePlus15: (favoriteConceded + 1.5) - favoriteScored > 0,
    nonFavoritePlus25: (favoriteConceded + 2.5) - favoriteScored > 0,

    strongFavoriteMinus05: strongFavorite
      ? favoriteScored - (favoriteConceded + 0.5) > 0
      : null,
    strongFavoriteMinus15: strongFavorite
      ? favoriteScored - (favoriteConceded + 1.5) > 0
      : null,
    strongFavoriteMinus25: strongFavorite
      ? favoriteScored - (favoriteConceded + 2.5) > 0
      : null,

  };
};

export const getHandicapHalfFav = (
  match: Match,

  period: "FIRST_HALF" | "SECOND_HALF",
): HandicapHalfFav => {
  const favoriteSide = getFavoriteSide(match);
  const strongFavorite = isStrongFavorite(match);

  let favoriteScored = 0;
  let favoriteConceded = 0;

  if (favoriteSide === "HOME") {
    favoriteScored = period === "FIRST_HALF"
      ? getFirstHalfHomeGoals(match)
      : getSecondHalfHomeGoals(match);
  } else {
    favoriteScored = period === "FIRST_HALF"
      ? getFirstHalfAwayGoals(match)
      : getSecondHalfAwayGoals(match);
  }

  if (favoriteSide === "HOME") {
    favoriteConceded = period === "FIRST_HALF"
      ? getFirstHalfAwayGoals(match)
      : getSecondHalfAwayGoals(match);
  } else {
    favoriteConceded = period === "FIRST_HALF"
      ? getFirstHalfHomeGoals(match)
      : getSecondHalfHomeGoals(match);
  }

  let nonFavoriteScored = 0;
  let nonFavoriteConceded = 0;

  if (favoriteSide === "HOME") {
    nonFavoriteScored = period === "FIRST_HALF"
      ? getFirstHalfAwayGoals(match)
      : getSecondHalfAwayGoals(match);
  } else {
    nonFavoriteScored = period === "FIRST_HALF"
      ? getFirstHalfHomeGoals(match)
      : getSecondHalfHomeGoals(match);
  }

  if (favoriteSide === "HOME") {
    nonFavoriteConceded = period === "FIRST_HALF"
      ? getFirstHalfHomeGoals(match)
      : getSecondHalfHomeGoals(match);
  } else {
    nonFavoriteConceded = period === "FIRST_HALF"
      ? getFirstHalfAwayGoals(match)
      : getSecondHalfAwayGoals(match);
  }



  return {
    favoriteMinus05: favoriteScored - (favoriteConceded + 0.5) > 0,
    favoriteMinus15: favoriteScored - (favoriteConceded + 1.5) > 0,

    nonFavoritePlus05: nonFavoriteScored + 0.5 - nonFavoriteConceded > 0,
    nonFavoritePlus15: nonFavoriteScored + 1.5 - nonFavoriteConceded > 0,

    strongFavoriteMinus05: strongFavorite
      ? favoriteScored - (favoriteConceded + 0.5) > 0
      : null,
    strongFavoriteMinus15: strongFavorite
      ? favoriteScored - (favoriteConceded + 1.5) > 0
      : null,
  };
};

export const getFavoriteHandicapSequence = (
  matches: Match[],
): HandicapGeneralFav[] => {
  return matches.map(getHandicapFavorite);
};

export const getFirstHalfFavoriteHandicapSequence = (
  matches: Match[],
): HandicapHalfFav[] => {
  return matches.map((match) =>
    getHandicapHalfFav(match, "FIRST_HALF"),
  );
};

export const getSecondHalfFavoriteHandicapSequence = (
  matches: Match[],
): HandicapHalfFav[] => {
  return matches.map((match) =>
    getHandicapHalfFav(match, "SECOND_HALF"),
  );
};

export const getMatchResultFavoriteHandicap = (
  match: Match,
): HandicapGeneralFav => {
  return getHandicapFavorite(match);
};

export const getMatchResultFavoriteHandicapHalf = (
  match: Match,
  period: "FIRST_HALF" | "SECOND_HALF",
): HandicapHalfFav => {
  return getHandicapHalfFav(match, period);
};


//  BY CATEGORY //
export const getHandicapCategory = (
  match: Match,
  side: "HOME" | "AWAY",
): HandicapCategory => {
  const category = defineTeamLevel(
    side === "HOME"
      ? match.home_odds
      : match.away_odds,
  );

  const isFavoriteCategory =
    category.startsWith("A") ||
    category.startsWith("B");

  const scored =
    side === "HOME"
      ? getHomeGoals(match)
      : getAwayGoals(match);

  const conceded =
    side === "HOME"
      ? getAwayGoals(match)
      : getHomeGoals(match);

  if (isFavoriteCategory) {
    return {
      handicap05:
        scored - (conceded + 0.5) > 0,

      handicap15:
        scored - (conceded + 1.5) > 0,

      handicap25:
        scored - (conceded + 2.5) > 0,
    };
  }

  return {
    handicap05:
      scored + 0.5 - conceded > 0,

    handicap15:
      scored + 1.5 - conceded > 0,

    handicap25:
      scored + 2.5 - conceded > 0,
  };
};

export const getHandicapCategoryHalf = (
  match: Match,
  side: "HOME" | "AWAY",
  period: "FIRST_HALF" | "SECOND_HALF",
): HandicapCategory => {
  const category = defineTeamLevel(
    side === "HOME"
      ? match.home_odds
      : match.away_odds,
  );

  const isFavoriteCategory =
    category.startsWith("A") ||
    category.startsWith("B");

  const homeGoals =
    period === "FIRST_HALF"
      ? getFirstHalfHomeGoals(match)
      : getSecondHalfHomeGoals(match);

  const awayGoals =
    period === "FIRST_HALF"
      ? getFirstHalfAwayGoals(match)
      : getSecondHalfAwayGoals(match);

  const scored =
    side === "HOME"
      ? homeGoals
      : awayGoals;

  const conceded =
    side === "HOME"
      ? awayGoals
      : homeGoals;

  if (isFavoriteCategory) {
    return {
      handicap05:
        scored - (conceded + 0.5) > 0,

      handicap15:
        scored - (conceded + 1.5) > 0,
    };
  }

  return {
    handicap05:
      scored + 0.5 - conceded > 0,

    handicap15:
      scored + 1.5 - conceded > 0,
  };
};

export const getCategoryHandicapSequence = (
  matches: Match[],
  side: "HOME" | "AWAY",
): HandicapCategory[] => {
  return matches.map((match) =>
    getHandicapCategory(match, side),
  );
};

export const getFirstHalfCategoryHandicapSequence = (
  matches: Match[],
  side: "HOME" | "AWAY",
): HandicapCategory[] => {
  return matches.map((match) =>
    getHandicapCategoryHalf(
      match,
      side,
      "FIRST_HALF",
    ),
  );
};

export const getSecondHalfCategoryHandicapSequence = (
  matches: Match[],
  side: "HOME" | "AWAY",
): HandicapCategory[] => {
  return matches.map((match) =>
    getHandicapCategoryHalf(
      match,
      side,
      "SECOND_HALF",
    ),
  );
};

export const getMatchResultCategoryHandicap = (
  match: Match,
  side: "HOME" | "AWAY",
): HandicapCategory => {
  return getHandicapCategory(match, side);
};

export const getMatchResultCategoryHandicapHalf = (
  match: Match,
  side: "HOME" | "AWAY",
  period: "FIRST_HALF" | "SECOND_HALF",
): HandicapCategory => {
  return getHandicapCategoryHalf(
    match,
    side,
    period,
  );
};