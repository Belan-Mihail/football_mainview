import type { Match } from "../types/football";
import type { GeneralBTTSResults } from "../types/BTTS";

import {
    getFirstHalfResultSequenceBTTS,
  getLastMatches,
  getMatchResultBTTS,
  getMatchResultSequenceBTTS,
  getSecondHalfResultSequenceBTTS,
} from "../utils/matchUtils";

const calculateBTTSGroup = (
  matches: Match[],
  lastMatchesCount: number,
): GeneralBTTSResults => {

  const matchesPlayed = matches.length;

  const lastMatches = getLastMatches(
    matches,
    lastMatchesCount,
  );

  let yes = 0;
  let no = 0;

  let firstHalfYes = 0;
  let firstHalfNo = 0;

  let secondHalfYes = 0;
  let secondHalfNo = 0;

  matches.forEach((match) => {

    const fullTime =
      getMatchResultBTTS(match, "MATCH");

    const firstHalf =
      getMatchResultBTTS(match, "FIRST_HALF");

    const secondHalf =
      getMatchResultBTTS(match, "SECOND_HALF");

    if (fullTime) {
      yes++;
    } else {
      no++;
    }

    if (firstHalf) {
      firstHalfYes++;
    } else {
      firstHalfNo++;
    }

    if (secondHalf) {
      secondHalfYes++;
    } else {
      secondHalfNo++;
    }

  });

  return {

    matchesPlayed,

    yes,
    no,

    yesPercent:
      matchesPlayed > 0
        ? yes / matchesPlayed * 100
        : 0,

    noPercent:
      matchesPlayed > 0
        ? no / matchesPlayed * 100
        : 0,

    firstHalfYes,
    firstHalfNo,

    firstHalfYesPercent:
      matchesPlayed > 0
        ? firstHalfYes / matchesPlayed * 100
        : 0,

    firstHalfNoPercent:
      matchesPlayed > 0
        ? firstHalfNo / matchesPlayed * 100
        : 0,

    secondHalfYes,
    secondHalfNo,

    secondHalfYesPercent:
      matchesPlayed > 0
        ? secondHalfYes / matchesPlayed * 100
        : 0,

    secondHalfNoPercent:
      matchesPlayed > 0
        ? secondHalfNo / matchesPlayed * 100
        : 0,

    currentForm:
      getMatchResultSequenceBTTS(
        lastMatches,
      ),

    firstHalfForm:
      getFirstHalfResultSequenceBTTS(
        lastMatches,
      ),

    secondHalfForm:
      getSecondHalfResultSequenceBTTS(
        lastMatches,
      ),
  };

};

export const calculateBTTSResults = (
  matches: Match[],
  lastMatchesCount = 20,
): GeneralBTTSResults => {

  return calculateBTTSGroup(
    matches,
    lastMatchesCount,
  );

}; 