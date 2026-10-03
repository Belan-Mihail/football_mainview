import type { Match } from "../../types/football";
import { getAwayGoals, getFirstHalfResult, getHomeGoals, getMatchResult, getSecondHalfResult } from "../../utils/matchUtils";


export const isHomePlay = (
    match: Match,
    teamId: number,
): boolean => {
    return match.home_team === teamId;
};

export const isTeamFavorite = (
    match: Match,
    teamId: number,
): boolean => {
    const isHome = isHomePlay(match, teamId);

    const result = isHome ? match.home_odds! < match.away_odds! : match.home_odds! > match.away_odds!

    return result;
};

export const isTeamNonFavorite = (
    match: Match,
    teamId: number,
): boolean => {
    const isHome = isHomePlay(match, teamId);

    const result = isHome ? match.home_odds! > match.away_odds! : match.home_odds! < match.away_odds!

    return result;
};

export const isTeamStrongFavorite = (
    match: Match,
    teamId: number,
): boolean => {
    const isFavorite = isTeamFavorite(match, teamId);

    if (!isFavorite) {
        return false;
    }

    const isHome = isHomePlay(match, teamId);

    const teamOdds = isHome
        ? match.home_odds
        : match.away_odds;

    const opponentOdds = isHome
        ? match.away_odds
        : match.home_odds;

    if (
        teamOdds === undefined ||
        opponentOdds === undefined
    ) {
        return false;
    }

    return Math.abs(teamOdds - opponentOdds) >= 3;
};



export const getMatchResultForTeam = (
    match: Match,
    isHomeMatch: boolean,
): "WIN" | "DRAW" | "LOSS" => {

    const matchResult = getMatchResult(match);

    if (matchResult === "DRAW") {
        return "DRAW";
    }

    if (isHomeMatch) {
        return matchResult === "HOME" ? "WIN" : "LOSS";
    }

    return matchResult === "AWAY" ? "WIN" : "LOSS";
};


export const getFirstHalfResultForTeam = (
    match: Match,
    isHomeMatch: boolean,
): "WIN" | "DRAW" | "LOSS" => {

    const firstHalfResult = getFirstHalfResult(match);

    if (firstHalfResult === "DRAW") {
        return "DRAW";
    }

    if (isHomeMatch) {
        return firstHalfResult === "HOME" ? "WIN" : "LOSS";
    }

    return firstHalfResult === "AWAY" ? "WIN" : "LOSS";
};


export const getSecondHalfResultForTeam = (
    match: Match,
    isHomeMatch: boolean,
): "WIN" | "DRAW" | "LOSS" => {

    const secondHalfResult = getSecondHalfResult(match);

    if (secondHalfResult === "DRAW") {
        return "DRAW";
    }

    if (isHomeMatch) {
        return secondHalfResult === "HOME" ? "WIN" : "LOSS";
    }

    return secondHalfResult === "AWAY" ? "WIN" : "LOSS";
};

export interface MatchGoals {
    homeGoals: number;
    awayGoals: number;
}

export const getMatchGoalsForTeam = (
    match: Match,
): MatchGoals => {

    const homeGoals = getHomeGoals(match);
    const awayGoals = getAwayGoals(match);

    return {
        homeGoals,
        awayGoals
    }
}

export const isBothTeamsScored = (
    match: Match,
): boolean => {
    const homeGoals = getHomeGoals(match);
    const awayGoals = getAwayGoals(match);

    return ((homeGoals > 0) && (awayGoals > 0)) 
}

export const isCleanSheetForTeam = (
    match: Match,
    side: "HOME" | "AWAY"
): boolean => {
    
    if (side == "HOME") {
        return getAwayGoals(match) === 0;
    } else {
        return getHomeGoals(match) === 0;
    }
}

export interface totalsForTeam {
    isOver05: boolean;
    isOver15: boolean;
    isOver25: boolean;
    isOver35: boolean;
    isOver45: boolean;
}

