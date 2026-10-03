import type { Match } from "../../types/football";
import type { GeneralStatistics } from "../types/1General";
import {
    getFirstHalfResultForTeam,
    getMatchGoalsForTeam,
    getMatchResultForTeam,
    getSecondHalfResultForTeam,
    getTotalsForTeam,
    isBothTeamsScored,
    isCleanSheetForTeam,
    isHomePlay,
} from "./1teamMatchUtils";

export const calculateGeneralStatistics = (
    matches: Match[],
    teamId: number,
): GeneralStatistics => {

    const matchesPlayed = matches.length;

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

    let totalTeamGoals = 0;
    let totalTeamConcededGoals = 0;
    let totalTeamHomeGoals = 0;
    let totalTeamHomeConcededGoals = 0;
    let totalTeamAwayGoals = 0;
    let totalTeamAwayConcededGoals = 0;

    let totalBTTS = 0
    let totalNoBTTS = 0;
    let totalHomeBTTS = 0;
    let totalHomeNoBTTS = 0;
    let totalAwayBTTS = 0;
    let totalAwayNoBTTS = 0;

    let totalCleanSheet = 0;
    let totalNotCleanSheet = 0;
    let totalHomeCleanSheet = 0;
    let totalHomeNotCleanSheet = 0;
    let totalAwayCleanSheet = 0;
    let totalAwayNotCleanSheet = 0;

    let totalGoalsOver05 = 0;
    let totalHomePlayGoalsOver05 = 0;
    let totalAwayPlayGoalsOver05 = 0;
    let totalGoalsNotOver05 = 0;
    let totalHomePlayGoalsNotOver05 = 0;
    let totalAwayPlayGoalsNotOver05 = 0;

    let totalGoalsOver15 = 0;
    let totalHomePlayGoalsOver15 = 0;
    let totalAwayPlayGoalsOver15 = 0;
    let totalGoalsNotOver15 = 0;
    let totalHomePlayGoalsNotOver15 = 0;
    let totalAwayPlayGoalsNotOver15 = 0;

    let totalGoalsOver25 = 0;
    let totalHomePlayGoalsOver25 = 0;
    let totalAwayPlayGoalsOver25 = 0;
    let totalGoalsNotOver25 = 0;
    let totalHomePlayGoalsNotOver25 = 0;
    let totalAwayPlayGoalsNotOver25 = 0;

    let totalGoalsOver35 = 0;
    let totalHomePlayGoalsOver35 = 0;
    let totalAwayPlayGoalsOver35 = 0;
    let totalGoalsNotOver35 = 0;
    let totalHomePlayGoalsNotOver35 = 0;
    let totalAwayPlayGoalsNotOver35 = 0;

    let totalGoalsOver45 = 0;
    let totalHomePlayGoalsOver45 = 0;
    let totalAwayPlayGoalsOver45 = 0;
    let totalGoalsNotOver45 = 0;
    let totalHomePlayGoalsNotOver45 = 0;
    let totalAwayPlayGoalsNotOver45 = 0;


    matches.forEach((match) => {

        const isHomeMatch = isHomePlay(match, teamId);

        // Home / Away
        if (isHomeMatch) {
            homePlays++;
        } else {
            awayPlays++;
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

        const matchGoals = getMatchGoalsForTeam(match);
        const isBTTS = isBothTeamsScored(match);

        const matchTotals = getTotalsForTeam(match);

        //General totals
        Object.entries(matchTotals).forEach(([total, value]) => {
            switch (total) {
                case "isOver05":
                    return value ? totalGoalsOver05++ : totalGoalsNotOver05++
                    break;
                case "isOver15":
                    return value ? totalGoalsOver15++ : totalGoalsNotOver15++
                    break;
                case "isOver25":
                    return value ? totalGoalsOver25++ : totalGoalsNotOver25++
                    break;
                case "isOver35":
                    return value ? totalGoalsOver35++ : totalGoalsNotOver35++
                    break;
                case "isOver45":
                    return value ? totalGoalsOver45++ : totalGoalsNotOver45++
                    break;
            }
        });


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

        //BTTS
        if (isBTTS) {
            totalBTTS++
        } else {
            totalNoBTTS++
        }


        // Home / Away result
        if (isHomeMatch) {


            //Home totals
            Object.entries(matchTotals).forEach(([total, value]) => {
                switch (total) {
                    case "isOver05":
                        return value ? totalHomePlayGoalsOver05++ : totalHomePlayGoalsNotOver05++
                        break;
                    case "isOver15":
                        return value ? totalHomePlayGoalsOver15++ : totalHomePlayGoalsNotOver15++
                        break;
                    case "isOver25":
                        return value ? totalHomePlayGoalsOver25++ : totalHomePlayGoalsNotOver25++
                        break;
                    case "isOver35":
                        return value ? totalHomePlayGoalsOver35++ : totalHomePlayGoalsNotOver35++
                        break;
                    case "isOver45":
                        return value ? totalHomePlayGoalsOver45++ : totalHomePlayGoalsNotOver45++
                        break;
                }
            });


            const isHomeCleanSheet = isCleanSheetForTeam(match, "HOME");

            //CleenSheet
            if (isHomeCleanSheet) {
                totalHomeCleanSheet++;
            } else {
                totalHomeNotCleanSheet++;
            }

            //BTTS
            if (isBTTS) {
                totalHomeBTTS++
            } else {
                totalHomeNoBTTS++
            }


            //Match Goals
            totalTeamGoals += matchGoals.homeGoals;
            totalTeamConcededGoals += matchGoals.awayGoals;
            totalTeamHomeGoals += matchGoals.homeGoals;
            totalTeamHomeConcededGoals += matchGoals.awayGoals;


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

        } else {

            //Away totals
            Object.entries(matchTotals).forEach(([total, value]) => {
                switch (total) {
                    case "isOver05":
                        return value ? totalAwayPlayGoalsOver05++ : totalAwayPlayGoalsNotOver05++
                        break;
                    case "isOver15":
                        return value ? totalAwayPlayGoalsOver15++ : totalAwayPlayGoalsNotOver15++
                        break;
                    case "isOver25":
                        return value ? totalAwayPlayGoalsOver25++ : totalAwayPlayGoalsNotOver25++
                        break;
                    case "isOver35":
                        return value ? totalAwayPlayGoalsOver35++ : totalAwayPlayGoalsNotOver35++
                        break;
                    case "isOver45":
                        return value ? totalAwayPlayGoalsOver45++ : totalAwayPlayGoalsNotOver45++
                        break;
                }
            });

            const isAwayCleanSheet = isCleanSheetForTeam(match, "AWAY");

            //CleenSheet
            if (isAwayCleanSheet) {
                totalAwayCleanSheet++;
            } else {
                totalAwayNotCleanSheet++;
            }

            //BTTS
            if (isBTTS) {
                totalAwayBTTS++
            } else {
                totalAwayNoBTTS++
            }


            //Match Goals
            totalTeamGoals += matchGoals.awayGoals;
            totalTeamConcededGoals += matchGoals.homeGoals;
            totalTeamAwayGoals += matchGoals.awayGoals;
            totalTeamAwayConcededGoals += matchGoals.homeGoals;


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
        }
    });

    totalCleanSheet = totalHomeCleanSheet + totalAwayCleanSheet;
    totalNotCleanSheet = totalHomeNotCleanSheet + totalAwayNotCleanSheet;

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

        totalTeamGoals,
        totalTeamConcededGoals,
        totalTeamHomeGoals,
        totalTeamHomeConcededGoals,
        totalTeamAwayGoals,
        totalTeamAwayConcededGoals,

        totalBTTS,
        totalNoBTTS,
        totalHomeBTTS,
        totalHomeNoBTTS,
        totalAwayBTTS,
        totalAwayNoBTTS,

        totalCleanSheet,
        totalNotCleanSheet,
        totalHomeCleanSheet,
        totalHomeNotCleanSheet,
        totalAwayCleanSheet,
        totalAwayNotCleanSheet,

        totalGoalsOver05,
        totalHomePlayGoalsOver05,
        totalAwayPlayGoalsOver05,
        totalGoalsNotOver05,
        totalHomePlayGoalsNotOver05,
        totalAwayPlayGoalsNotOver05,

        totalGoalsOver15,
        totalHomePlayGoalsOver15,
        totalAwayPlayGoalsOver15,
        totalGoalsNotOver15,
        totalHomePlayGoalsNotOver15,
        totalAwayPlayGoalsNotOver15,

        totalGoalsOver25,
        totalHomePlayGoalsOver25,
        totalAwayPlayGoalsOver25,
        totalGoalsNotOver25,
        totalHomePlayGoalsNotOver25,
        totalAwayPlayGoalsNotOver25,

        totalGoalsOver35,
        totalHomePlayGoalsOver35,
        totalAwayPlayGoalsOver35,
        totalGoalsNotOver35,
        totalHomePlayGoalsNotOver35,
        totalAwayPlayGoalsNotOver35,

        totalGoalsOver45,
        totalHomePlayGoalsOver45,
        totalAwayPlayGoalsOver45,
        totalGoalsNotOver45,
        totalHomePlayGoalsNotOver45,
        totalAwayPlayGoalsNotOver45,
    };
};