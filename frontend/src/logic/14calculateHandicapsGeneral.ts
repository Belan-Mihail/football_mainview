import type { Match } from "../types/football";
import type { GeneralHandicapResults } from "../types/6HandicapTypes";

import {
  getLastMatches,
  getHandicap,
  getHandicapHalf,
  getHandicapSequence,
  getFirstHalfHandicapSequence,
  getSecondHalfHandicapSequence,
} from "../utils/matchUtils";
import { calculatePercent } from "../utils/PercentageUtils";

const calculateGeneralHandicap = (
  matches: Match[],
  side: "HOME" | "AWAY",
  lastMatchesCount: number,
): GeneralHandicapResults => {
  const matchesPlayed = matches.length;

  const lastMatches = getLastMatches(
    matches,
    lastMatchesCount,
  );

  let minus05 = 0;
  let minus15 = 0;
  let minus25 = 0;

  let plus05 = 0;
  let plus15 = 0;
  let plus25 = 0;

  let firstHalfMinus05 = 0;
  let firstHalfMinus15 = 0;

  let firstHalfPlus05 = 0;
  let firstHalfPlus15 = 0;

  let secondHalfMinus05 = 0;
  let secondHalfMinus15 = 0;

  let secondHalfPlus05 = 0;
  let secondHalfPlus15 = 0;

  matches.forEach((match) => {
    const fullTime = getHandicap(match, side);
    const firstHalf = getHandicapHalf(match, side, "FIRST_HALF");
    const secondHalf = getHandicapHalf(match, side, "SECOND_HALF");

    if (fullTime.minus05) minus05++;
    if (fullTime.minus15) minus15++;
    if (fullTime.minus25) minus25++;

    if (fullTime.plus05) plus05++;
    if (fullTime.plus15) plus15++;
    if (fullTime.plus25) plus25++;

    if (firstHalf.minus05) firstHalfMinus05++;
    if (firstHalf.minus15) firstHalfMinus15++;

    if (firstHalf.plus05) firstHalfPlus05++;
    if (firstHalf.plus15) firstHalfPlus15++;

    if (secondHalf.minus05) secondHalfMinus05++;
    if (secondHalf.minus15) secondHalfMinus15++;

    if (secondHalf.plus05) secondHalfPlus05++;
    if (secondHalf.plus15) secondHalfPlus15++;
  });

  return {
  matchesPlayed,

  minus05,
  minus15,
  minus25,

  plus05,
  plus15,
  plus25,

  minus05Percent: calculatePercent(minus05, matchesPlayed),
  minus15Percent: calculatePercent(minus15, matchesPlayed),
  minus25Percent: calculatePercent(minus25, matchesPlayed),

  plus05Percent: calculatePercent(plus05, matchesPlayed),
  plus15Percent: calculatePercent(plus15, matchesPlayed),
  plus25Percent: calculatePercent(plus25, matchesPlayed),

  firstHalfMinus05,
  firstHalfMinus15,

  firstHalfPlus05,
  firstHalfPlus15,

  firstHalfMinus05Percent: calculatePercent(
    firstHalfMinus05,
    matchesPlayed,
  ),

  firstHalfMinus15Percent: calculatePercent(
    firstHalfMinus15,
    matchesPlayed,
  ),

  firstHalfPlus05Percent: calculatePercent(
    firstHalfPlus05,
    matchesPlayed,
  ),

  firstHalfPlus15Percent: calculatePercent(
    firstHalfPlus15,
    matchesPlayed,
  ),

  secondHalfMinus05,
  secondHalfMinus15,

  secondHalfPlus05,
  secondHalfPlus15,

  secondHalfMinus05Percent: calculatePercent(
    secondHalfMinus05,
    matchesPlayed,
  ),

  secondHalfMinus15Percent: calculatePercent(
    secondHalfMinus15,
    matchesPlayed,
  ),

  secondHalfPlus05Percent: calculatePercent(
    secondHalfPlus05,
    matchesPlayed,
  ),

  secondHalfPlus15Percent: calculatePercent(
    secondHalfPlus15,
    matchesPlayed,
  ),

  currentForm: getHandicapSequence(lastMatches, side),

  firstHalfForm: getFirstHalfHandicapSequence(
    lastMatches,
    side,
  ),

  secondHalfForm: getSecondHalfHandicapSequence(
    lastMatches,
    side,
  ),
};
};

export const calculateGeneralHandicapResults = (
  matches: Match[],
  side: "HOME" | "AWAY",
  lastMatchesCount = 20,
): GeneralHandicapResults => {
  return calculateGeneralHandicap(
    matches,
    side,
    lastMatchesCount,
  );
};