export const getTotalsForTeam = (
    match: Match,
): totalsForTeam => {

    const homeGoals = getHomeGoals(match);
    const awayGoals = getAwayGoals(match);

    return {
        isOver05: ((homeGoals + awayGoals) > 0.5),
        isOver15: ((homeGoals + awayGoals) > 1.5),
        isOver25: ((homeGoals + awayGoals) > 2.5),
        isOver35: ((homeGoals + awayGoals) > 3.5),
        isOver45: ((homeGoals + awayGoals) > 4.5)
    }
}


export const winsInBothTimes = (
    match: Match,
    teamSide: "HOME" | "AWAY"
): boolean => {

    const firstHalfResult = getFirstHalfResult(match);
    const firstSecondHalfResult = getSecondHalfResult(match);

    return (teamSide == firstHalfResult) && (teamSide == firstSecondHalfResult)
};

export const winsInAtLeastInOneTime = (
    match: Match,
    teamSide: "HOME" | "AWAY"
): boolean => {

    const firstHalfResult = getFirstHalfResult(match);
    const firstSecondHalfResult = getSecondHalfResult(match);

    return (teamSide == firstHalfResult) || (teamSide == firstSecondHalfResult)
};

export const getMatchResultXForTeam = (
    match: Match,
    isHomeMatch: boolean,
): "X" | "LOSS" => {

    const matchResult = getMatchResult(match);

    if (matchResult === "DRAW") {
        return "X";
    }

    if (isHomeMatch) {
        return matchResult === "HOME" ? "X" : "LOSS";
    }

    return matchResult === "AWAY" ? "X" : "LOSS";
};


export const getFirstHalfResultXForTeam = (
    match: Match,
    isHomeMatch: boolean,
): "X" | "LOSS" => {

    const firstHalfResult = getFirstHalfResult(match);

    if (firstHalfResult === "DRAW") {
        return "X";
    }

    if (isHomeMatch) {
        return firstHalfResult === "HOME" ? "X" : "LOSS";
    }

    return firstHalfResult === "AWAY" ? "X" : "LOSS";
};


export const getSecondHalfResultXForTeam = (
    match: Match,
    isHomeMatch: boolean,
): "X" | "LOSS" => {

    const secondHalfResult = getSecondHalfResult(match);

    if (secondHalfResult === "DRAW") {
        return "X";
    }

    if (isHomeMatch) {
        return secondHalfResult === "HOME" ? "X" : "LOSS";
    }

    return secondHalfResult === "AWAY" ? "X" : "LOSS";
};


export const getMatchResultSequenceWinInBothTimes = (matches: Match[], teamSide: "HOME" | "AWAY"): boolean[] => {
  return matches.map((match) => winsInBothTimes(match, teamSide));
};

export const getMatchResultSequenceWinInOneTime = (matches: Match[], teamSide: "HOME" | "AWAY"): boolean[] => {
  return matches.map((match) => winsInAtLeastInOneTime(match, teamSide));
};

export const getMatchResultSequenceForTeam = (
    matches: Match[],
    teamId: number,
): ("WIN" | "DRAW" | "LOSS")[] => {
    return matches.map((match) => {
        const isHomeMatch = isHomePlay(match, teamId);

        return getMatchResultForTeam(
            match,
            isHomeMatch
        );
    });
};

export const getFirstHalfResultSequenceForTeam = (
    matches: Match[],
    teamId: number,
): ("WIN" | "DRAW" | "LOSS")[] => {
    return matches.map((match) => {
        const isHomeMatch = isHomePlay(match, teamId);

        return getFirstHalfResultForTeam(
            match,
            isHomeMatch
        );
    });
};

export const getSecondHalfResultSequenceForTeam = (
    matches: Match[],
    teamId: number,
): ("WIN" | "DRAW" | "LOSS")[] => {
    return matches.map((match) => {
        const isHomeMatch = isHomePlay(match, teamId);

        return getSecondHalfResultForTeam(
            match,
            isHomeMatch
        );
    });
};