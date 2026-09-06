import type { Match } from "../types/football";
import type {
  CategoryHandicapResults,
  CategoryHandicapResultsMap,
} from "../types/6HandicapTypes";

import {
  getHandicapCategory,
  getHandicapCategoryHalf,
  getCategoryHandicapSequence,
  getFirstHalfCategoryHandicapSequence,
  getSecondHalfCategoryHandicapSequence,
} from "../utils/matchUtils";

import { defineTeamLevel } from "../utils/5defineTeamLevel";

import { calculatePercent } from "../utils/PercentageUtils";

const MIN_CATEGORY_MATCHES = 3;

type Side = "HOME" | "AWAY";

interface CategoryMatch {
  match: Match;
  side: Side;
}

const createEmptyCategory = (): CategoryHandicapResults => {
  return {
    matchesPlayed: 0,

    handicap05: 0,
    handicap15: 0,
    handicap25: 0,

    handicap05Percent: 0,
    handicap15Percent: 0,
    handicap25Percent: 0,

    firstHalfHandicap05: 0,
    firstHalfHandicap15: 0,

    firstHalfHandicap05Percent: 0,
    firstHalfHandicap15Percent: 0,

    secondHalfHandicap05: 0,
    secondHalfHandicap15: 0,

    secondHalfHandicap05Percent: 0,
    secondHalfHandicap15Percent: 0,

    fullTime05Form: [],
    fullTime15Form: [],
    fullTime25Form: [],

    firstHalf05Form: [],
    firstHalf15Form: [],

    secondHalf05Form: [],
    secondHalf15Form: [],
  };
};


const calculateCategoryHandicap = (
  categoryMatches: CategoryMatch[],
  lastMatchesCount: number,
): CategoryHandicapResults => {

  const matchesPlayed =
    categoryMatches.length;


  let handicap05 = 0;
  let handicap15 = 0;
  let handicap25 = 0;

  let firstHalfHandicap05 = 0;
  let firstHalfHandicap15 = 0;

  let secondHalfHandicap05 = 0;
  let secondHalfHandicap15 = 0;


  // ==========================================================
  // STATISTICS
  // ==========================================================

  categoryMatches.forEach(
    ({ match, side }) => {

      const full =
        getHandicapCategory(
          match,
          side,
        );

      const first =
        getHandicapCategoryHalf(
          match,
          side,
          "FIRST_HALF",
        );

      const second =
        getHandicapCategoryHalf(
          match,
          side,
          "SECOND_HALF",
        );


      if (full.handicap05) {
        handicap05++;
      }

      if (full.handicap15) {
        handicap15++;
      }

      if (full.handicap25) {
        handicap25++;
      }


      if (first.handicap05) {
        firstHalfHandicap05++;
      }

      if (first.handicap15) {
        firstHalfHandicap15++;
      }


      if (second.handicap05) {
        secondHalfHandicap05++;
      }

      if (second.handicap15) {
        secondHalfHandicap15++;
      }

    },
  );


  // ==========================================================
  // LAST MATCHES
  // ==========================================================

  const lastCategoryMatches =
    [...categoryMatches]
      .sort(
        (a, b) =>
          new Date(
            a.match.match_date,
          ).getTime() -
          new Date(
            b.match.match_date,
          ).getTime(),
      )
      .slice(-lastMatchesCount);




  const fullTime05Form =
    lastCategoryMatches.map(
      ({ match, side }) =>
        getCategoryHandicapSequence(
          [match],
          side,
        )[0].handicap05,
    );

    const fullTime15Form =
    lastCategoryMatches.map(
      ({ match, side }) =>
        getCategoryHandicapSequence(
          [match],
          side,
        )[0].handicap15,
    );

    const fullTime25Form =
    lastCategoryMatches.map(
      ({ match, side }) =>
        getCategoryHandicapSequence(
          [match],
          side,
        )[0].handicap25,
    );


  const firstHalf05Form =
    lastCategoryMatches.map(
      ({ match, side }) =>
        getFirstHalfCategoryHandicapSequence(
          [match],
          side,
        )[0].handicap05,
    );

    const firstHalf15Form =
    lastCategoryMatches.map(
      ({ match, side }) =>
        getFirstHalfCategoryHandicapSequence(
          [match],
          side,
        )[0].handicap15,
    );


  const secondHalf05Form =
    lastCategoryMatches.map(
      ({ match, side }) =>
        getSecondHalfCategoryHandicapSequence(
          [match],
          side,
        )[0].handicap05,
    );

    const secondHalf15Form =
    lastCategoryMatches.map(
      ({ match, side }) =>
        getSecondHalfCategoryHandicapSequence(
          [match],
          side,
        )[0].handicap15,
    );


  return {
    matchesPlayed,

    handicap05,
    handicap15,
    handicap25,

    handicap05Percent:
      calculatePercent(
        handicap05,
        matchesPlayed,
      ),

    handicap15Percent:
      calculatePercent(
        handicap15,
        matchesPlayed,
      ),
    
    handicap25Percent:
      calculatePercent(
        handicap25,
        matchesPlayed,
      ),


    firstHalfHandicap05,
    firstHalfHandicap15,

    firstHalfHandicap05Percent:
      calculatePercent(
        firstHalfHandicap05,
        matchesPlayed,
      ),

    firstHalfHandicap15Percent:
      calculatePercent(
        firstHalfHandicap15,
        matchesPlayed,
      ),


    secondHalfHandicap05,
    secondHalfHandicap15,

    secondHalfHandicap05Percent:
      calculatePercent(
        secondHalfHandicap05,
        matchesPlayed,
      ),

    secondHalfHandicap15Percent:
      calculatePercent(
        secondHalfHandicap15,
        matchesPlayed,
      ),


    fullTime05Form,
    fullTime15Form,
    fullTime25Form,

    firstHalf05Form,
    firstHalf15Form,

    secondHalf05Form,
    secondHalf15Form
  };
};


// ============================================================
// PUBLIC CALCULATOR
// ============================================================

export const calculateCategoryHandicapResults = (
  matches: Match[],
  lastMatchesCount = 20,
): CategoryHandicapResultsMap => {

  const categoryMatches: Record<
    string,
    CategoryMatch[]
  > = {};


  // ==========================================================
  // COLLECT BOTH TEAMS
  // ==========================================================

  matches.forEach((match) => {

    const homeCategory =
      defineTeamLevel(
        match.home_odds,
      );

    const awayCategory =
      defineTeamLevel(
        match.away_odds,
      );


    // --------------------------------------------------------
    // HOME TEAM
    // --------------------------------------------------------

    if (!categoryMatches[homeCategory]) {
      categoryMatches[homeCategory] = [];
    }

    categoryMatches[homeCategory].push({
      match,
      side: "HOME",
    });


    // --------------------------------------------------------
    // AWAY TEAM
    // --------------------------------------------------------

    if (!categoryMatches[awayCategory]) {
      categoryMatches[awayCategory] = [];
    }

    categoryMatches[awayCategory].push({
      match,
      side: "AWAY",
    });

  });


  // ==========================================================
  // CALCULATE EACH CATEGORY
  // ==========================================================

  const result: CategoryHandicapResultsMap = {};


  Object.entries(categoryMatches).forEach(
    ([category, categoryMatchList]) => {

      if (
        categoryMatchList.length <
        MIN_CATEGORY_MATCHES
      ) {
        return;
      }

      result[category] =
        calculateCategoryHandicap(
          categoryMatchList,
          lastMatchesCount,
        );

    },
  );


  return result;
};