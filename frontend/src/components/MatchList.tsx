import { useMemo } from "react";
import { Link } from "react-router-dom";

import type { Match, Round, Team } from "../types/football";

import MatchRow from "./MatchRow";
import useLanguage from "../hooks/useLanguage";
import { translations } from "../i18n/translations";

interface MatchListProps {
  matches: Match[];
  rounds: Round[];
  teams: Team[];

  reverseRounds?: boolean;
  roundLinks?: boolean;
  championshipSlug?: string;
}

const MatchList: React.FC<MatchListProps> = ({
  matches,
  rounds,
  teams,
  reverseRounds = false,
  roundLinks = false,
  championshipSlug,
}) => {
  const language = useLanguage();
  const t = translations[language];

  const groupedRounds = useMemo(() => {
    const groups = rounds
      .map((round) => ({
        round,
        matches: matches.filter(
          (match) => match.round === round.id
        ),
      }))
      .filter((group) => group.matches.length > 0);

    groups.sort((a, b) =>
      reverseRounds
        ? b.round.number - a.round.number
        : a.round.number - b.round.number
    );

    return groups;
  }, [matches, rounds, reverseRounds]);

  return (
    <div className="rounded border bg-white shadow-sm">
      {groupedRounds.map((group) => (
        <div
          key={group.round.id}
          className="border-b last:border-b-0"
        >
          <div className="bg-gray-100 px-2 py-1 text-sm font-semibold">
            {roundLinks && championshipSlug ? (
              <Link
                to={`/${language}/championship/${championshipSlug}/round/${group.round.season}/${group.round.number}`}
                className="hover:underline"
              >
                {t.common.Round} {group.round.number}
              </Link>
            ) : (
              <>
                {t.common.Round} {group.round.number}
              </>
            )}
          </div>

          {group.matches.map((match) => {
            const homeTeam = teams.find(
              (team) => team.id === match.home_team
            );

            const awayTeam = teams.find(
              (team) => team.id === match.away_team
            );

            if (!homeTeam || !awayTeam) {
              return null;
            }

            return (
              <MatchRow
                key={match.id}
                match={match}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MatchList;