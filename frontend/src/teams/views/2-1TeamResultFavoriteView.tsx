import React, { useMemo, useState } from "react";

import type { TeamViewProps } from "../config/teamPanelConfig";
import { calculateGeneralResultStatistics } from "../logic/3TeamsResultGeneralStatistics";
import { getFavoriteTeamMatches, getNonFavoriteTeamMatches, getStrongFavoriteTeamMatches } from "../utils/filtersGroup";
import useLanguage from "../../hooks/useLanguage";
import { teamTranslations } from "../config/teamTranslations";

const TeamResultsFavoriteView: React.FC<TeamViewProps> = ({
  data,
  matches,
}) => {
  const [favoriteSide, setFavoriteSide] = useState<
    "FAVORITE" | "STRONG-FAVORITE" | "NON-FAVORITE"
  >("FAVORITE");

  const [side, setSide] = useState<"ALL" | "HOME" | "AWAY">("ALL");

  const language = useLanguage();
  const t = teamTranslations[language];


  // =====================================================
  // PREPARE MATCH GROUPS
  // =====================================================

  const favoriteMatches = useMemo(
    () => getFavoriteTeamMatches(matches, data.team.id),
    [matches, data.team.id]
  );

  const strongFavoriteMatches = useMemo(
    () => getStrongFavoriteTeamMatches(matches, data.team.id),
    [matches, data.team.id]
  );

  const nonFavoriteMatches = useMemo(
    () => getNonFavoriteTeamMatches(matches, data.team.id),
    [matches, data.team.id]
  );


  // =====================================================
  // CALCULATE STATISTICS FOR EACH FAVORITE GROUP ONCE
  // =====================================================

  const favoriteStats = useMemo(() => {
    return {
      "FAVORITE": calculateGeneralResultStatistics(
        favoriteMatches,
        20,
        data.team.id
      ),

      "STRONG-FAVORITE": calculateGeneralResultStatistics(
        strongFavoriteMatches,
        20,
        data.team.id
      ),

      "NON-FAVORITE": calculateGeneralResultStatistics(
        nonFavoriteMatches,
        20,
        data.team.id
      ),
    };
  }, [
    favoriteMatches,
    strongFavoriteMatches,
    nonFavoriteMatches,
    data.team.id,
  ]);


  // =====================================================
  // SELECT CURRENT FAVORITE GROUP
  // =====================================================

  const stats = favoriteStats[favoriteSide];


  // =====================================================
  // SELECT DATA FOR CURRENT SIDE
  // =====================================================

  const selectedStats = useMemo(() => {

    if (side === "HOME") {
      return {
        matchesPlayed: stats.homePlays,

        totalWins: stats.totalHomeWins,
        totalDraws: stats.totalHomeDraws,
        totalLoss: stats.totalHomeLoss,

        totalWinsFirstHalf: stats.totalHomeWinsFirstHalf,
        totalDrawsFirstHalf: stats.totalHomeDrawsFirstHalf,
        totalLossFirstHalf: stats.totalHomeLossFirstHalf,

        totalWinsSecondHalf: stats.totalHomeWinsSecondHalf,
        totalDrawsSecondHalf: stats.totalHomeDrawsSecondHalf,
        totalLossSecondHalf: stats.totalHomeLossSecondHalf,

        totalXWins: stats.totalHomeXWins,
        totalXLoss: stats.totalHomeXLoss,

        currentForm: stats.currentFormHome,
        firstHalfForm: stats.firstHalfFormHome,
        secondHalfForm: stats.secondHalfFormHome,

        totalWinInBothTimes: stats.totalWinInBothTimesHome,
        totalWinAlLeastInOnTime: stats.totalWinAlLeastInOnTimeHome,

        currentFormWinInBothTimes:
          stats.currentFormWinInBothTimesHomes,

        currentFormWinAtLeastInOneTime:
          stats.currentFormWinAtLeastInOneTimeHome,
      };
    }


    if (side === "AWAY") {
      return {
        matchesPlayed: stats.awayPlays,

        totalWins: stats.totalAwayWins,
        totalDraws: stats.totalAwayDraws,
        totalLoss: stats.totalAwayLoss,

        totalWinsFirstHalf: stats.totalAwayWinsFirstHalf,
        totalDrawsFirstHalf: stats.totalAwayDrawsFirstHalf,
        totalLossFirstHalf: stats.totalAwayLossFirstHalf,

        totalWinsSecondHalf: stats.totalAwayWinsSecondHalf,
        totalDrawsSecondHalf: stats.totalAwayDrawsSecondHalf,
        totalLossSecondHalf: stats.totalAwayLossSecondHalf,

        totalXWins: stats.totalAwayXWins,
        totalXLoss: stats.totalAwayXLoss,

        currentForm: stats.currentFormAway,
        firstHalfForm: stats.firstHalfFormAway,
        secondHalfForm: stats.secondHalfFormAway,

        totalWinInBothTimes: stats.totalWinInBothTimesAway,
        totalWinAlLeastInOnTime:
          stats.totalWinAlLeastInOnTimeAway,

        currentFormWinInBothTimes:
          stats.currentFormWinInBothTimesAway,

        currentFormWinAtLeastInOneTime:
          stats.currentFormWinAtLeastInOneTimeAway,
      };
    }


    // ALL
    return {
      matchesPlayed: stats.matchesPlayed,

      totalWins: stats.totalWins,
      totalDraws: stats.totalDraws,
      totalLoss: stats.totalLoss,

      totalWinsFirstHalf: stats.totalWinsFirstHalf,
      totalDrawsFirstHalf: stats.totalDrawsFirstHalf,
      totalLossFirstHalf: stats.totalLossFirstHalf,

      totalWinsSecondHalf: stats.totalWinsSecondHalf,
      totalDrawsSecondHalf: stats.totalDrawsSecondHalf,
      totalLossSecondHalf: stats.totalLossSecondHalf,

      totalXWins: stats.totalXWins,
      totalXLoss: stats.totalXLoss,

      currentForm: stats.currentForm,
      firstHalfForm: stats.firstHalfForm,
      secondHalfForm: stats.secondHalfForm,

      totalWinInBothTimes: stats.totalWinInBothTimes,
      totalWinAlLeastInOnTime:
        stats.totalWinAlLeastInOnTime,

      currentFormWinInBothTimes:
        stats.currentFormWinInBothTimes,

      currentFormWinAtLeastInOneTime:
        stats.currentFormWinAtLeastInOneTime,
    };

  }, [stats, side]);


  // =====================================================
  // HELPERS
  // =====================================================

  const getPercent = (
    value: number,
    total: number
  ): string => {
    if (total === 0) {
      return "0%";
    }

    return `${((value / total) * 100).toFixed(1)}%`;
  };


  const getSectionTitle = (): string => {
    const groupTitle =
      favoriteSide === "FAVORITE"
        ? t.common.favorite
        : favoriteSide === "STRONG-FAVORITE"
          ? t.common.strongFavorite
          : t.common.nonFavorite;

    const sideTitle =
      side === "HOME"
        ? t.common.homeMatches
        : side === "AWAY"
          ? t.common.awayMatches
          : t.common.allMatches;

    return `${groupTitle} · ${sideTitle}`;
  };


  const StatValue = ({
    value,
    total,
  }: {
    value: number;
    total?: number;
  }) => (
    <div className="text-lg font-semibold text-gray-900">
      {value}

      {total !== undefined && (
        <span className="ml-1 text-xs font-normal text-gray-500">
          ({getPercent(value, total)})
        </span>
      )}
    </div>
  );


  const ResultCard = ({
    label,
    value,
    total,
  }: {
    label: string;
    value: number;
    total: number;
  }) => (
    <div className="border-b p-3 text-center sm:border-b-0 sm:border-r">
      <div className="text-xs text-gray-500">
        {label}
      </div>

      <StatValue
        value={value}
        total={total}
      />
    </div>
  );


  /*
   * Team result sequence:
   *
   * WIN  -> green
   * DRAW -> gray
   * LOSS -> red
   */
  const renderSequence = (
    sequence: ("WIN" | "DRAW" | "LOSS")[]
  ) => (
    <div className="flex flex-wrap justify-center gap-1">
      {sequence.map((result, index) => (
        <div
          key={index}
          title={result}
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


  /*
   * Boolean sequence:
   *
   * true  -> green
   * false -> red
   */
  const renderBooleanSequence = (
    sequence: boolean[]
  ) => (
    <div className="flex flex-wrap justify-center gap-1">
      {sequence.map((result, index) => (
        <div
          key={index}
          title={result ? "Yes" : "No"}
          className={`h-3 w-3 rounded-full ${
            result
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />
      ))}
    </div>
  );


  return (
    <div className="space-y-3 p-2 sm:p-3">

      {/* =====================================================
          HEADER / MATCH FILTER
      ===================================================== */}

      <div className="rounded-lg border bg-white p-3 shadow-sm">

        <div className="flex flex-col gap-3">

          <div className="flex flex-wrap items-center justify-between gap-2">

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                {t.common.teamResults}
              </h2>

              <div className="mt-1 text-xs text-gray-500">
                {getSectionTitle()}
              </div>
            </div>

            <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
              {selectedStats.matchesPlayed} {t.common.matches}
            </div>

          </div>


          {/* FAVORITE GROUP */}

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => setFavoriteSide("FAVORITE")}
              className={`rounded px-3 py-1 text-sm ${
                favoriteSide === "FAVORITE"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.favorite}
            </button>

            <button
              onClick={() => setFavoriteSide("STRONG-FAVORITE")}
              className={`rounded px-3 py-1 text-sm ${
                favoriteSide === "STRONG-FAVORITE"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.strongFavorite}
            </button>

            <button
              onClick={() => setFavoriteSide("NON-FAVORITE")}
              className={`rounded px-3 py-1 text-sm ${
                favoriteSide === "NON-FAVORITE"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.nonFavorite}
            </button>

          </div>


          {/* MATCH SIDE */}

          <div className="flex flex-wrap gap-2 border-t pt-3">

            <button
              onClick={() => setSide("ALL")}
              className={`rounded px-3 py-1 text-sm ${
                side === "ALL"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.all}
            </button>

            <button
              onClick={() => setSide("HOME")}
              className={`rounded px-3 py-1 text-sm ${
                side === "HOME"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.home}
            </button>

            <button
              onClick={() => setSide("AWAY")}
              className={`rounded px-3 py-1 text-sm ${
                side === "AWAY"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.away}
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          FULL MATCH RESULTS
      ===================================================== */}

      <section className="rounded-lg border bg-white shadow-sm">

        <div className="border-b px-3 py-2">
          <h2 className="text-sm font-semibold text-gray-900">
            {t.common.matchResults}
          </h2>
        </div>


        <div className="grid grid-cols-2 divide-x sm:grid-cols-3">

          <ResultCard
            label={t.common.wins}
            value={selectedStats.totalWins}
            total={selectedStats.matchesPlayed}
          />

          <ResultCard
            label={t.common.draws}
            value={selectedStats.totalDraws}
            total={selectedStats.matchesPlayed}
          />

          <ResultCard
            label={t.common.losses}
            value={selectedStats.totalLoss}
            total={selectedStats.matchesPlayed}
          />

        </div>

      </section>


      {/* =====================================================
          FIRST HALF RESULTS
      ===================================================== */}

      <section className="rounded-lg border bg-white shadow-sm">

        <div className="border-b px-3 py-2">
          <h2 className="text-sm font-semibold text-gray-900">
            {t.common.firstHalf}
          </h2>
        </div>


        <div className="grid grid-cols-2 divide-x sm:grid-cols-3">

          <ResultCard
            label={t.common.wins}
            value={selectedStats.totalWinsFirstHalf}
            total={selectedStats.matchesPlayed}
          />

          <ResultCard
            label={t.common.draws}
            value={selectedStats.totalDrawsFirstHalf}
            total={selectedStats.matchesPlayed}
          />

          <ResultCard
            label={t.common.losses}
            value={selectedStats.totalLossFirstHalf}
            total={selectedStats.matchesPlayed}
          />

        </div>

      </section>


      {/* =====================================================
          SECOND HALF RESULTS
      ===================================================== */}

      <section className="rounded-lg border bg-white shadow-sm">

        <div className="border-b px-3 py-2">
          <h2 className="text-sm font-semibold text-gray-900">
            {t.common.secondHalf}
          </h2>
        </div>


        <div className="grid grid-cols-2 divide-x sm:grid-cols-3">

          <ResultCard
            label={t.common.wins}
            value={selectedStats.totalWinsSecondHalf}
            total={selectedStats.matchesPlayed}
          />

          <ResultCard
            label={t.common.draws}
            value={selectedStats.totalDrawsSecondHalf}
            total={selectedStats.matchesPlayed}
          />

          <ResultCard
            label={t.common.losses}
            value={selectedStats.totalLossSecondHalf}
            total={selectedStats.matchesPlayed}
          />

        </div>

      </section>


      {/* =====================================================
          X RESULTS
      ===================================================== */}

      <section className="rounded-lg border bg-white shadow-sm">

        <div className="border-b px-3 py-2">
          <h2 className="text-sm font-semibold text-gray-900">
            {t.common.winOrDraw}
          </h2>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-3">

          <ResultCard
            label={t.common.winOrDraw}
            value={selectedStats.totalXWins}
            total={selectedStats.matchesPlayed}
          />

          <ResultCard
            label={t.common.loss}
            value={selectedStats.totalXLoss}
            total={selectedStats.matchesPlayed}
          />

          <div className="p-3 text-center">
            <div className="text-xs text-gray-500">
              {t.common.winOrDrawRate}
            </div>

            <div className="mt-1 text-lg font-semibold text-gray-900">
              {getPercent(
                selectedStats.totalXWins,
                selectedStats.matchesPlayed
              )}
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          RECENT SEQUENCES
      ===================================================== */}

      <section className="rounded-lg border bg-white shadow-sm">

        <div className="border-b px-3 py-2">
          <h2 className="text-sm font-semibold text-gray-900">
            {t.common.sequences}
          </h2>

          <div className="mt-1 text-xs text-gray-500">
            {t.common.recentMatches}
          </div>
        </div>


        <div className="space-y-4 p-3">

          {/* CURRENT FORM */}

          <div>

            <div className="mb-2 text-center text-xs font-medium text-gray-700">
              {t.common.matchSequence}
            </div>

            {renderSequence(selectedStats.currentForm)}

          </div>


          {/* FIRST HALF */}

          <div>

            <div className="mb-2 text-center text-xs font-medium text-gray-700">
              {t.common.firstHalfSequence}
            </div>

            {renderSequence(selectedStats.firstHalfForm)}

          </div>


          {/* SECOND HALF */}

          <div>

            <div className="mb-2 text-center text-xs font-medium text-gray-700">
              {t.common.secondHalfSequence}
            </div>

            {renderSequence(selectedStats.secondHalfForm)}

          </div>

        </div>

      </section>


      {/* =====================================================
          WINS IN BOTH / AT LEAST ONE HALF
      ===================================================== */}

      <section className="rounded-lg border bg-white shadow-sm">

        <div className="border-b px-3 py-2">
          <h2 className="text-sm font-semibold text-gray-900">
            {t.common.halfTimeWinningPatterns}
          </h2>
        </div>


        <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">

          {/* BOTH HALVES */}

          <div className="p-3">

            <div className="text-center text-xs text-gray-500">
              {t.common.winInBothHalves}
            </div>

            <div className="mt-1 text-center text-lg font-semibold text-gray-900">
              {selectedStats.totalWinInBothTimes}

              <span className="ml-1 text-xs font-normal text-gray-500">
                ({getPercent(
                  selectedStats.totalWinInBothTimes,
                  selectedStats.matchesPlayed
                )})
              </span>
            </div>


            <div className="mt-3">
              {renderBooleanSequence(
                selectedStats.currentFormWinInBothTimes
              )}
            </div>

          </div>


          {/* AT LEAST ONE */}

          <div className="p-3">

            <div className="text-center text-xs text-gray-500">
              {t.common.winInAtLeastOneHalf}
            </div>

            <div className="mt-1 text-center text-lg font-semibold text-gray-900">
              {selectedStats.totalWinAlLeastInOnTime}

              <span className="ml-1 text-xs font-normal text-gray-500">
                ({getPercent(
                  selectedStats.totalWinAlLeastInOnTime,
                  selectedStats.matchesPlayed
                )})
              </span>
            </div>


            <div className="mt-3">
              {renderBooleanSequence(
                selectedStats.currentFormWinAtLeastInOneTime
              )}
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOME / AWAY RECENT SEQUENCES
      ===================================================== */}

      {side === "ALL" && (
        <section className="rounded-lg border bg-white shadow-sm">

          <div className="border-b px-3 py-2">
            <h2 className="text-sm font-semibold text-gray-900">
              {t.common.homeAwaySequences}
            </h2>
          </div>


          <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">

            {/* HOME */}

            <div className="space-y-4 p-3">

              <div className="text-center text-xs font-semibold text-gray-700">
                {t.common.home}
              </div>

              <div>
                <div className="mb-2 text-center text-xs text-gray-500">
                  {t.common.matchSequence}
                </div>

                {renderSequence(stats.currentFormHome)}
              </div>

              <div>
                <div className="mb-2 text-center text-xs text-gray-500">
                  {t.common.firstHalf}
                </div>

                {renderSequence(stats.firstHalfFormHome)}
              </div>

              <div>
                <div className="mb-2 text-center text-xs text-gray-500">
                  {t.common.secondHalf}
                </div>

                {renderSequence(stats.secondHalfFormHome)}
              </div>

            </div>


            {/* AWAY */}

            <div className="space-y-4 p-3">

              <div className="text-center text-xs font-semibold text-gray-700">
                {t.common.away}
              </div>

              <div>
                <div className="mb-2 text-center text-xs text-gray-500">
                  {t.common.matchSequence}
                </div>

                {renderSequence(stats.currentFormAway)}
              </div>

              <div>
                <div className="mb-2 text-center text-xs text-gray-500">
                  {t.common.firstHalfSequence}
                </div>

                {renderSequence(stats.firstHalfFormAway)}
              </div>

              <div>
                <div className="mb-2 text-center text-xs text-gray-500">
                  {t.common.secondHalfSequence}
                </div>

                {renderSequence(stats.secondHalfFormAway)}
              </div>

            </div>

          </div>

        </section>
      )}

    </div>
  );
};


export default TeamResultsFavoriteView;