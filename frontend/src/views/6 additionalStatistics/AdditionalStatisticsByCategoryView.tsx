import { useMemo } from "react";

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
      (match) =>
        match.status === "finished",
    );

  }, [
    filteredMatches,
  ]);


  // ==========================================================
  // STATISTICS
  // ==========================================================

  const statistics = useMemo(() => {

    return calculateAdditionalStatsByCategory(
      finishedMatches,
    );

  }, [
    finishedMatches,
  ]);



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

  const sortCategories = (
    [categoryA]: [string, unknown],
    [categoryB]: [string, unknown],
  ) => {

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

  };


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

      {Object.entries(statistics)
        .sort(sortCategories)
        .map(([category, stats]) => (

          <section
            key={category}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >

            {/* ====================================================
                CATEGORY HEADER
            ==================================================== */}

            <div className="mb-6 flex items-center justify-between border-b pb-2">

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


            {/* ====================================================
                CORNERS
            ==================================================== */}

            {renderStatBlock(
              t.common.corners,
              stats.totalCorners,
              stats.cornersAverage,
              stats.winByCornersPercent,
              stats.winByCornersAndMatchPercent,
            )}


            {/* ====================================================
                SHOTS
            ==================================================== */}

            {renderStatBlock(
              t.common.shots,
              stats.totalShots,
              stats.shotsAverage,
              stats.winByShotsPercent,
              stats.winByShotsAndMatchPercent,
            )}


            {/* ====================================================
                SHOTS ON TARGET
            ==================================================== */}

            {renderStatBlock(
              t.common.shotsOnTarget,
              stats.totalShotsOT,
              stats.shotsOTAverage,
              stats.winByShotsOTPercent,
              stats.winByShotsOTAndMatchPercent,
            )}


            {/* ====================================================
                EXPECTED GOALS
            ==================================================== */}

            {renderStatBlock(
              t.common.expectedGoals,
              stats.totalXG.toFixed(2),
              stats.xGAverage,
              stats.winByXGPercent,
              stats.winByXGAndMatchPercent,
            )}


            {/* ====================================================
                YELLOW CARDS
            ==================================================== */}

            {renderStatBlock(
              t.common.yellowCards,
              stats.totalYellowCards,
              stats.yellowCardsAverage,
              stats.winByYellowCardsPercent,
              stats.winByYellowCardsAndMatchPercent,
            )}

          </section>

        ))}

    </div>
  );
};


export default AdditionalStatisticsByCategoryView;
