import type { Match } from "../../types/football";
import {
    getFirstHalfResultForTeam,
    getFirstHalfResultSequenceForTeam,
    getFirstHalfResultXForTeam,
    getMatchResultForTeam,
    getMatchResultSequenceWinInBothTimes,
    getMatchResultSequenceWinInOneTime,
    getMatchResultSequenceForTeam,
    getMatchResultXForTeam,
    getSecondHalfResultForTeam,
    getSecondHalfResultSequenceForTeam,
    getSecondHalfResultXForTeam,
    isHomePlay,
    winsInAtLeastInOneTime,
    winsInBothTimes,
} from "./1teamMatchUtils";

import {

    getLastMatches,

} from "../../utils/matchUtils";
import { defineTeamLevel } from "../../utils/5defineTeamLevel";

export const calculateGeneralResultStatistics = (
    matches: Match[],
    lastMatchesCount = 20,
    teamId: number,
): any => {

    const matchesPlayed = matches.length;
    const lastMatches = getLastMatches(matches, lastMatchesCount);

    const homeMatches: Match[] | [] = [];
    const awayMatches: Match[] | [] = [];

    let homePlays = 0;
    let awayPlays = 0;

    let totalWins = 0;
    let totalLoss = 0;
    let totalDraws = 0;

    let totalHomeWins = 0;
    let totalHomeLoss = 0;
    let totalHomeDraws = 0;

    let totalAwayWins = 0;
    let totalAwayLoss = 0;
    let totalAwayDraws = 0;

    let totalWinsFirstHalf = 0;
    let totalLossFirstHalf = 0;
    let totalDrawsFirstHalf = 0;

    let totalHomeWinsFirstHalf = 0;
    let totalHomeLossFirstHalf = 0;
    let totalHomeDrawsFirstHalf = 0;

    let totalAwayWinsFirstHalf = 0;
    let totalAwayLossFirstHalf = 0;
    let totalAwayDrawsFirstHalf = 0;

    let totalWinsSecondHalf = 0;
    let totalLossSecondHalf = 0;
    let totalDrawsSecondHalf = 0;

    let totalHomeWinsSecondHalf = 0;
    let totalHomeLossSecondHalf = 0;
    let totalHomeDrawsSecondHalf = 0;

    let totalAwayWinsSecondHalf = 0;
    let totalAwayLossSecondHalf = 0;
    let totalAwayDrawsSecondHalf = 0;

    let totalWinInBothTimes = 0;
    let totalWinInBothTimesHome = 0;
    let totalWinInBothTimesAway = 0;

    let totalWinAlLeastInOnTime = 0;
    let totalWinAlLeastInOnTimeHome = 0;
    let totalWinAlLeastInOnTimeAway = 0;

    let totalXWins = 0;
    let totalXLoss = 0;


    let totalHomeXWins = 0;
    let totalHomeXLoss = 0;

    let totalAwayXWins = 0;
    let totalAwayXLoss = 0;

    let totalXWinsFirstHalf = 0;
    let totalXLossFirstHalf = 0;

    let totalHomeXWinsFirstHalf = 0;
    let totalHomeXLossFirstHalf = 0;

    let totalAwayXWinsFirstHalf = 0;
    let totalAwayXLossFirstHalf = 0;

    let totalXWinsSecondHalf = 0;
    let totalXLossSecondHalf = 0;

    let totalHomeXWinsSecondHalf = 0;
    let totalHomeXLossSecondHalf = 0;

    let totalAwayXWinsSecondHalf = 0;
    let totalAwayXLossSecondHalf = 0;

    const winsInBothTimesResults: boolean[] = [];
    const winAtLeastInOneTimeResults: boolean[] = [];

    const matchCategories = [];

    matches.forEach((match) => {

        const isHomeMatch = isHomePlay(match, teamId);
        const teamOdds = isHomeMatch ? match.home_odds : match.away_odds;
        const opponentOddsOdds = isHomeMatch ? match.away_odds : match.home_odds;

        const teamCategory = defineTeamLevel(teamOdds);
        const opponentCategory = defineTeamLevel(opponentOddsOdds);

        matchCategories.push({
            match,
            teamCategory,
            opponentCategory,
            isHomeMatch
        });

        let winInBothTime = null;
        let winInAtLeastInOneTime = null;

        // Home / Away
        if (isHomeMatch) {
            homePlays++;
            homeMatches.push(match);


            winInBothTime = winsInBothTimes(match, "HOME")
            winInAtLeastInOneTime = winsInAtLeastInOneTime(match, "HOME");
            winsInBothTimesResults.push(winsInBothTimes(match, "HOME"))
            winAtLeastInOneTimeResults.push(winsInAtLeastInOneTime(match, "HOME"))

            if (winInBothTime) {
                totalWinInBothTimes++
                totalWinInBothTimesHome++
            }

            if (winInAtLeastInOneTime) {
                totalWinAlLeastInOnTime++
                totalWinAlLeastInOnTimeHome++
            }

        } else {
            awayPlays++;
            awayMatches.push(match);

            winInBothTime = winsInBothTimes(match, "AWAY");
            winInAtLeastInOneTime = winsInAtLeastInOneTime(match, "AWAY");
            winsInBothTimesResults.push(winsInBothTimes(match, "AWAY"))
            winAtLeastInOneTimeResults.push(winsInAtLeastInOneTime(match, "AWAY"))

            if (winInBothTime) {
                totalWinInBothTimes++
                totalWinInBothTimesAway++
            }

            if (winInAtLeastInOneTime) {
                totalWinAlLeastInOnTime++
                totalWinAlLeastInOnTimeAway++
            }
        }

        const matchResultForTeam = getMatchResultForTeam(
            match,
            isHomeMatch,
        );

        const firstHalfResultForTeam = getFirstHalfResultForTeam(
            match,
            isHomeMatch,
        );

        const secondHalfResultForTeam = getSecondHalfResultForTeam(
            match,
            isHomeMatch,
        );

        const matchXResultForTeam = getMatchResultXForTeam(
            match,
            isHomeMatch,
        );

        const firstHalfXResultForTeam = getFirstHalfResultXForTeam(
            match,
            isHomeMatch,
        );

        const secondHalfXResultForTeam = getSecondHalfResultXForTeam(
            match,
            isHomeMatch,
        );


        // Total result
        if (matchResultForTeam === "WIN") {
            totalWins++;
        } else if (matchResultForTeam === "LOSS") {
            totalLoss++;
        } else {
            totalDraws++;
        }

        if (firstHalfResultForTeam === "WIN") {
            totalWinsFirstHalf++;
        } else if (firstHalfResultForTeam === "LOSS") {
            totalLossFirstHalf++;
        } else {
            totalDrawsFirstHalf++;
        }


        if (secondHalfResultForTeam === "WIN") {
            totalWinsSecondHalf++;
        } else if (secondHalfResultForTeam === "LOSS") {
            totalLossSecondHalf++;
        } else {
            totalDrawsSecondHalf++;
        }

        // Total X result
        if (matchXResultForTeam === "X") {
            totalXWins++;
        } else {
            totalXLoss++;
        }


        if (firstHalfXResultForTeam === "X") {
            totalXWinsFirstHalf++;
        } else {
            totalXLossFirstHalf++;
        }


        if (secondHalfXResultForTeam === "X") {
            totalXWinsSecondHalf++;
        } else {
            totalXLossSecondHalf++;
        }


        // Home / Away result
        if (isHomeMatch) {


            //Match Results
            if (matchResultForTeam === "WIN") {
                totalHomeWins++;
            } else if (matchResultForTeam === "LOSS") {
                totalHomeLoss++;
            } else {
                totalHomeDraws++;
            }

            if (firstHalfResultForTeam === "WIN") {
                totalHomeWinsFirstHalf++;
            } else if (firstHalfResultForTeam === "LOSS") {
                totalHomeLossFirstHalf++;
            } else {
                totalHomeDrawsFirstHalf++;
            }

            if (secondHalfResultForTeam === "WIN") {
                totalHomeWinsSecondHalf++;
            } else if (secondHalfResultForTeam === "LOSS") {
                totalHomeLossSecondHalf++;
            } else {
                totalHomeDrawsSecondHalf++;
            }

            //Match Results X
            if (matchXResultForTeam === "X") {
                totalHomeXWins++;
            } else {
                totalHomeXLoss++;
            }

            if (firstHalfXResultForTeam === "X") {
                totalHomeXWinsFirstHalf++;
            } else {
                totalHomeXLossFirstHalf++;
            }

            if (secondHalfXResultForTeam === "X") {
                totalHomeXWinsSecondHalf++;
            } else {
                totalHomeXLossSecondHalf++;
            }

        } else {

            //Match Result
            if (matchResultForTeam === "WIN") {
                totalAwayWins++;
            } else if (matchResultForTeam === "LOSS") {
                totalAwayLoss++;
            } else {
                totalAwayDraws++;
            }

            if (firstHalfResultForTeam === "WIN") {
                totalAwayWinsFirstHalf++;
            } else if (firstHalfResultForTeam === "LOSS") {
                totalAwayLossFirstHalf++;
            } else {
                totalAwayDrawsFirstHalf++;
            }

            if (secondHalfResultForTeam === "WIN") {
                totalAwayWinsSecondHalf++;
            } else if (secondHalfResultForTeam === "LOSS") {
                totalAwayLossSecondHalf++;
            } else {
                totalAwayDrawsSecondHalf++;
            }


            //Match Results X
            if (matchXResultForTeam === "X") {
                totalAwayXWins++;
            } else {
                totalAwayXLoss++;
            }

            if (firstHalfXResultForTeam === "X") {
                totalAwayXWinsFirstHalf++;
            } else {
                totalAwayXLossFirstHalf++;
            }

            if (secondHalfXResultForTeam === "X") {
                totalAwayXWinsSecondHalf++;
            } else {
                totalAwayXLossSecondHalf++;
            }
        }
    });

    const lastHomeMatches = getLastMatches(homeMatches, lastMatchesCount);

    const lastAwayMatches = getLastMatches(awayMatches, lastMatchesCount);

    return {
        matchesPlayed,

        homePlays,
        awayPlays,

        totalWins,
        totalLoss,
        totalDraws,

        totalHomeWins,
        totalHomeLoss,
        totalHomeDraws,

        totalAwayWins,
        totalAwayLoss,
        totalAwayDraws,

        totalWinsFirstHalf,
        totalLossFirstHalf,
        totalDrawsFirstHalf,

        totalHomeWinsFirstHalf,
        totalHomeLossFirstHalf,
        totalHomeDrawsFirstHalf,

        totalAwayWinsFirstHalf,
        totalAwayLossFirstHalf,
        totalAwayDrawsFirstHalf,

        totalWinsSecondHalf,
        totalLossSecondHalf,
        totalDrawsSecondHalf,

        totalHomeWinsSecondHalf,
        totalHomeLossSecondHalf,
        totalHomeDrawsSecondHalf,

        totalAwayWinsSecondHalf,
        totalAwayLossSecondHalf,
        totalAwayDrawsSecondHalf,


        currentForm: getMatchResultSequenceForTeam(
            lastMatches,
            teamId
        ),

        firstHalfForm: getFirstHalfResultSequenceForTeam(
            lastMatches,
            teamId
        ),

        secondHalfForm: getSecondHalfResultSequenceForTeam(
            lastMatches,
            teamId
        ),

        currentFormHome: getMatchResultSequenceForTeam(
            lastHomeMatches,
            teamId
        ),

        firstHalfFormHome: getFirstHalfResultSequenceForTeam(
            lastHomeMatches,
            teamId
        ),

        secondHalfFormHome: getSecondHalfResultSequenceForTeam(
            lastHomeMatches,
            teamId
        ),

        currentFormAway: getMatchResultSequenceForTeam(
            lastAwayMatches,
            teamId
        ),

        firstHalfFormAway: getFirstHalfResultSequenceForTeam(
            lastAwayMatches,
            teamId
        ),

        secondHalfFormAway: getSecondHalfResultSequenceForTeam(
            lastAwayMatches,
            teamId
        ),

        currentFormWinInBothTimes: winsInBothTimesResults.length > lastMatchesCount ? winsInBothTimesResults.slice(-lastMatchesCount) : winsInBothTimesResults,
        currentFormWinAtLeastInOneTime: winAtLeastInOneTimeResults.length > lastMatchesCount ? winAtLeastInOneTimeResults.slice(-lastMatchesCount) : winAtLeastInOneTimeResults,

        currentFormWinInBothTimesHomes: getMatchResultSequenceWinInBothTimes(lastHomeMatches, "HOME"),
        currentFormWinInBothTimesAway: getMatchResultSequenceWinInBothTimes(lastAwayMatches, "AWAY"),

        currentFormWinAtLeastInOneTimeHome: getMatchResultSequenceWinInOneTime(lastHomeMatches, "HOME"),
        currentFormWinAtLeastInOneTimeAway: getMatchResultSequenceWinInOneTime(lastAwayMatches, "AWAY"),

        totalWinInBothTimes,
        totalWinInBothTimesHome,
        totalWinInBothTimesAway,

        totalWinAlLeastInOnTime,
        totalWinAlLeastInOnTimeHome,
        totalWinAlLeastInOnTimeAway,

        totalXWins,
        totalXLoss,

        totalHomeXWins,
        totalHomeXLoss,

        totalAwayXWins,
        totalAwayXLoss,

        totalXWinsFirstHalf,
        totalXLossFirstHalf,

        totalHomeXWinsFirstHalf,
        totalHomeXLossFirstHalf,

        totalAwayXWinsFirstHalf,
        totalAwayXLossFirstHalf,

        totalXWinsSecondHalf,
        totalXLossSecondHalf,

        totalHomeXWinsSecondHalf,
        totalHomeXLossSecondHalf,

        totalAwayXWinsSecondHalf,
        totalAwayXLossSecondHalf,

        matchCategories

    };
};