import type { Match } from "../types/football";
import type { TotalResults } from "../types/5TotalTypes";

import {
  getLastMatches,
  getMatchResultSequenceTotal,
  getFirstHalfResultSequenceTotal,
  getSecondHalfResultSequenceTotal,
  getTotalGeneral,
  getTotalFirstHalf,
  getTotalSecondHalf,
} from "../utils/matchUtils";

const calculateGeneralResultTotal = (
  matches: Match[],
  lastMatchesCount: number,
): TotalResults => {

  const matchesPlayed = matches.length;

  const lastMatches = getLastMatches(
    matches,
    lastMatchesCount,
  );

  let matchOver15 = 0;
  let matchOver25 = 0;
  let matchOver35 = 0;
  let matchOver45 = 0;
  let matchOver55 = 0;

  let firstHalfOver05 = 0;
  let firstHalfOver15 = 0;
  let firstHalfOver25 = 0;

  let secondHalfOver05 = 0;
  let secondHalfOver15 = 0;
  let secondHalfOver25 = 0;

  matches.forEach((match) => {
    const fullTime = getTotalGeneral(match);
    const firstHalf = getTotalFirstHalf(match);
    const secondHalf = getTotalSecondHalf(match);

    if (fullTime.over15) matchOver15++;
    if (fullTime.over25) matchOver25++;
    if (fullTime.over35) matchOver35++;
    if (fullTime.over45) matchOver45++;
    if (fullTime.over55) matchOver55++;

    if (firstHalf.over05) firstHalfOver05++;
    if (firstHalf.over15) firstHalfOver15++;
    if (firstHalf.over25) firstHalfOver25++;

    if (secondHalf.over05) secondHalfOver05++;
    if (secondHalf.over15) secondHalfOver15++;
    if (secondHalf.over25) secondHalfOver25++;
  });

  const matchNotOver15 = matchesPlayed - matchOver15;
  const matchNotOver25 = matchesPlayed - matchOver25;
  const matchNotOver35 = matchesPlayed - matchOver35;
  const matchNotOver45 = matchesPlayed - matchOver45;
  const matchNotOver55 = matchesPlayed - matchOver55;

  const firstHalfNotOver05 = matchesPlayed - firstHalfOver05;
  const firstHalfNotOver15 = matchesPlayed - firstHalfOver15;
  const firstHalfNotOver25 = matchesPlayed - firstHalfOver25;

  const secondHalfNotOver05 = matchesPlayed - secondHalfOver05;
  const secondHalfNotOver15 = matchesPlayed - secondHalfOver15;
  const secondHalfNotOver25 = matchesPlayed - secondHalfOver25;

  return {
    matchesPlayed,

    matchOver15,
    matchOver25,
    matchOver35,
    matchOver45,
    matchOver55,

    matchNotOver15,
    matchNotOver25,
    matchNotOver35,
    matchNotOver45,
    matchNotOver55,

    matchOver15Percent:
      matchesPlayed ? (matchOver15 / matchesPlayed) * 100 : 0,

    matchOver25Percent:
      matchesPlayed ? (matchOver25 / matchesPlayed) * 100 : 0,

    matchOver35Percent:
      matchesPlayed ? (matchOver35 / matchesPlayed) * 100 : 0,

    matchOver45Percent:
      matchesPlayed ? (matchOver45 / matchesPlayed) * 100 : 0,

    matchOver55Percent:
      matchesPlayed ? (matchOver55 / matchesPlayed) * 100 : 0,

    matchNotOver15Percent:
      matchesPlayed ? (matchNotOver15 / matchesPlayed) * 100 : 0,

    matchNotOver25Percent:
      matchesPlayed ? (matchNotOver25 / matchesPlayed) * 100 : 0,

    matchNotOver35Percent:
      matchesPlayed ? (matchNotOver35 / matchesPlayed) * 100 : 0,

    matchNotOver45Percent:
      matchesPlayed ? (matchNotOver45 / matchesPlayed) * 100 : 0,

    matchNotOver55Percent:
      matchesPlayed ? (matchNotOver55 / matchesPlayed) * 100 : 0,

    firstHalfOver05,
    firstHalfOver15,
    firstHalfOver25,

    firstHalfNotOver05,
    firstHalfNotOver15,
    firstHalfNotOver25,

    firstHalfOver05Percent:
      matchesPlayed ? (firstHalfOver05 / matchesPlayed) * 100 : 0,

    firstHalfOver15Percent:
      matchesPlayed ? (firstHalfOver15 / matchesPlayed) * 100 : 0,

    firstHalfOver25Percent:
      matchesPlayed ? (firstHalfOver25 / matchesPlayed) * 100 : 0,

    firstHalfNotOver05Percent:
      matchesPlayed ? (firstHalfNotOver05 / matchesPlayed) * 100 : 0,

    firstHalfNotOver15Percent:
      matchesPlayed ? (firstHalfNotOver15 / matchesPlayed) * 100 : 0,

    firstHalfNotOver25Percent:
      matchesPlayed ? (firstHalfNotOver25 / matchesPlayed) * 100 : 0,

    secondHalfOver05,
    secondHalfOver15,
    secondHalfOver25,

    secondHalfNotOver05,
    secondHalfNotOver15,
    secondHalfNotOver25,

    secondHalfOver05Percent:
      matchesPlayed ? (secondHalfOver05 / matchesPlayed) * 100 : 0,

    secondHalfOver15Percent:
      matchesPlayed ? (secondHalfOver15 / matchesPlayed) * 100 : 0,

    secondHalfOver25Percent:
      matchesPlayed ? (secondHalfOver25 / matchesPlayed) * 100 : 0,

    secondHalfNotOver05Percent:
      matchesPlayed ? (secondHalfNotOver05 / matchesPlayed) * 100 : 0,

    secondHalfNotOver15Percent:
      matchesPlayed ? (secondHalfNotOver15 / matchesPlayed) * 100 : 0,

    secondHalfNotOver25Percent:
      matchesPlayed ? (secondHalfNotOver25 / matchesPlayed) * 100 : 0,

    currentForm: getMatchResultSequenceTotal(lastMatches),

    firstHalfForm: getFirstHalfResultSequenceTotal(lastMatches),

    secondHalfForm: getSecondHalfResultSequenceTotal(lastMatches),
  };
};

export const calculateGeneralTotalsResults = (
  matches: Match[],
  lastMatchesCount = 20,
): TotalResults => {
  return calculateGeneralResultTotal(
    matches,
    lastMatchesCount,
  );
};