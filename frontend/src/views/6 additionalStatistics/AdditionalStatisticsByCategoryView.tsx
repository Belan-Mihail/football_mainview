import { useEffect, useMemo, useState } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import {
  calculateAdditionalStatsByCategory,
} from "../../logic/18CalculateAdditionalStatsByCategory";

import { getTeamLevelDescription } from "../../utils/getTeamLevelDescription";

import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const AdditionalStatisticsByCategoryView: React.FC<ViewProps> = ({
  data,
  filter,
}) => {
  // ==========================================================
  // LANGUAGE
  // ==========================================================

  const language = useLanguage();

  const t = translations[language];

  // ==========================================================
  // EXPANDED CATEGORIES
  // ==========================================================

  const [expandedCategories, setExpandedCategories] =
    useState<Set<string>>(new Set());

  // ==========================================================
  // FILTERED MATCHES
  // ==========================================================

  const filteredMatches = useFilteredMatches(
    data,
    filter,
  );

  // ==========================================================
  // FINISHED MATCHES
  // ==========================================================

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter(
      (match) => match.status === "finished",
    );
  }, [filteredMatches]);

  // ==========================================================
  // STATISTICS
  // ==========================================================

  const statistics = useMemo(() => {
    return calculateAdditionalStatsByCategory(
      finishedMatches,
    );
  }, [finishedMatches]);

  // ==========================================================
  // SORTED CATEGORIES
  // ==========================================================

  const categories = useMemo(() => {
    return Object.entries(statistics).sort(sortCategories);
  }, [statistics]);

  // ==========================================================
  // OPEN FIRST CATEGORY
  // ==========================================================

  useEffect(() => {
    if (categories.length === 0) {
      setExpandedCategories(new Set());
      return;
    }

    setExpandedCategories(
      new Set([categories[0][0]]),
    );
  }, [categories]);

  // ==========================================================
  // TOGGLE CATEGORY
  // ==========================================================

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

  // ==========================================================
  // LOADING
  // ==========================================================

  if (!data) {
    return (
      <div>
        {t.common.loading}...
      </div>
    );
  }

  // ==========================================================
  // HELPERS
  // ==========================================================

  const getPercent = (
    value: number,
  ): string => {
    return `${(value ?? 0).toFixed(1)}%`;
  };

  const getAverage = (
    value: number,
  ): string => {
    return (value ?? 0).toFixed(2);
  };

  // ==========================================================
  // CATEGORY SORT
  // ==========================================================

  function sortCategories(
    [categoryA]: [string, unknown],
    [categoryB]: [string, unknown],
  ) {
    const matchA = categoryA.match(/^([A-GH])(\d+)$/);
    const matchB = categoryB.match(/^([A-GH])(\d+)$/);

    if (!matchA || !matchB) {
      return categoryA.localeCompare(categoryB);
    }

    const letterA = matchA[1];
    const letterB = matchB[1];

    const numberA = Number(matchA[2]);
    const numberB = Number(matchB[2]);

    const letterOrder: Record<string, number> = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
    };

    const orderA = letterOrder[letterA] ?? 99;
    const orderB = letterOrder[letterB] ?? 99;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return numberA - numberB;
  }

  // ==========================================================
  // STAT BLOCK
  // ==========================================================

  const renderStatBlock = (
    title: string,
    total: number,
    average: number,
    statWinPercent: number,
    statAndMatchWinPercent: number,
  ) => {
    return (
      <section className="mb-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <StatCard
            title={t.common.categoryTotal}
            value={`${total}`}
          />

          <StatCard
            title={t.common.categoryAverage}
            value={getAverage(average)}
          />

          <StatCard
            title={t.common.categoryStatWinPercent}
            value={getPercent(statWinPercent)}
          />

          <StatCard
            title={t.common.categoryStatAndMatchWinPercent}
            value={getPercent(statAndMatchWinPercent)}
          />
        </div>
      </section>
    );
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="space-y-6">

      {categories.map(([category, stats]) => {

        const isExpanded =
          expandedCategories.has(category);

        return (
          <section
            key={category}
            className="rounded-lg border border-gray-200 bg-white shadow-sm"
          >

            {/* ==================================================
                CATEGORY HEADER
            ================================================== */}

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


            {/* ==================================================
                CATEGORY CONTENT
            ================================================== */}

            {isExpanded && (
              <div className="border-t border-gray-200 p-4">

                {/* ==================================================
                    CORNERS
                ================================================== */}

                {renderStatBlock(
                  t.common.corners,
                  stats.totalCorners,
                  stats.cornersAverage,
                  stats.winByCornersPercent,
                  stats.winByCornersAndMatchPercent,
                )}


                {/* ==================================================
                    SHOTS
                ================================================== */}

                {renderStatBlock(
                  t.common.shots,
                  stats.totalShots,
                  stats.shotsAverage,
                  stats.winByShotsPercent,
                  stats.winByShotsAndMatchPercent,
                )}


                {/* ==================================================
                    SHOTS ON TARGET
                ================================================== */}

                {renderStatBlock(
                  t.common.shotsOnTarget,
                  stats.totalShotsOT,
                  stats.shotsOTAverage,
                  stats.winByShotsOTPercent,
                  stats.winByShotsOTAndMatchPercent,
                )}


                {/* ==================================================
                    EXPECTED GOALS
                ================================================== */}

                {renderStatBlock(
                  t.common.expectedGoals,
                  stats.totalXG,
                  stats.xGAverage,
                  stats.winByXGPercent,
                  stats.winByXGAndMatchPercent,
                )}


                {/* ==================================================
                    YELLOW CARDS
                ================================================== */}

                {renderStatBlock(
                  t.common.yellowCards,
                  stats.totalYellowCards,
                  stats.yellowCardsAverage,
                  stats.winByYellowCardsPercent,
                  stats.winByYellowCardsAndMatchPercent,
                )}

              </div>
            )}

          </section>
        );
      })}

    </div>
  );
};

export default AdditionalStatisticsByCategoryView;