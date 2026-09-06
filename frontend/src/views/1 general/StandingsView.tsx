import { useMemo } from "react";
import type { ViewProps } from "../../config/panelConfig";
import useFilteredMatches from "../../hooks/useFilteredMatches";
import calculateStandings from "../../logic/3calculateStandingResult";
import calculateCurrentForm from "../../logic/4calculateCurrentForm";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const StandingsView: React.FC<ViewProps> = ({ data, filter }) => {
  const language = useLanguage();
  const t = translations[language];
  
  const filteredMatches = useFilteredMatches(data, filter);

  const standings = useMemo(() => {
  if (!data) return [];

  const teamIds = new Set<number>();

  for (const match of filteredMatches) {
    teamIds.add(match.home_team);
    teamIds.add(match.away_team);
  }

  const filteredTeams = data.teams.filter(
    (team) => teamIds.has(team.id)
  );

  return calculateStandings(
    filteredMatches,
    filteredTeams
  );
}, [filteredMatches, data]);

  const currentForm = useMemo(() => {
    if (!data) return {};

    return calculateCurrentForm(filteredMatches, data.teams);
  }, [filteredMatches, data]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  return (
    <div className="rounded border bg-white shadow-sm">
      <div className="border-b px-3 py-2">
        <h2 className="text-lg font-semibold">{t.views.standings}</h2>
      </div>

      <div className="overflow-x-auto rounded">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-2 py-1 text-center w-10">#</th>

              <th className="border-b px-2 py-1 text-left">Team</th>

              <th className="border-b px-2 py-1 text-center w-10">P</th>

              <th className="border-b px-2 py-1 text-center w-10">W</th>

              <th className="border-b px-2 py-1 text-center w-10">D</th>

              <th className="border-b px-2 py-1 text-center w-10">L</th>

              <th className="border-b px-2 py-1 text-center w-10">GF</th>

              <th className="border-b px-2 py-1 text-center w-10">GA</th>

              <th className="border-b px-2 py-1 text-center w-10">GD</th>

              <th className="border-b px-2 py-1 text-center w-12 font-semibold">
                Pts
              </th>
              <th className="border-b px-2 py-1 text-center">Form</th>
            </tr>
          </thead>

          <tbody>
            {standings.map((team, index) => (
              <tr key={team.teamId} className="hover:bg-gray-50">
                <td className="border-b px-2 py-1 text-center">{index + 1}</td>

                <td className="border-b px-2 py-1 whitespace-nowrap">
                  {team.teamName}
                </td>

                <td className="border-b px-2 py-1 text-center">
                  {team.played}
                </td>

                <td className="border-b px-2 py-1 text-center">{team.wins}</td>

                <td className="border-b px-2 py-1 text-center">{team.draws}</td>

                <td className="border-b px-2 py-1 text-center">
                  {team.losses}
                </td>

                <td className="border-b px-2 py-1 text-center">
                  {team.goalsFor}
                </td>

                <td className="border-b px-2 py-1 text-center">
                  {team.goalsAgainst}
                </td>

                <td className="border-b px-2 py-1 text-center">
                  {team.goalDifference > 0
                    ? `+${team.goalDifference}`
                    : team.goalDifference}
                </td>

                <td className="border-b px-2 py-1 text-center font-semibold">
                  {team.points}
                </td>
                <td className="border-b px-2 py-1">
                  <div className="flex justify-center gap-1">
                    {(currentForm[team.teamId] ?? []).map((result, index) => (
                      <div
                        key={index}
                        className={`h-3 w-3 rounded-full ${
                          result === "W"
                            ? "bg-green-500"
                            : result === "D"
                              ? "bg-gray-400"
                              : "bg-red-500"
                        }`}
                        title={result}
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandingsView;
