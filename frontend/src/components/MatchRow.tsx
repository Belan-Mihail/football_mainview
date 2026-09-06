import type { Match, Team } from "../types/football";
import { defineTeamLevel } from "../utils/5defineTeamLevel";

interface MatchRowProps {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
}

const MatchRow: React.FC<MatchRowProps> = ({
  match,
  homeTeam,
  awayTeam,
}) => {
  const homeGoals = match.goals.filter(
    (goal) => goal.team === homeTeam.id
  ).length;

  const awayGoals = match.goals.filter(
    (goal) => goal.team === awayTeam.id
  ).length;

  return (
    <>
      {/* Desktop */}
      <div className="hidden min-[800px]:flex justify-center py-1">
        <div className="inline-grid grid-cols-[36px_180px_60px_180px_36px] gap-x-2 text-xs">

          <div className="text-center font-semibold text-blue-700">
            {match.home_odds ? defineTeamLevel(match.home_odds) : ""}
          </div>

          <div className="truncate">
            {homeTeam.short_name}
          </div>

          <div className="text-center font-semibold">
            {match.status === "finished"
              ? `${homeGoals}:${awayGoals}`
              : new Date(match.match_date).toLocaleString([], {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </div>

          <div className="truncate text-right">
            {awayTeam.short_name}
          </div>

          <div className="text-center font-semibold text-blue-700">
            {match.away_odds ? defineTeamLevel(match.away_odds) : ""}
          </div>

          <div />

          <div className="text-xs text-gray-500">
            {match.home_odds?.toFixed(2)}
          </div>

          <div />

          <div className="text-right text-xs text-gray-500">
            {match.away_odds?.toFixed(2)}
          </div>

          <div />
        </div>
      </div>

      {/* Mobile */}
      <div className="min-[800px]:hidden border-b py-2 px-2">

        <div className="flex items-center justify-between text-xs">

          <div className="flex min-w-0 items-center gap-1">
            <span className="font-semibold text-blue-700">
              {match.home_odds ? defineTeamLevel(match.home_odds) : ""}
            </span>

            <span className="truncate">
              {homeTeam.name}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-1">
            <span className="truncate text-right">
              {awayTeam.name}
            </span>

            <span className="font-semibold text-blue-700">
              {match.away_odds ? defineTeamLevel(match.away_odds) : ""}
            </span>
          </div>

        </div>

        <div className="mt-1 flex items-center justify-center gap-6 text-xs">

          <span className="text-gray-500">
            {match.home_odds?.toFixed(2)}
          </span>

          <span className="font-semibold">
            {match.status === "finished"
              ? `${homeGoals}:${awayGoals}`
              : new Date(match.match_date).toLocaleString([], {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </span>

          <span className="text-gray-500">
            {match.away_odds?.toFixed(2)}
          </span>

        </div>

      </div>
    </>
  );
};

export default MatchRow;