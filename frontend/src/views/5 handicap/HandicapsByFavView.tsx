import { useMemo, useState } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import { calculateFavoriteHandicapResults } from "../../logic/15calculateHandicapsByFav";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const FavoriteHandicapView: React.FC<ViewProps> = ({ data, filter }) => {
  const language = useLanguage();
  const t = translations[language];
  const [mode, setMode] = useState<
    "FAVORITES" | "NON_FAVORITES" | "STRONG_FAVORITES"
  >("FAVORITES");

  const filteredMatches = useFilteredMatches(data, filter);

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter((match) => match.status === "finished");
  }, [filteredMatches]);

  const allStatistics = useMemo(() => {
    return calculateFavoriteHandicapResults(finishedMatches);
  }, [finishedMatches]);

  const statistics = useMemo(() => {
    switch (mode) {
      case "FAVORITES":
        return allStatistics.favorites;

      case "NON_FAVORITES":
        return allStatistics.nonFavorites;

      case "STRONG_FAVORITES":
        return allStatistics.strongFavorites;
    }
  }, [allStatistics, mode]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  const renderSequence = (sequence: boolean[]) => (
    <div className="flex flex-wrap justify-center gap-1">
      {sequence.map((result, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full ${result ? "bg-green-500" : "bg-red-500"
            }`}
        />
      ))}
    </div>
  );

  const handicap05Label =
    mode === "NON_FAVORITES" ? "+0.5" : "-0.5";

  const handicap15Label =
    mode === "NON_FAVORITES" ? "+1.5" : "-1.5";

  const handicap25Label =
    mode === "NON_FAVORITES" ? "+2.5" : "-2.5";

  const renderForm = (
    title: string,
    sequence: boolean[],
  ) => (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-2 text-center text-sm font-semibold">
        {t.common.current_form} ({title})
      </div>

      {renderSequence(sequence)}
    </div>
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header */}

      <div className="mb-4 flex items-center justify-between border-b pb-2">
        <div>
          <h2 className="text-lg font-bold">{t.pages.handicap.heading}</h2>

          <div className="text-xs text-gray-500">
            {mode === "FAVORITES" && t.pages.favoriteHandicap.heading}

            {mode === "NON_FAVORITES" &&
              t.pages.nonfavoriteHandicap.heading}

            {mode === "STRONG_FAVORITES" &&
              t.pages.strongfavoriteHandicap.heading}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("FAVORITES")}
            className={`rounded px-3 py-1 text-sm ${mode === "FAVORITES" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
          >
            {t.common.favorites}
          </button>

          <button
            onClick={() => setMode("NON_FAVORITES")}
            className={`rounded px-3 py-1 text-sm ${mode === "NON_FAVORITES"
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
              }`}
          >
            {t.common.nonfavorites}
          </button>

          <button
            onClick={() => setMode("STRONG_FAVORITES")}
            className={`rounded px-3 py-1 text-sm ${mode === "STRONG_FAVORITES"
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
              }`}
          >
            {t.common.strongFavorits}
          </button>

          <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold">
            {statistics.matchesPlayed} {t.common.matches}
          </div>
        </div>
      </div>

      {/* Full Time */}

      <div className="mb-6">
        <h3 className="mb-3 text-center font-semibold">{t.common.fullTime}</h3>

        <div className="grid gap-3 md:grid-cols-3">
          <StatCard
            title={handicap05Label}
            value={`${mode === "NON_FAVORITES" ? statistics.plus05 : statistics.minus05
              } (${(mode === "NON_FAVORITES"
                ? statistics.plus05Percent
                : statistics.minus05Percent
              ).toFixed(1)}%)`}
          />

          <StatCard
            title={handicap15Label}
            value={`${mode === "NON_FAVORITES" ? statistics.plus15 : statistics.minus15
              } (${(mode === "NON_FAVORITES"
                ? statistics.plus15Percent
                : statistics.minus15Percent
              ).toFixed(1)}%)`}
          />

          <StatCard
            title={handicap25Label}
            value={`${mode === "NON_FAVORITES" ? statistics.plus25 : statistics.minus25
              } (${(mode === "NON_FAVORITES"
                ? statistics.plus25Percent
                : statistics.minus25Percent
              ).toFixed(1)}%)`}
          />
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-3">

          {renderForm(
            handicap05Label,
            statistics.fullTime05Form,
          )}

          {renderForm(
            handicap15Label,
            statistics.fullTime15Form,
          )}

          {renderForm(
            handicap25Label,
            statistics.fullTime25Form,
          )}

        </div>
      </div>

      {/* First Half */}

      <div className="mb-6">
        <h3 className="mb-3 text-center font-semibold">{t.common.firstHalf}</h3>

        <div className="grid gap-3 md:grid-cols-2">
          <StatCard
            title={handicap05Label}
            value={`${mode === "NON_FAVORITES"
              ? statistics.firstHalfPlus05
              : statistics.firstHalfMinus05
              } (${(mode === "NON_FAVORITES"
                ? statistics.firstHalfPlus05Percent
                : statistics.firstHalfMinus05Percent
              ).toFixed(1)}%)`}
          />

          <StatCard
            title={handicap15Label}
            value={`${mode === "NON_FAVORITES"
              ? statistics.firstHalfPlus15
              : statistics.firstHalfMinus15
              } (${(mode === "NON_FAVORITES"
                ? statistics.firstHalfPlus15Percent
                : statistics.firstHalfMinus15Percent
              ).toFixed(1)}%)`}
          />
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-2">

          {renderForm(
            handicap05Label,
            statistics.firstHalf05Form,
          )}

          {renderForm(
            handicap15Label,
            statistics.firstHalf15Form,
          )}

        </div>
      </div>

      {/* Second Half */}

      <div>
        <h3 className="mb-3 text-center font-semibold">{t.common.secondHalf}</h3>

        <div className="grid gap-3 md:grid-cols-2">
          <StatCard
            title={handicap05Label}
            value={`${mode === "NON_FAVORITES"
              ? statistics.secondHalfPlus05
              : statistics.secondHalfMinus05
              } (${(mode === "NON_FAVORITES"
                ? statistics.secondHalfPlus05Percent
                : statistics.secondHalfMinus05Percent
              ).toFixed(1)}%)`}
          />

          <StatCard
            title={handicap15Label}
            value={`${mode === "NON_FAVORITES"
              ? statistics.secondHalfPlus15
              : statistics.secondHalfMinus15
              } (${(mode === "NON_FAVORITES"
                ? statistics.secondHalfPlus15Percent
                : statistics.secondHalfMinus15Percent
              ).toFixed(1)}%)`}
          />
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-2">

          {renderForm(
            handicap05Label,
            statistics.secondHalf05Form,
          )}

          {renderForm(
            handicap15Label,
            statistics.secondHalf15Form,
          )}

        </div>
      </div>
    </div>
  );
};

export default FavoriteHandicapView;
