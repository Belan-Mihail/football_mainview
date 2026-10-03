import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import {
  calculateFavoriteAdditionalStats,
} from "../../logic/19CalculateAdditionalStatsByFavorite";

import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";


const AdditionalStatisticsByFavorite: React.FC<ViewProps> = ({
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

    return calculateFavoriteAdditionalStats(
      finishedMatches,
    );

  }, [
    finishedMatches,
  ]);
console.log(statistics)

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
  // FAVORITE GROUP
  // ==========================================================

  const renderFavoriteGroup = (
    title: string,
    stats: typeof statistics.favorite,
  ) => {

    return (
      <section
        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      >

        {/* ====================================================
            GROUP HEADER
        ==================================================== */}

        <div className="mb-6 flex items-center justify-between border-b pb-2">

          <div>

            <h2 className="text-lg font-bold">
              {title}
            </h2>

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
    );

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="space-y-6">

      {/* ======================================================
          FAVORITES
      ====================================================== */}

      {renderFavoriteGroup(
        t.common.favorites,
        statistics.favorite,
      )}


      {/* ======================================================
          NON-FAVORITES
      ====================================================== */}

      {renderFavoriteGroup(
        t.common.nonfavorites,
        statistics.nonFavorite,
      )}


      {/* ======================================================
          STRONG FAVORITES
      ====================================================== */}

      {statistics.strongFavorite.matches > 0 &&
        renderFavoriteGroup(
          t.common.strongFavorits,
          statistics.strongFavorite,
        )}

    </div>

  );

};


export default AdditionalStatisticsByFavorite;

