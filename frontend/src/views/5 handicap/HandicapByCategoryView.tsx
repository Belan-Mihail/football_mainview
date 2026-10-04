import { useEffect, useMemo, useState } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import { calculateCategoryHandicapResults } from "../../logic/16calculateHandicapsByCat";

import type { CategoryHandicapResults } from "../../types/6HandicapTypes";

import { getTeamLevelDescription } from "../../utils/getTeamLevelDescription";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const HandicapByCategoryView: React.FC<ViewProps> = ({
  data,
  filter,
}) => {
  const language = useLanguage();
  const t = translations[language];

  const [expandedCategories, setExpandedCategories] =
    useState<Set<string>>(new Set());

  const filteredMatches = useFilteredMatches(data, filter);

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter(
      (match) => match.status === "finished",
    );
  }, [filteredMatches]);

  const statistics = useMemo(() => {
    return calculateCategoryHandicapResults(
      finishedMatches,
    );
  }, [finishedMatches]);

  const categories = useMemo(() => {
    return Object.entries(statistics).sort(
      ([categoryA], [categoryB]) =>
        categoryA.localeCompare(categoryB, undefined, {
          numeric: true,
        }),
    );
  }, [statistics]);

  useEffect(() => {
    if (categories.length === 0) {
      setExpandedCategories(new Set());
      return;
    }

    setExpandedCategories(
      new Set([categories[0][0]]),
    );
  }, [categories]);

  // ---------------------------------------------------------
  // Toggle category
  // ---------------------------------------------------------

  const toggleCategory = (category: string) => {
    setExpandedCategories((previous) => {
      const next = new Set(previous);

      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }

      return next;
    });
  };

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

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

  const renderSequence = (
    sequence: boolean[],
  ) => (
    <div className="flex flex-wrap justify-center gap-1">
      {sequence.map((result, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full ${result
            ? "bg-green-500"
            : "bg-red-500"
            }`}
        />
      ))}
    </div>
  );

  const renderGroup = (
    category: string,
    stats: CategoryHandicapResults,
  ) => {

    const isExpanded = expandedCategories.has(category);

    const isFavoriteCategory =
      category.startsWith("A") ||
      category.startsWith("B");

    const handicap05 = isFavoriteCategory
      ? "-0.5"
      : "+0.5";

    const handicap15 = isFavoriteCategory
      ? "-1.5"
      : "+1.5";

    const handicap25 = isFavoriteCategory
      ? "-2.5"
      : "+2.5";

    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

        {/* Header */}

        <button
          type="button"
          onClick={() => toggleCategory(category)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <div className="flex items-start gap-2">
            <span className="mt-1 text-sm">
              {isExpanded ? "▼" : "▶"}
            </span>

            <div>
              <h2 className="text-lg font-bold">
                {t.common.category} {category}
              </h2>

              <div className="text-xs text-gray-500">
                {getTeamLevelDescription(category)}
              </div>
            </div>
          </div>

          <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold">
            {stats.matchesPlayed} {t.common.matches}
          </div>
        </button>

        {/* Full Time */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-4">
            <div className="mb-6">

              <h3 className="mb-3 text-center font-semibold">
                {t.common.fullTime}
              </h3>

              <div className="grid gap-3 md:grid-cols-3">

                <StatCard
                  title={handicap05}
                  value={`${stats.handicap05} (${stats.handicap05Percent.toFixed(
                    1,
                  )}%)`}
                />

                <StatCard
                  title={handicap15}
                  value={`${stats.handicap15} (${stats.handicap15Percent.toFixed(
                    1,
                  )}%)`}
                />

                <StatCard
                  title={handicap25}
                  value={`${stats.handicap25} (${stats.handicap25Percent.toFixed(
                    1,
                  )}%)`}
                />

              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-3">

                {renderForm(
                  handicap05,
                  stats.fullTime05Form,
                )}

                {renderForm(
                  handicap15,
                  stats.fullTime15Form,
                )}

                {renderForm(
                  handicap15,
                  stats.fullTime25Form,
                )}

              </div>

            </div>

            {/* First Half */}

            <div className="mb-6">

              <h3 className="mb-3 text-center font-semibold">
                {t.common.firstHalf}
              </h3>

              <div className="grid gap-3 md:grid-cols-2">

                <StatCard
                  title={handicap05}
                  value={`${stats.firstHalfHandicap05} (${stats.firstHalfHandicap05Percent.toFixed(
                    1,
                  )}%)`}
                />

                <StatCard
                  title={handicap15}
                  value={`${stats.firstHalfHandicap15} (${stats.firstHalfHandicap15Percent.toFixed(
                    1,
                  )}%)`}
                />

              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2">

                {renderForm(
                  handicap05,
                  stats.firstHalf05Form,
                )}

                {renderForm(
                  handicap15,
                  stats.firstHalf15Form,
                )}

              </div>

            </div>

            {/* Second Half */}

            <div>

              <h3 className="mb-3 text-center font-semibold">
                {t.common.secondHalf}
              </h3>

              <div className="grid gap-3 md:grid-cols-2">

                <StatCard
                  title={handicap05}
                  value={`${stats.secondHalfHandicap05} (${stats.secondHalfHandicap05Percent.toFixed(
                    1,
                  )}%)`}
                />

                <StatCard
                  title={handicap15}
                  value={`${stats.secondHalfHandicap15} (${stats.secondHalfHandicap15Percent.toFixed(
                    1,
                  )}%)`}
                />

              </div>

              <div className="mt-4 grid gap-2 md:grid-cols-2">

                {renderForm(
                  handicap05,
                  stats.secondHalf05Form,
                )}

                {renderForm(
                  handicap15,
                  stats.secondHalf15Form,
                )}

              </div>

            </div>
          </div>
        )}

      </div>
    );
  };

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

export default HandicapByCategoryView;