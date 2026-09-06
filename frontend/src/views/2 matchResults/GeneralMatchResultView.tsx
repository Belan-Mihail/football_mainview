import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";
import { calculateGeneralResults } from "../../logic/7calculateGeneralResults";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const GeneralMatchResultView: React.FC<ViewProps> = ({
  data,
  filter,
}) => {
  const language = useLanguage();
  const t = translations[language];
  const filteredMatches = useFilteredMatches(data, filter);

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter(
      (match) => match.status === "finished"
    );
  }, [filteredMatches]);

  const statistics = useMemo(() => {
    return calculateGeneralResults(finishedMatches);
  }, [finishedMatches]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  const renderSequence = (
    sequence: ("HOME" | "DRAW" | "AWAY")[]
  ) => (
    <div className="flex flex-wrap justify-center gap-1">
      {sequence.map((result, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full ${
            result === "HOME"
              ? "bg-green-500"
              : result === "DRAW"
              ? "bg-gray-400"
              : "bg-red-500"
          }`}
        />
      ))}
    </div>
  );

  return (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

    {/* Header */}

    <div className="mb-4 flex items-center justify-between border-b pb-2">

      <div>

        <h2 className="text-lg font-bold">
          {t.pages.results.heading}
        </h2>

        <div className="text-xs text-gray-500">
          {t.pages.results.description}
        </div>

      </div>

      <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold">
        {finishedMatches.length} {t.common.matches}
      </div>

    </div>

    {/* Full Time */}

    <div className="mb-6">

      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
        {t.common.fullTime}
      </h3>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">

        <StatCard
          title={t.common.Matches}
          value={statistics.matchesPlayed}
        />

        <StatCard
          title={t.common.HomeWins}
          value={`${statistics.homeWins} (${statistics.homeWinsPercent.toFixed(
            1,
          )}%)`}
        />

        <StatCard
          title={t.common.Draws}
          value={`${statistics.draws} (${statistics.drawsPercent.toFixed(
            1,
          )}%)`}
        />

        <StatCard
          title={t.common.AwayWins}
          value={`${statistics.awayWins} (${statistics.awayWinsPercent.toFixed(
            1,
          )}%)`}
        />

      </div>

      <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

        <div className="mb-2 text-center text-sm font-semibold">
          {t.common.last_matches}
        </div>

        {renderSequence(statistics.currentForm)}

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
            title={t.common.HomeWins}
            value={`${statistics.firstHalfHomeWins} (${statistics.firstHalfHomeWinsPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Draws}
            value={`${statistics.firstHalfDraws} (${statistics.firstHalfDrawsPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.AwayWins}
            value={`${statistics.firstHalfAwayWins} (${statistics.firstHalfAwayWinsPercent.toFixed(
              1,
            )}%)`}
          />

        </div>

        <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

          <div className="mb-2 text-center text-sm font-semibold">
            {t.common.last_matches}
          </div>

          {renderSequence(statistics.firstHalfForm)}

        </div>

      </div>

      {/* Second Half */}

      <div>

        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.secondHalf}
        </h3>

        <div className="grid grid-cols-3 gap-2">

          <StatCard
            title={t.common.HomeWins}
            value={`${statistics.secondHalfHomeWins} (${statistics.secondHalfHomeWinsPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Draws}
            value={`${statistics.secondHalfDraws} (${statistics.secondHalfDrawsPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.AwayWins}
            value={`${statistics.secondHalfAwayWins} (${statistics.secondHalfAwayWinsPercent.toFixed(
              1,
            )}%)`}
          />

        </div>

        <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

          <div className="mb-2 text-center text-sm font-semibold">
            {t.common.last_matches}
          </div>

          {renderSequence(statistics.secondHalfForm)}

        </div>

      </div>

    </div>

  </div>
);
};

export default GeneralMatchResultView;