export interface Championship {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  championship: number;

  name: string;

  short_name: string;
  code: string;

  status: "active" | "inactive";
}

export interface Season {
  id: number;
  championship: number;

  name: string;

  status: "active" | "finished";

  teams: number[];
}

export interface Round {
  id: number;

  championship: number;
  season: number;

  number: number;

  status: "scheduled" | "live" | "finished";
}

export interface Goal {
  id: number;

  match: number;
  team: number;

  minute: number;
}

export interface MatchStats {
  id: number;

  match: number;

  home_corners: number;
  away_corners: number;

  home_shots: number;
  away_shots: number;

  home_shots_on_target: number;
  away_shots_on_target: number;

  home_yellow_cards: number;
  away_yellow_cards: number;

  home_red_cards: number;
  away_red_cards: number;

  home_xg: string;
  away_xg: string;
}

export interface Match {
  id: number;

  championship: number;
  season: number;
  round: number;

  home_team: number;
  away_team: number;

  home_odds: number | null;
  away_odds: number | null;

  match_date: string;
  odds_date: string;

  display_name: string | null;

  status: "scheduled" | "live" | "finished";

  goals: Goal[];

  stats: MatchStats | null;
}

export interface ChampionshipData {
  championship: Championship;

  teams: Team[];
  seasons: Season[];
  rounds: Round[];

  matches: Match[];
}

export interface MatchFilter {
  seasonFrom: number;
  roundFrom: number;

  seasonTo: number;
  roundTo: number;
}

export interface RoundData {
  championship: Championship;
  season: Season;
  round: Round;
  teams: Team[];
  matches: Match[];
}