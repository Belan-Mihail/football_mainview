import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import {
  calculateAdditionalStatsGeneralResults,
} from "../../logic/17calculateAdditionalStatsGeneralResult";

import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";


const AdditionalStatisticsGeneralView: React.FC<ViewProps> = ({
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

    return calculateAdditionalStatsGeneralResults(
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

  const matchesPlayed = statistics.matchesPlayed;

  const getAverage = (
    value: number,
  ): string => {

    return matchesPlayed > 0
      ? (value / matchesPlayed).toFixed(2)
      : "0.00";

  };


  const getPercent = (
    value: number,
  ): string => {

    return `${(value ?? 0).toFixed(1)}%`;

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

      {/* ====================================================
          HEADER
          ==================================================== */}

      <div className="mb-6 flex items-center justify-between border-b pb-2">

        <div>

          <h2 className="text-lg font-bold">
            {t.pages.additional.heading}
          </h2>

          <div className="text-xs text-gray-500">
            {t.pages.additional.description}
          </div>

        </div>

        <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold">

          {finishedMatches.length}{" "}
          {t.common.matches}

        </div>

      </div>


      {/* ====================================================
          CORNERS
          ==================================================== */}

      <section className="mb-8">

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.corners}
        </h3>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-9">

          <StatCard
            title={t.common.totalCorners}
            value={`${statistics.corners.total}`}
          />

          <StatCard
            title={t.common.totalCornersHome}
            value={`${statistics.corners.home}`}
          />

          <StatCard
            title={t.common.totalCornersAway}
            value={`${statistics.corners.away}`}
          />

          <StatCard
            title={t.common.averageCorners}
            value={getAverage(
              statistics.corners.total,
            )}
          />

          <StatCard
            title={t.common.averageCornersHome}
            value={statistics.corners.homeAverage.toFixed(2)}
          />

          <StatCard
            title={t.common.averageCornersHome}
            value={statistics.corners.awayAverage.toFixed(2)}
          />

          <StatCard
            title={t.common.homeTeamWinsByCorners}
            value={getPercent(
              statistics.corners.homeWinPercent,
            )}
          />

          <StatCard
            title={t.common.awayTeamWinsByCorners}
            value={getPercent(
              statistics.corners.awayWinPercent,
            )}
          />

          <StatCard
            title={t.common.statisticalWinnerAlsoWinsMatch}
            value={getPercent(
              statistics.corners.winnerMatchWinPercent,
            )}
          />

        </div>

      </section>


      {/* ====================================================
          SHOTS
          ==================================================== */}

      <section className="mb-8">

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.shots}
        </h3>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-9">

          <StatCard
            title={t.common.totalShots}
            value={`${statistics.shots.total}`}
          />

          <StatCard
            title={t.common.totalShotsHome}
            value={`${statistics.shots.home}`}
          />

          <StatCard
            title={t.common.totalShotsAway}
            value={`${statistics.shots.away}`}
          />

          <StatCard
            title={t.common.averageShots}
            value={getAverage(
              statistics.shots.total,
            )}
          />

          <StatCard
            title={t.common.averageShotsHome}
            value={statistics.shots.homeAverage.toFixed(2)}
          />

          <StatCard
            title={t.common.averageShotsAway}
            value={statistics.shots.awayAverage.toFixed(2)}
          />

          <StatCard
            title={t.common.homeTeamWinsByShots}
            value={getPercent(
              statistics.shots.homeWinPercent,
            )}
          />

          <StatCard
            title={t.common.awayTeamWinsByShots}
            value={getPercent(
              statistics.shots.awayWinPercent,
            )}
          />

          <StatCard
            title={t.common.statisticalWinnerAlsoWinsMatch}
            value={getPercent(
              statistics.shots.winnerMatchWinPercent,
            )}
          />

        </div>

      </section>


      {/* ====================================================
          SHOTS ON TARGET
          ==================================================== */}

      <section className="mb-8">

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.shotsOnTarget}
        </h3>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-9">

          <StatCard
            title={t.common.totalShotsOnTarget}
            value={`${statistics.shotsOnTarget.total}`}
          />

          <StatCard
            title={t.common.totalShotsOnTargetHome}
            value={`${statistics.shotsOnTarget.home}`}
          />

          <StatCard
            title={t.common.totalShotsOnTargetAway}
            value={`${statistics.shotsOnTarget.away}`}
          />

          <StatCard
            title={t.common.averageShotsOnTarget}
            value={getAverage(
              statistics.shotsOnTarget.total,
            )}
          />

          <StatCard
            title={t.common.averageShotsOTHome}
            value={
              statistics.shotsOnTarget.homeAverage.toFixed(2)
            }
          />

          <StatCard
            title={t.common.averageShotsOTAway}
            value={
              statistics.shotsOnTarget.awayAverage.toFixed(2)
            }
          />

          <StatCard
            title={t.common.homeTeamWinsByShotsOT}
            value={getPercent(
              statistics.shotsOnTarget.homeWinPercent,
            )}
          />

          <StatCard
            title={t.common.awayTeamWinsByShotsOT}
            value={getPercent(
              statistics.shotsOnTarget.awayWinPercent,
            )}
          />

          <StatCard
            title={t.common.statisticalWinnerAlsoWinsMatch}
            value={getPercent(
              statistics.shotsOnTarget.winnerMatchWinPercent,
            )}
          />

        </div>

      </section>


      {/* ====================================================
          EXPECTED GOALS
          ==================================================== */}

      <section className="mb-8">

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.expectedGoals}
        </h3>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">

          <StatCard
            title={t.common.homeExpectedGoals}
            value={statistics.xg.homeAverage.toFixed(2)}
          />

          <StatCard
            title={t.common.awayExpectedGoals}
            value={statistics.xg.awayAverage.toFixed(2)}
          />

          <StatCard
            title={t.common.homeTeamWinsXg}
            value={getPercent(
              statistics.xg.homeWinPercent,
            )}
          />

          <StatCard
            title={t.common.awayTeamWinsXg}
            value={getPercent(
              statistics.xg.awayWinPercent,
            )}
          />

          <StatCard
            title={t.common.statisticalWinnerAlsoWinsMatch}
            value={getPercent(
              statistics.xg.winnerMatchWinPercent,
            )}
          />

        </div>

      </section>


      {/* ====================================================
          YELLOW CARDS
          ==================================================== */}

      <section className="mb-2">

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.yellowCards}
        </h3>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-9">

          <StatCard
            title={t.common.totalYellowCards}
            value={`${statistics.yellowCards.total}`}
          />

          <StatCard
            title={t.common.totalYellowCardsHome}
            value={`${statistics.yellowCards.home}`}
          />

          <StatCard
            title={t.common.totalYellowCardsAway}
            value={`${statistics.yellowCards.away}`}
          />

          <StatCard
            title={t.common.averageYellowCards}
            value={getAverage(
              statistics.yellowCards.total,
            )}
          />

          <StatCard
            title={t.common.averageYellowCardsHome}
            value={statistics.yellowCards.homeAverage.toFixed(2)}
          />

          <StatCard
            title={t.common.averageYellowCardsAway}
            value={statistics.yellowCards.awayAverage.toFixed(2)}
          />

          <StatCard
            title={t.common.homeTeamWinsYellowCards}
            value={getPercent(
              statistics.yellowCards.homeWinPercent,
            )}
          />

          <StatCard
            title={t.common.awayTeamWinsYellowCards}
            value={getPercent(
              statistics.yellowCards.awayWinPercent,
            )}
          />

          <StatCard
            title={t.common.statisticalWinnerAlsoWinsMatch}
            value={getPercent(
              statistics.yellowCards.winnerMatchWinPercent,
            )}
          />

        </div>

      </section>

    </div>
  );
};


export default AdditionalStatisticsGeneralView;