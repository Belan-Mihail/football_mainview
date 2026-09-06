import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";
import { calculateBTTSCategoryResults } from "../../logic/11calculateBTTSGroupByCategory";
import { getTeamLevelDescription } from "../../utils/getTeamLevelDescription";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const BTTSByCategoryView: React.FC<ViewProps> = ({ data, filter }) => {
  const language = useLanguage();
  const t = translations[language];
  
  const filteredMatches = useFilteredMatches(data, filter);

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter((match) => match.status === "finished");
  }, [filteredMatches]);

  const statistics = useMemo(() => {
    return calculateBTTSCategoryResults(finishedMatches);
  }, [finishedMatches]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  const renderSequence = (sequence: boolean[]) => (
    <div className="flex flex-wrap justify-center gap-1">
      {sequence.map((result, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full ${
            result ? "bg-green-500" : "bg-red-500"
          }`}
        />
      ))}
    </div>
  );

  const renderGroup = (category: string, stats: BTTSCategoryResults) => (
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

      <div className="grid grid-cols-3 gap-2">

        <StatCard
          title="Matches"
          value={stats.matches}
        />

        <StatCard
          title="BTTS"
          value={`${stats.BTTS} (${stats.BTTSPercent.toFixed(1)}%)`}
        />

        <StatCard
          title="No BTTS"
          value={`${stats.noBTTS} (${stats.noBTTSPercent.toFixed(1)}%)`}
        />

      </div>

      <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

        <div className="mb-2 text-center text-sm font-semibold">
          {t.common.last_matches}
        </div>

        {renderSequence(stats.sequence)}

      </div>

    </div>

    {/* Halves */}

    <div className="grid gap-6 lg:grid-cols-2">

      {/* First Half */}

      <div>

        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.firstHalf}
        </h3>

        <div className="grid grid-cols-2 gap-2">

          <StatCard
            title="BTTS"
            value={`${stats.firstHalfBTTS} (${stats.firstHalfBTTSPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title="No BTTS"
            value={`${stats.firstHalfNoBTTS} (${stats.firstHalfNoBTTSPercent.toFixed(
              1,
            )}%)`}
          />

        </div>

        <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

          <div className="mb-2 text-center text-sm font-semibold">
            Last Matches
          </div>

          {renderSequence(stats.firstHalfSequence)}

        </div>

      </div>

      {/* Second Half */}

      <div>

        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.secondHalf}
        </h3>

        <div className="grid grid-cols-2 gap-2">

          <StatCard
            title="BTTS"
            value={`${stats.secondHalfBTTS} (${stats.secondHalfBTTSPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title="No BTTS"
            value={`${stats.secondHalfNoBTTS} (${stats.secondHalfNoBTTSPercent.toFixed(
              1,
            )}%)`}
          />

        </div>

        <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

          <div className="mb-2 text-center text-sm font-semibold">
            {t.common.last_matches}
          </div>

          {renderSequence(stats.secondHalfSequence)}

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

export default BTTSByCategoryView;
