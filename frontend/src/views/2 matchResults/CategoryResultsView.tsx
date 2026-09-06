import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import { calculateCategoryResults } from "../../logic/9categoryResultsCalculator";

import type { CategoryResults } from "../../types/3ByCategoriesTypes";
import { getTeamLevelDescription } from "../../utils/getTeamLevelDescription";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const MatchResultByCategoryView: React.FC<ViewProps> = ({ data, filter }) => {
  const language = useLanguage();
  const t = translations[language];
  const filteredMatches = useFilteredMatches(data, filter);

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter((match) => match.status === "finished");
  }, [filteredMatches]);

  const statistics = useMemo(() => {
    return calculateCategoryResults(finishedMatches);
  }, [finishedMatches]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  const renderGroup = (category: string, stats: CategoryResults) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

    {/* Header */}

    <div className="mb-4 flex items-center justify-between border-b pb-2">

      <div>

        <h2 className="text-lg font-bold">
          {t.common.category} {category}
        </h2>

        <div className="text-xs text-gray-500">
          {getTeamLevelDescription(category)}
        </div>

      </div>

      <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold">
        {stats.matches} {t.common.matches}
      </div>

    </div>

    {/* Full Time */}

    <div className="mb-6">

      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
        {t.common.fullTime}
      </h3>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-6">

        <StatCard
          title="Matches"
          value={stats.matches}
        />

        <StatCard
          title="Wins"
          value={`${stats.wins} (${(
            (stats.wins / stats.matches) *
            100
          ).toFixed(1)}%)`}
        />

        <StatCard
          title="Draws"
          value={`${stats.draws} (${(
            (stats.draws / stats.matches) *
            100
          ).toFixed(1)}%)`}
        />

        <StatCard
          title="Losses"
          value={`${stats.losses} (${(
            (stats.losses / stats.matches) *
            100
          ).toFixed(1)}%)`}
        />

        <StatCard
          title="Avg Scored"
          value={stats.averageGoalsScored.toFixed(2)}
        />

        <StatCard
          title="Avg Conceded"
          value={stats.averageGoalsConceded.toFixed(2)}
        />

      </div>

    </div>

    {/* Halves */}

    <div className="grid gap-6 lg:grid-cols-2">

      {/* First Half */}

      <div>

        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.firstHalf}
        </h3>

        <div className="grid grid-cols-3 gap-2">

          <StatCard
            title="Wins"
            value={`${stats.firstHalfWins} (${(
              (stats.firstHalfWins / stats.matches) *
              100
            ).toFixed(1)}%)`}
          />

          <StatCard
            title="Draws"
            value={`${stats.firstHalfDraws} (${(
              (stats.firstHalfDraws / stats.matches) *
              100
            ).toFixed(1)}%)`}
          />

          <StatCard
            title="Losses"
            value={`${stats.firstHalfLosses} (${(
              (stats.firstHalfLosses / stats.matches) *
              100
            ).toFixed(1)}%)`}
          />

        </div>

      </div>

      {/* Second Half */}

      <div>

        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.secondHalf}
        </h3>

        <div className="grid grid-cols-3 gap-2">

          <StatCard
            title="Wins"
            value={`${stats.secondHalfWins} (${(
              (stats.secondHalfWins / stats.matches) *
              100
            ).toFixed(1)}%)`}
          />

          <StatCard
            title="Draws"
            value={`${stats.secondHalfDraws} (${(
              (stats.secondHalfDraws / stats.matches) *
              100
            ).toFixed(1)}%)`}
          />

          <StatCard
            title="Losses"
            value={`${stats.secondHalfLosses} (${(
              (stats.secondHalfLosses / stats.matches) *
              100
            ).toFixed(1)}%)`}
          />

        </div>

      </div>

    </div>

  </div>
);

  return (
  <div className="space-y-8">
    {Object.entries(statistics)
      .sort(([categoryA], [categoryB]) =>
        categoryA.localeCompare(categoryB, undefined, {
          numeric: true,
        }),
      )
      .map(([category, stats]) => renderGroup(category, stats))}
  </div>
);
};

export default MatchResultByCategoryView;
