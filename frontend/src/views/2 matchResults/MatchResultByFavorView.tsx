import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import { calculateFavoriteResults } from "../../logic/8calculateFavoriteResults";

import type { MatchOutcome, GeneralResults } from "../../types/2GeneralResults";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const MatchResultByFavorView: React.FC<ViewProps> = ({ data, filter }) => {
  const language = useLanguage();
  const t = translations[language];
  const filteredMatches = useFilteredMatches(data, filter);

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter((match) => match.status === "finished");
  }, [filteredMatches]);

  const statistics = useMemo(() => {
    return calculateFavoriteResults(finishedMatches);
  }, [finishedMatches]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  const renderSequence = (sequence: MatchOutcome[]) => (
    <div className="flex flex-wrap justify-center gap-1">
      {sequence.map((result, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full ${
            result === "WIN"
              ? "bg-green-500"
              : result === "DRAW"
                ? "bg-gray-400"
                : "bg-red-500"
          }`}
        />
      ))}
    </div>
  );

  const renderGroup = (title: string, stats: GeneralResults) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

    {/* Header */}

    <div className="mb-4 flex items-center justify-between border-b pb-2">

      <div>

        <h2 className="text-lg font-bold">
          {t.common.favorites}
        </h2>

        <div className="text-xs text-gray-500">

          {title === "Favorites" &&
            t.pages.favoriteResults.description}

          {title === "Non-Favorites" &&
            t.pages.nonfavoriteResults.description}

          {title === "Strong Favorites" &&
            t.pages.strongFavoriteResults.description}

        </div>

      </div>

      <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold">
        {stats.matchesPlayed} {t.common.matches}
      </div>

    </div>

    {/* Full Time */}

    <div className="mb-6">

      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
        {t.common.fullTime}
      </h3>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-6">

        <StatCard
          title={t.common.Matches}
          value={stats.matchesPlayed}
        />

        <StatCard
          title={t.common.Wins}
          value={`${stats.homeWins} (${stats.homeWinsPercent.toFixed(1)}%)`}
        />

        <StatCard
          title={t.common.Draws}
          value={`${stats.draws} (${stats.drawsPercent.toFixed(1)}%)`}
        />

        <StatCard
          title={t.common.Losses}
          value={`${stats.awayWins} (${stats.awayWinsPercent.toFixed(1)}%)`}
        />

        <StatCard
          title={t.common.AvgScored}
          value={stats.averageGoalsScored.toFixed(2)}
        />

        <StatCard
          title={t.common.AvgConceded}
          value={stats.averageGoalsConceded.toFixed(2)}
        />

      </div>

      <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

        <div className="mb-2 text-center text-sm font-semibold">
          {t.common.last_matches}
        </div>

        {renderSequence(stats.currentForm)}

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
            title={t.common.Wins}
            value={`${stats.firstHalfHomeWins} (${stats.firstHalfHomeWinsPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Draws}
            value={`${stats.firstHalfDraws} (${stats.firstHalfDrawsPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Losses}
            value={`${stats.firstHalfAwayWins} (${stats.firstHalfAwayWinsPercent.toFixed(
              1,
            )}%)`}
          />

        </div>

        <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

          <div className="mb-2 text-center text-sm font-semibold">
            {t.common.last_matches}
          </div>

          {renderSequence(stats.firstHalfForm)}

        </div>

      </div>

      {/* Second Half */}

      <div>

        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.secondHalf}
        </h3>

        <div className="grid grid-cols-3 gap-2">

          <StatCard
            title={t.common.Wins}
            value={`${stats.secondHalfHomeWins} (${stats.secondHalfHomeWinsPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Draws}
            value={`${stats.secondHalfDraws} (${stats.secondHalfDrawsPercent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={t.common.Losses}
            value={`${stats.secondHalfAwayWins} (${stats.secondHalfAwayWinsPercent.toFixed(
              1,
            )}%)`}
          />

        </div>

        <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

          <div className="mb-2 text-center text-sm font-semibold">
            {t.common.last_matches}
          </div>

          {renderSequence(stats.secondHalfForm)}

        </div>

      </div>

    </div>

  </div>
);

  return (
    <div className="space-y-10">
      {renderGroup("Favorites", statistics.favorites)}

      {renderGroup("Non-Favorites", statistics.underdogs)}

      {renderGroup("Strong Favorites", statistics.strongFavorites)}
    </div>
  );
};

export default MatchResultByFavorView;
