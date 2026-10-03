import { useMemo, useState } from "react";

import type { TeamViewProps } from "../config/teamPanelConfig";
import { calculateGeneralStatistics } from "../logic/2TeamsGeneralStatistics";
import useLanguage from "../../hooks/useLanguage";
import { teamTranslations } from "../config/teamTranslations";

const TeamOverviewView: React.FC<TeamViewProps> = ({
  data,
  matches,
}) => {
  const [side, setSide] = useState<"ALL" | "HOME" | "AWAY">("ALL");

  const language = useLanguage();
  const t = teamTranslations[language];

  const filteredMatches = useMemo(() => {
    if (side === "ALL") {
      return matches;
    }

    if (side === "HOME") {
      return matches.filter(
        (match) => match.home_team === data.team.id,
      );
    }

    return matches.filter(
      (match) => match.away_team === data.team.id,
    );
  }, [matches, side, data.team.id]);

  const stats = useMemo(() => {
    return calculateGeneralStatistics(
      filteredMatches,
      data.team.id,
    );
  }, [filteredMatches, data.team.id]);

  const getPercent = (
    value: number,
    total: number,
  ): string => {
    if (total === 0) {
      return "0%";
    }

    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const getAverage = (
    value: number,
    total: number,
  ): number => {
    if (total === 0 || value === 0) {
      return 0;
    }

    return Number((value / total).toFixed(2));
  };

  const StatValue = ({
    value,
    total,
  }: {
    value: number;
    total?: number;
  }) => (
    <div className="text-lg font-semibold text-gray-900">
      {value}

      {total !== undefined && (
        <span className="ml-1 text-xs font-normal text-gray-500">
          ({getPercent(value, total)})
        </span>
      )}
    </div>
  );

  const getSectionTitle = (): string => {
    if (side === "HOME") {
      return t.common.homeMatches;
    }

    if (side === "AWAY") {
      return t.common.awayMatches;
    }

    return t.common.allMatches;
  };

  return (
    <div className="space-y-3 p-2 sm:p-3">

      {/* =====================================================
          HEADER / MATCH FILTER
      ===================================================== */}

      <div className="rounded-lg border bg-white p-3 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-2">

          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              {t.common.teamOverview}
            </h2>

            <div className="mt-1 text-xs text-gray-500">
              {getSectionTitle()}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">

            <button
              onClick={() => setSide("ALL")}
              className={`rounded px-3 py-1 text-sm ${
                side === "ALL"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.all}
            </button>

            <button
              onClick={() => setSide("HOME")}
              className={`rounded px-3 py-1 text-sm ${
                side === "HOME"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.home}
            </button>

            <button
              onClick={() => setSide("AWAY")}
              className={`rounded px-3 py-1 text-sm ${
                side === "AWAY"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.away}
            </button>

            <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
              {filteredMatches.length} {t.common.matches}
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          GOALS
      ===================================================== */}

      <section className="rounded-lg border bg-white shadow-sm">

        <div className="border-b px-3 py-2">

          <h2 className="text-sm font-semibold text-gray-900">
            {t.common.goals}
          </h2>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5">

          {/* GOALS FOR */}

          <div className="border-b p-3 text-center sm:border-b-0 sm:border-r">
            <div className="text-xs text-gray-500">
              {t.common.goalsFor}
            </div>

            <div className="mt-1 text-lg font-semibold text-gray-900">
              {stats.totalTeamGoals}
            </div>
          </div>


          {/* GOALS AGAINST */}

          <div className="border-b p-3 text-center sm:border-b-0 sm:border-r">
            <div className="text-xs text-gray-500">
              {t.common.goalsAgainst}
            </div>

            <div className="mt-1 text-lg font-semibold text-gray-900">
              {stats.totalTeamConcededGoals}
            </div>
          </div>


          {/* GOAL DIFFERENCE */}

          <div className="border-b p-3 text-center sm:border-b-0 sm:border-r">
            <div className="text-xs text-gray-500">
              {t.common.goalDifference}
            </div>

            <div className="mt-1 text-lg font-semibold text-gray-900">
              {stats.totalTeamGoals -
                stats.totalTeamConcededGoals >
              0
                ? `+${
                    stats.totalTeamGoals -
                    stats.totalTeamConcededGoals
                  }`
                : stats.totalTeamGoals -
                  stats.totalTeamConcededGoals}
            </div>
          </div>


          {/* AVERAGE GOALS FOR */}

          <div className="border-b p-3 text-center sm:border-b-0 sm:border-r">
            <div className="text-xs text-gray-500">
              {t.common.averageGoalsFor}
            </div>

            <div className="mt-1 text-lg font-semibold text-gray-900">
              {getAverage(
                stats.totalTeamGoals,
                stats.matchesPlayed,
              )}
            </div>
          </div>


          {/* AVERAGE GOALS AGAINST */}

          <div className="p-3 text-center">
            <div className="text-xs text-gray-500">
              {t.common.averageGoalsAgainst}
            </div>

            <div className="mt-1 text-lg font-semibold text-gray-900">
              {getAverage(
                stats.totalTeamConcededGoals,
                stats.matchesPlayed,
              )}
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          RESULTS
      ===================================================== */}

      <section className="rounded-lg border bg-white shadow-sm">

        <div className="border-b px-3 py-2">

          <h2 className="text-sm font-semibold text-gray-900">
            {t.common.results}
          </h2>

        </div>

        <div className="grid grid-cols-2 divide-x sm:grid-cols-4 border-b">

          {/* WINS */}

          <div className="border-b p-3 text-center sm:border-b-0">
            <div className="text-xs text-gray-500">
              {t.common.wins}
            </div>

            <StatValue
              value={stats.totalWins}
              total={stats.matchesPlayed}
            />
          </div>


          {/* DRAWS */}

          <div className="border-b p-3 text-center sm:border-b-0">
            <div className="text-xs text-gray-500">
              {t.common.draws}
            </div>

            <StatValue
              value={stats.totalDraws}
              total={stats.matchesPlayed}
            />
          </div>


          {/* LOSSES */}

          <div className="border-b p-3 text-center sm:border-b-0">
            <div className="text-xs text-gray-500">
              {t.common.losses}
            </div>

            <StatValue
              value={stats.totalLoss}
              total={stats.matchesPlayed}
            />
          </div>


          {/* POINTS */}

          <div className="p-3 text-center">
            <div className="text-xs text-gray-500">
              {t.common.points}
            </div>

            <div className="mt-1 text-lg font-semibold text-gray-900">
              {stats.totalWins * 3 + stats.totalDraws}
            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 divide-x sm:grid-cols-4 border-b">

          {/* WINS */}

          <div className="border-b p-3 text-center sm:border-b-0">
            <div className="text-xs text-gray-500">
              {t.common.firstHalfWins}
            </div>

            <StatValue
              value={stats.totalWinsFirstHalf}
              total={stats.matchesPlayed}
            />
          </div>


          {/* DRAWS */}

          <div className="border-b p-3 text-center sm:border-b-0">
            <div className="text-xs text-gray-500">
              {t.common.firstHalfDraws}
            </div>

            <StatValue
              value={stats.totalDrawsFirstHalf}
              total={stats.matchesPlayed}
            />
          </div>


          {/* LOSSES */}

          <div className="border-b p-3 text-center sm:border-b-0">
            <div className="text-xs text-gray-500">
              {t.common.firstHalfLosses}
            </div>

            <StatValue
              value={stats.totalLossFirstHalf}
              total={stats.matchesPlayed}
            />
          </div>


          {/* POINTS */}

          <div className="p-3 text-center">
            <div className="text-xs text-gray-500">
              {t.common.points}
            </div>

            <div className="mt-1 text-lg font-semibold text-gray-900">
              {stats.totalWinsFirstHalf * 3 + stats.totalDrawsFirstHalf}
            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 divide-x sm:grid-cols-4">

          {/* WINS */}

          <div className="border-b p-3 text-center sm:border-b-0">
            <div className="text-xs text-gray-500">
              {t.common.secondHalfWins}
            </div>

            <StatValue
              value={stats.totalWinsSecondHalf}
              total={stats.matchesPlayed}
            />
          </div>


          {/* DRAWS */}

          <div className="border-b p-3 text-center sm:border-b-0">
            <div className="text-xs text-gray-500">
              {t.common.secondHalfDraws}
            </div>

            <StatValue
              value={stats.totalDrawsSecondHalf}
              total={stats.matchesPlayed}
            />
          </div>


          {/* LOSSES */}

          <div className="border-b p-3 text-center sm:border-b-0">
            <div className="text-xs text-gray-500">
              {t.common.secondHalfLosses}
            </div>

            <StatValue
              value={stats.totalLossSecondHalf}
              total={stats.matchesPlayed}
            />
          </div>


          {/* POINTS */}

          <div className="p-3 text-center">
            <div className="text-xs text-gray-500">
              {t.common.points}
            </div>

            <div className="mt-1 text-lg font-semibold text-gray-900">
              {stats.totalWinsSecondHalf * 3 + stats.totalDrawsSecondHalf}
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          BTTS & CLEAN SHEETS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        {/* ===================================================
            BTTS
        =================================================== */}

        <section className="rounded-lg border bg-white shadow-sm">

          <div className="border-b px-3 py-2">

            <h2 className="text-sm font-semibold text-gray-900">
              {t.common.bothTeamsToScore}
            </h2>

          </div>

          <div className="grid grid-cols-2">

            {/* BTTS */}

            <div className="border-r p-3 text-center">
              <div className="text-xs text-gray-500">
                {t.common.btts}
              </div>

              <StatValue
                value={stats.totalBTTS}
                total={stats.matchesPlayed}
              />
            </div>


            {/* NO BTTS */}

            <div className="p-3 text-center">
              <div className="text-xs text-gray-500">
                No BTTS
              </div>

              <StatValue
                value={stats.totalNoBTTS}
                total={stats.matchesPlayed}
              />
            </div>

          </div>

        </section>


        {/* ===================================================
            CLEAN SHEETS
        =================================================== */}

        <section className="rounded-lg border bg-white shadow-sm">

          <div className="border-b px-3 py-2">

            <h2 className="text-sm font-semibold text-gray-900">
              {t.common.cleanSheets}
            </h2>

          </div>

          <div className="grid grid-cols-2">

            {/* CLEAN SHEETS */}

            <div className="border-r p-3 text-center">
              <div className="text-xs text-gray-500">
                {t.common.cleanSheets}
              </div>

              <StatValue
                value={stats.totalCleanSheet}
                total={stats.matchesPlayed}
              />
            </div>


            {/* NO CLEAN SHEET */}

            <div className="p-3 text-center">
              <div className="text-xs text-gray-500">
                {t.common.noCleanSheet}
              </div>

              <StatValue
                value={stats.totalNotCleanSheet}
                total={stats.matchesPlayed}
              />
            </div>

          </div>

        </section>

      </div>


      {/* =====================================================
          MATCH TOTALS
      ===================================================== */}

      <section className="rounded-lg border bg-white shadow-sm">

        <div className="border-b px-3 py-2">

          <h2 className="text-sm font-semibold text-gray-900">
            {t.common.matchTotals}
          </h2>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5">

          {[
            {
              label: t.common.over05,
              over: stats.totalGoalsOver05,
              under: stats.totalGoalsNotOver05,
            },
            {
              label: t.common.over15,
              over: stats.totalGoalsOver15,
              under: stats.totalGoalsNotOver15,
            },
            {
              label: t.common.over25,
              over: stats.totalGoalsOver25,
              under: stats.totalGoalsNotOver25,
            },
            {
              label: t.common.over35,
              over: stats.totalGoalsOver35,
              under: stats.totalGoalsNotOver35,
            },
            {
              label: t.common.over45,
              over: stats.totalGoalsOver45,
              under: stats.totalGoalsNotOver45,
            },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`p-3 text-center ${
                index < 4 ? "border-r" : ""
              }`}
            >

              <div className="text-xs font-medium text-gray-700">
                {item.label}
              </div>

              <div className="mt-2 text-sm font-semibold text-gray-900">
                {item.over}
              </div>

              <div className="text-xs text-gray-500">
                {getPercent(
                  item.over,
                  stats.matchesPlayed,
                )}
              </div>

              <div className="mt-1 text-xs text-gray-400">
                {t.common.under}: {item.under}
              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default TeamOverviewView;