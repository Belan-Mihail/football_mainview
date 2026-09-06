import type { Match, Team } from "../types/football";

export interface StandingRow {
  teamId: number;
  teamName: string;

  played: number;

  wins: number;
  draws: number;
  losses: number;

  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;

  points: number;
}

/**
 * Creates an empty standings row for a team.
 */
const createEmptyRow = (team: Team): StandingRow => ({
  teamId: team.id,
  teamName: team.name,

  played: 0,

  wins: 0,
  draws: 0,
  losses: 0,

  goalsFor: 0,
  goalsAgainst: 0,
  goalDifference: 0,

  points: 0,
});

/**
 * Counts goals scored by both teams in a match.
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
 * Updates standings for both teams after one finished match.
 */
const processMatchResult = (
  homeRow: StandingRow,
  awayRow: StandingRow,
  homeGoals: number,
  awayGoals: number
) => {

  // Update matches played
  homeRow.played++;
  awayRow.played++;

  // Update goals
  homeRow.goalsFor += homeGoals;
  homeRow.goalsAgainst += awayGoals;

  awayRow.goalsFor += awayGoals;
  awayRow.goalsAgainst += homeGoals;

  // Home team wins
  if (homeGoals > awayGoals) {
    homeRow.wins++;
    homeRow.points += 3;

    awayRow.losses++;
  }

  // Away team wins
  else if (homeGoals < awayGoals) {
    awayRow.wins++;
    awayRow.points += 3;

    homeRow.losses++;
  }

  // Draw
  else {
    homeRow.draws++;
    awayRow.draws++;

    homeRow.points++;
    awayRow.points++;
  }
};

/**
 * Calculates goal difference for every team.
 */
const updateGoalDifference = (rows: StandingRow[]) => {
  for (const row of rows) {
    row.goalDifference =
      row.goalsFor - row.goalsAgainst;
  }
};

/**
 * Sorts standings according to football rules.
 */
const sortStandings = (rows: StandingRow[]) => {
  rows.sort((a, b) => {

    // Points
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    // Goal difference
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }

    // Goals scored
    return b.goalsFor - a.goalsFor;
  });
};

/**
 * Calculates tournament standings from matches.
 */
const calculateStandings = (
  matches: Match[],
  teams: Team[]
): StandingRow[] => {

  // Create standings table for all teams
  const standings: Record<number, StandingRow> = {};

  for (const team of teams) {
    standings[team.id] = createEmptyRow(team);
  }

  // Process every finished match
  for (const match of matches) {

    if (match.status != "finished") {
        continue;
    }

    const homeRow = standings[match.home_team];
    const awayRow = standings[match.away_team];

    const { homeGoals, awayGoals } = countGoals(match);

    processMatchResult(
      homeRow,
      awayRow,
      homeGoals,
      awayGoals
    );
  }


  const result = Object.values(standings);

  updateGoalDifference(result);

  sortStandings(result);

  return result;
};

export default calculateStandings;