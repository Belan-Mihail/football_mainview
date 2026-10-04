import { useEffect, useMemo, useState } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import { calculateCategoryResults } from "../../logic/9categoryResultsCalculator";

import type { CategoryResults } from "../../types/3ByCategoriesTypes";
import { getTeamLevelDescription } from "../../utils/getTeamLevelDescription";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const MatchResultByCategoryView: React.FC<ViewProps> = ({
  data,
  filter,
}) => {
  const language = useLanguage();
  const t = translations[language];

  const filteredMatches = useFilteredMatches(data, filter);

  // ---------------------------------------------------------
  // Expanded categories
  // ---------------------------------------------------------

  const [expandedCategories, setExpandedCategories] =
    useState<Set<string>>(new Set());

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter(
      (match) => match.status === "finished",
    );
  }, [filteredMatches]);

  const statistics = useMemo(() => {
    return calculateCategoryResults(finishedMatches);
  }, [finishedMatches]);

  // ---------------------------------------------------------
  // Open the first category whenever the category list changes
  // ---------------------------------------------------------

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

  // ---------------------------------------------------------
  // Category block
  // ---------------------------------------------------------

  const renderGroup = (
    category: string,
    stats: CategoryResults,
  ) => {
    const isExpanded = expandedCategories.has(category);

    return (
      <div
        key={category}
        className="rounded-lg border border-gray-200 bg-white shadow-sm"
      >
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
            {stats.matches} {t.common.matches}
          </div>
        </button>

        {/* Content */}

        {isExpanded && (
          <div className="border-t border-gray-200 p-4">
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
        )}
      </div>
    );
  };

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

  return (
    <div className="space-y-4">
      {categories.map(([category, stats]) =>
        renderGroup(category, stats),
      )}
    </div>
  );
};

export default MatchResultByCategoryView;