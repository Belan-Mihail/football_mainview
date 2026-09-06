import type { Match } from "../types/football";
import type {
  FavoriteHandicapResults,
  FavoriteHandicapStatistics,
} from "../types/6HandicapTypes";

import {
  getLastMatches,
  getHandicapFavorite,
  getHandicapHalfFav,
  getFavoriteHandicapSequence,
  getFirstHalfFavoriteHandicapSequence,
  getSecondHalfFavoriteHandicapSequence,
} from "../utils/matchUtils";

import { calculatePercent } from "../utils/PercentageUtils";

const calculateFavoriteHandicap = (
  matches: Match[],
  type: "FAVORITE" | "NON_FAVORITE" | "STRONG_FAVORITE",
  lastMatchesCount: number,
): FavoriteHandicapResults => {
  const matchesPlayed =
    type === "STRONG_FAVORITE"
      ? matches.filter((m) => getHandicapFavorite(m).strongFavoriteMinus05 !== null)
        .length
      : matches.length;

  const lastMatches = getLastMatches(matches, lastMatchesCount);

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
    const full = getHandicapFavorite(match);
    const first = getHandicapHalfFav(match, "FIRST_HALF");
    const second = getHandicapHalfFav(match, "SECOND_HALF");

    switch (type) {
      case "FAVORITE":
        if (full.favoriteMinus05) minus05++;
        if (full.favoriteMinus15) minus15++;
        if (full.favoriteMinus25) minus25++;

        if (first.favoriteMinus05) firstHalfMinus05++;
        if (first.favoriteMinus15) firstHalfMinus15++;

        if (second.favoriteMinus05) secondHalfMinus05++;
        if (second.favoriteMinus15) secondHalfMinus15++;
        break;

      case "NON_FAVORITE":
        if (full.nonFavoritePlus05) plus05++;
        if (full.nonFavoritePlus15) plus15++;
        if (full.nonFavoritePlus25) plus25++;

        if (first.nonFavoritePlus05) firstHalfPlus05++;
        if (first.nonFavoritePlus15) firstHalfPlus15++;

        if (second.nonFavoritePlus05) secondHalfPlus05++;
        if (second.nonFavoritePlus15) secondHalfPlus15++;
        break;

      case "STRONG_FAVORITE":
        if (full.strongFavoriteMinus05 !== null) {
          if (full.strongFavoriteMinus05) minus05++;
          if (full.strongFavoriteMinus15) minus15++;
          if (full.strongFavoriteMinus25) minus25++;

          if (first.strongFavoriteMinus05) firstHalfMinus05++;
          if (first.strongFavoriteMinus15) firstHalfMinus15++;

          if (second.strongFavoriteMinus05) secondHalfMinus05++;
          if (second.strongFavoriteMinus15) secondHalfMinus15++;
        }
        break;
    }
  });

  const fullSequence = getFavoriteHandicapSequence(lastMatches);
  const firstSequence =
    getFirstHalfFavoriteHandicapSequence(lastMatches);
  const secondSequence =
    getSecondHalfFavoriteHandicapSequence(lastMatches);

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

    fullTime05Form: fullSequence
      .map((x) =>
        type === "FAVORITE"
          ? x.favoriteMinus05
          : type === "NON_FAVORITE"
            ? x.nonFavoritePlus05
            : x.strongFavoriteMinus05,
      )
      .filter((x): x is boolean => x !== null),

    fullTime15Form: fullSequence
      .map((x) =>
        type === "FAVORITE"
          ? x.favoriteMinus15
          : type === "NON_FAVORITE"
            ? x.nonFavoritePlus15
            : x.strongFavoriteMinus15,
      )
      .filter((x): x is boolean => x !== null),

    fullTime25Form: fullSequence
      .map((x) =>
        type === "FAVORITE"
          ? x.favoriteMinus25
          : type === "NON_FAVORITE"
            ? x.nonFavoritePlus25
            : x.strongFavoriteMinus25,
      )
      .filter((x): x is boolean => x !== null),
    
    firstHalf05Form: firstSequence
  .map((x) =>
    type === "FAVORITE"
      ? x.favoriteMinus05
      : type === "NON_FAVORITE"
      ? x.nonFavoritePlus05
      : x.strongFavoriteMinus05,
  )
  .filter((x): x is boolean => x !== null),

firstHalf15Form: firstSequence
  .map((x) =>
    type === "FAVORITE"
      ? x.favoriteMinus15
      : type === "NON_FAVORITE"
      ? x.nonFavoritePlus15
      : x.strongFavoriteMinus15,
  )
  .filter((x): x is boolean => x !== null),

    secondHalf05Form: secondSequence
  .map((x) =>
    type === "FAVORITE"
      ? x.favoriteMinus05
      : type === "NON_FAVORITE"
      ? x.nonFavoritePlus05
      : x.strongFavoriteMinus05,
  )
  .filter((x): x is boolean => x !== null),

secondHalf15Form: secondSequence
  .map((x) =>
    type === "FAVORITE"
      ? x.favoriteMinus15
      : type === "NON_FAVORITE"
      ? x.nonFavoritePlus15
      : x.strongFavoriteMinus15,
  )
  .filter((x): x is boolean => x !== null),

  };
};

export const calculateFavoriteHandicapResults = (
  matches: Match[],
  lastMatchesCount = 20,
): FavoriteHandicapStatistics => {
  return {
    favorites: calculateFavoriteHandicap(
      matches,
      "FAVORITE",
      lastMatchesCount,
    ),

    nonFavorites: calculateFavoriteHandicap(
      matches,
      "NON_FAVORITE",
      lastMatchesCount,
    ),

    strongFavorites: calculateFavoriteHandicap(
      matches,
      "STRONG_FAVORITE",
      lastMatchesCount,
    ),
  };
};