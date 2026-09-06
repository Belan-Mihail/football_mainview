import type { Match, Team } from "../types/football";

export type MatchResult = "W" | "D" | "L";

export type CurrentForm = Record<number, MatchResult[]>;

/**
 * Counts goals scored by both teams.
 */
const countGoals = (match: Match) => {
  let homeGoals = 0;
  let awayGoals = 0;

  for (const goal of match.goals) {
    if (goal.team === match.home_team) {
      homeGoals++;
    } else if (goal.team === match.away_team) {
      awayGoals++;
    }
  }

  return {
    homeGoals,
    awayGoals,
  };
};

/**
 * Adds one result.
 * Stores only the latest 5 matches.
 */
const addResult = (
  form: MatchResult[],
  result: MatchResult
) => {

  form.push(result);

  if (form.length > 5) {
    form.shift();
  }

};

/**
 * Updates current form after one match.
 */
const processFormMatch = (
  homeForm: MatchResult[],
  awayForm: MatchResult[],
  homeGoals: number,
  awayGoals: number
) => {

  if (homeGoals > awayGoals) {

    addResult(homeForm, "W");
    addResult(awayForm, "L");

  }

  else if (homeGoals < awayGoals) {

    addResult(homeForm, "L");
    addResult(awayForm, "W");

  }

  else {

    addResult(homeForm, "D");
    addResult(awayForm, "D");

  }

};

/**
 * Calculates current form for every team.
 */
const calculateCurrentForm = (
  matches: Match[],
  teams: Team[]
): CurrentForm => {

  const result: CurrentForm = {};

  // Create empty arrays
  for (const team of teams) {
    result[team.id] = [];
  }

  // Oldest → newest
  const sortedMatches = [...matches].sort(
    (a, b) =>
      new Date(a.match_date).getTime() -
      new Date(b.match_date).getTime()
  );

  for (const match of sortedMatches) {

    // if (match.status !== "finished") {
    //   continue;
    // }

    const { homeGoals, awayGoals } = countGoals(match);

    processFormMatch(
      result[match.home_team],
      result[match.away_team],
      homeGoals,
      awayGoals
    );

  }

  return result;

};

export default calculateCurrentForm;