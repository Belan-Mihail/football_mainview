import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import { calculateTotalsByCategory } from "../../logic/13calculateTotalsByCategory";

import type { TotalsCategoryResults } from "../../types/5TotalTypes";
import { getTeamLevelDescription } from "../../utils/getTeamLevelDescription";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const TotalsByCategoryView: React.FC<ViewProps> = ({
  data,
  filter,
}) => {
  const language = useLanguage();
  const t = translations[language];
  
  const filteredMatches = useFilteredMatches(data, filter);

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter(
      (match) => match.status === "finished",
    );
  }, [filteredMatches]);

  const statistics = useMemo(() => {
    return calculateTotalsByCategory(
      finishedMatches,
    );
  }, [finishedMatches]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  const renderGroup = (
    category: string,
    stats: TotalsCategoryResults,
  ) => (
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

      <div className="mb-5">

        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.fullTime}
        </h3>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">

          <StatCard
            title={t.common.Over15}
            value={`${stats.matchOver15} (${stats.matchOver15Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Over25}
            value={`${stats.matchOver25} (${stats.matchOver25Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Over35}
            value={`${stats.matchOver35} (${stats.matchOver35Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Over45}
            value={`${stats.matchOver45} (${stats.matchOver45Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Over55}
            value={`${stats.matchOver55} (${stats.matchOver55Percent.toFixed(
              1,
            )}%)`}
          />

        </div>

      </div>

      {/* First + Second Half */}

      <div className="grid gap-5 lg:grid-cols-2">

        <div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
            {t.common.firstHalf}
          </h3>

          <div className="grid grid-cols-3 gap-2">

            <StatCard
              title={t.common.Over05}
              value={`${stats.firstHalfOver05} (${stats.firstHalfOver05Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title={t.common.Over15}
              value={`${stats.firstHalfOver15} (${stats.firstHalfOver15Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title={t.common.Over25}
              value={`${stats.firstHalfOver25} (${stats.firstHalfOver25Percent.toFixed(
                1,
              )}%)`}
            />

          </div>

        </div>

        <div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
            {t.common.secondHalf}
          </h3>

          <div className="grid grid-cols-3 gap-2">

            <StatCard
              title={t.common.Over05}
              value={`${stats.secondHalfOver05} (${stats.secondHalfOver05Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title={t.common.Over15}
              value={`${stats.secondHalfOver15} (${stats.secondHalfOver15Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title={t.common.Over25}
              value={`${stats.secondHalfOver25} (${stats.secondHalfOver25Percent.toFixed(
                1,
              )}%)`}
            />

          </div>

        </div>

      </div>

    </div>
  );

  return (
    <div className="space-y-6">
      {Object.entries(statistics)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([category, stats]) =>
          renderGroup(category, stats),
        )}
    </div>
  );
};

export default TotalsByCategoryView;