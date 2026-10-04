import React, { useEffect, useMemo, useState } from "react";

import type { Match } from "../../types/football";
import type { TeamViewProps } from "../config/teamPanelConfig";

import { calculateGeneralResultStatistics } from "../logic/3TeamsResultGeneralStatistics";

import useLanguage from "../../hooks/useLanguage";
import { teamTranslations } from "../config/teamTranslations";


// ==========================================================
// TYPES
// ==========================================================

type CategoryType = "OWN" | "OPPONENT";
type Side = "ALL" | "HOME" | "AWAY";

type MatchCategoryItem = {
  match: Match;
  teamCategory: string;
  opponentCategory: string;
  isHomeMatch: boolean;
};


// ==========================================================
// CONSTANTS
// ==========================================================

const MIN_CATEGORY_MATCHES = 3;


// ==========================================================
// COMPONENT
// ==========================================================

const TeamResultsCategoryView: React.FC<TeamViewProps> = ({
  data,
  matches,
}) => {

  const [categoryType, setCategoryType] =
    useState<CategoryType>("OWN");

  const [side, setSide] =
    useState<Side>("ALL");

  const language = useLanguage();
  const t = teamTranslations[language];

  /*
   * Set allows several categories to stay open
   * at the same time.
   */
  const [expandedCategories, setExpandedCategories] =
    useState<Set<string>>(new Set());


  // ========================================================
  // CALCULATE GENERAL STATISTICS
  //
  // We calculate ALL matches once.
  //
  // calculateGeneralResultStatistics now also returns
  // matchCategories.
  // ========================================================

  const generalStats = useMemo(() => {
    return calculateGeneralResultStatistics(
      matches,
      20,
      data.team.id
    );
  }, [matches, data.team.id]);


  // ========================================================
  // MATCH CATEGORIES
  // ========================================================

  const matchCategories = useMemo<MatchCategoryItem[]>(() => {
    return generalStats.matchCategories ?? [];
  }, [generalStats]);


  // ========================================================
  // FILTER BY HOME / AWAY
  // ========================================================

  const filteredMatchCategories = useMemo(() => {

    if (side === "HOME") {
      return matchCategories.filter(
        (item) => item.isHomeMatch
      );
    }

    if (side === "AWAY") {
      return matchCategories.filter(
        (item) => !item.isHomeMatch
      );
    }

    return matchCategories;

  }, [matchCategories, side]);


  // ========================================================
  // GROUP MATCHES BY CATEGORY
  // ========================================================

  const categoryGroups = useMemo(() => {

    const groups = new Map<
      string,
      MatchCategoryItem[]
    >();

    filteredMatchCategories.forEach((item) => {

      const category =
        categoryType === "OWN"
          ? item.teamCategory
          : item.opponentCategory;

      if (!category) {
        return;
      }

      if (!groups.has(category)) {
        groups.set(category, []);
      }

      groups.get(category)!.push(item);
    });


    /*
     * Only categories with at least
     * MIN_CATEGORY_MATCHES are displayed.
     */
    return Array.from(groups.entries())
      .filter(
        ([, categoryMatches]) =>
          categoryMatches.length >= MIN_CATEGORY_MATCHES
      )
      .sort(([categoryA], [categoryB]) =>
        compareCategories(categoryA, categoryB)
      );

  }, [
    filteredMatchCategories,
    categoryType,
  ]);


  // ========================================================
  // RESET EXPANDED CATEGORIES
  //
  // Whenever TEAM/OPPONENT or ALL/HOME/AWAY changes,
  // open only the first available category.
  // ========================================================

  useEffect(() => {

    if (categoryGroups.length === 0) {
      setExpandedCategories(new Set());
      return;
    }

    setExpandedCategories(
      new Set([categoryGroups[0][0]])
    );

  }, [categoryGroups]);


  // ========================================================
  // TOGGLE CATEGORY
  //
  // Several categories may be opened simultaneously.
  // ========================================================

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


  // ========================================================
  // PERCENTAGE
  // ========================================================

  const getPercent = (
    value: number,
    total: number
  ): string => {

    if (total === 0) {
      return "0%";
    }

    return `${((value / total) * 100).toFixed(1)}%`;
  };


  // ========================================================
  // RESULT CARD
  // ========================================================

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

      <div className="text-lg font-semibold text-gray-900">
        {value}

        <span className="ml-1 text-xs font-normal text-gray-500">
          ({getPercent(value, total)})
        </span>
      </div>

    </div>
  );


  // ========================================================
  // RESULT SEQUENCE
  // ========================================================

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


  // ========================================================
  // BOOLEAN SEQUENCE
  // ========================================================

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


  // ========================================================
  // CATEGORY STATISTICS
  //
  // Each category is calculated from its own matches.
  //
  // We reuse the existing general calculator, so all
  // existing statistics and sequences remain consistent.
  // ========================================================

  const getCategoryStats = (
    categoryMatches: MatchCategoryItem[]
  ) => {

    const categoryMatchList =
      categoryMatches.map(
        (item) => item.match
      );

    return calculateGeneralResultStatistics(
      categoryMatchList,
      20,
      data.team.id
    );
  };


  // ========================================================
  // CATEGORY HEADER TITLE
  // ========================================================

  const categoryTitle =
    categoryType === "OWN"
      ? t.common.teamCategories
      : t.common.opponentCategories;


  // ========================================================
  // CATEGORY SIDE TITLE
  // ========================================================

  const sideTitle =
    side === "HOME"
      ? t.common.home
      : side === "AWAY"
        ? t.common.away
        : t.common.all;


  // ========================================================
  // NO CATEGORIES
  // ========================================================

  const hasCategories =
    categoryGroups.length > 0;


  // ========================================================
  // RENDER
  // ========================================================

  return (

    <div className="space-y-3 p-2 sm:p-3">


      {/* ====================================================
          HEADER / FILTERS
      ==================================================== */}

      <div className="rounded-lg border bg-white p-3 shadow-sm">

        <div className="flex flex-col gap-3">


          {/* TITLE */}

          <div className="flex flex-wrap items-center justify-between gap-2">

            <div>

              <h2 className="text-sm font-semibold text-gray-900">
                {t.common.resultsByCategories}
              </h2>

              <div className="mt-1 text-xs text-gray-500">
                {categoryTitle} · {sideTitle}
              </div>

            </div>

            <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
              {filteredMatchCategories.length} {t.common.matches}
            </div>

          </div>


          {/* ==================================================
              TEAM / OPPONENT
          ================================================== */}

          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={() => setCategoryType("OWN")}
              className={`rounded px-3 py-1 text-sm ${
                categoryType === "OWN"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.teamCategories}
            </button>


            <button
              type="button"
              onClick={() => setCategoryType("OPPONENT")}
              className={`rounded px-3 py-1 text-sm ${
                categoryType === "OPPONENT"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.common.opponentCategories}
            </button>

          </div>


          {/* ==================================================
              ALL / HOME / AWAY
          ================================================== */}

          <div className="flex flex-wrap gap-2 border-t pt-3">

            <button
              type="button"
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
              type="button"
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
              type="button"
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


      {/* ====================================================
          CATEGORIES
      ==================================================== */}

      {!hasCategories ? (

        <section className="rounded-lg border bg-white p-6 text-center shadow-sm">

          <div className="text-sm text-gray-500">
            {t.common.noCategoriesWithAtLeast}{" "}
            {MIN_CATEGORY_MATCHES} {t.common.matchesD}.
          </div>

        </section>

      ) : (

        <div className="space-y-2">


          {/* ==================================================
              EACH CATEGORY
          ================================================== */}

          {categoryGroups.map(
            ([category, categoryMatches]) => {

              const isExpanded =
                expandedCategories.has(category);

              const stats =
                isExpanded
                  ? getCategoryStats(categoryMatches)
                  : null;


              return (

                <section
                  key={category}
                  className="overflow-hidden rounded-lg border bg-white shadow-sm"
                >


                  {/* ==========================================
                      CATEGORY HEADER
                  ========================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleCategory(category)
                    }
                    className="flex w-full items-center justify-between px-3 py-3 text-left hover:bg-gray-50"
                  >

                    <div className="flex min-w-0 items-center gap-2">

                      <span className="text-sm text-gray-500">
                        {isExpanded ? "▼" : "▶"}
                      </span>

                      <span className="text-sm font-semibold text-gray-900">
                        {category}
                      </span>

                    </div>


                    <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                      {categoryMatches.length} {t.common.matches}
                    </span>

                  </button>


                  {/* ==========================================
                      CATEGORY CONTENT
                  ========================================== */}

                  {isExpanded && stats && (

                    <div className="border-t">


                      {/* ========================================
                          MATCH RESULTS
                      ======================================== */}

                      <section>

                        <div className="border-b px-3 py-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {t.common.matchResults}
                          </h3>
                        </div>


                        <div className="grid grid-cols-2 divide-x sm:grid-cols-3">

                          <ResultCard
                            label={t.common.wins}
                            value={stats.totalWins}
                            total={stats.matchesPlayed}
                          />

                          <ResultCard
                            label={t.common.draws}
                            value={stats.totalDraws}
                            total={stats.matchesPlayed}
                          />

                          <ResultCard
                            label={t.common.losses}
                            value={stats.totalLoss}
                            total={stats.matchesPlayed}
                          />

                        </div>

                      </section>


                      {/* ========================================
                          FIRST HALF
                      ======================================== */}

                      <section className="border-t">

                        <div className="border-b px-3 py-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {t.common.firstHalf}
                          </h3>
                        </div>


                        <div className="grid grid-cols-2 divide-x sm:grid-cols-3">

                          <ResultCard
                            label={t.common.wins}
                            value={stats.totalWinsFirstHalf}
                            total={stats.matchesPlayed}
                          />

                          <ResultCard
                            label={t.common.draws}
                            value={stats.totalDrawsFirstHalf}
                            total={stats.matchesPlayed}
                          />

                          <ResultCard
                            label={t.common.losses}
                            value={stats.totalLossFirstHalf}
                            total={stats.matchesPlayed}
                          />

                        </div>

                      </section>


                      {/* ========================================
                          SECOND HALF
                      ======================================== */}

                      <section className="border-t">

                        <div className="border-b px-3 py-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {t.common.secondHalf}
                          </h3>
                        </div>


                        <div className="grid grid-cols-2 divide-x sm:grid-cols-3">

                          <ResultCard
                            label={t.common.wins}
                            value={stats.totalWinsSecondHalf}
                            total={stats.matchesPlayed}
                          />

                          <ResultCard
                            label={t.common.draws}
                            value={stats.totalDrawsSecondHalf}
                            total={stats.matchesPlayed}
                          />

                          <ResultCard
                            label={t.common.losses}
                            value={stats.totalLossSecondHalf}
                            total={stats.matchesPlayed}
                          />

                        </div>

                      </section>


                      {/* ========================================
                          X RESULTS
                      ======================================== */}

                      <section className="border-t">

                        <div className="border-b px-3 py-2">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {t.common.winOrDraw}
                          </h3>
                        </div>


                        <div className="grid grid-cols-2 sm:grid-cols-3">

                          <ResultCard
                            label={t.common.winOrDraw}
                            value={stats.totalXWins}
                            total={stats.matchesPlayed}
                          />

                          <ResultCard
                            label={t.common.loss}
                            value={stats.totalXLoss}
                            total={stats.matchesPlayed}
                          />


                          <div className="p-3 text-center">

                            <div className="text-xs text-gray-500">
                              {t.common.winOrDrawRate}
                            </div>

                            <div className="mt-1 text-lg font-semibold text-gray-900">
                              {getPercent(
                                stats.totalXWins,
                                stats.matchesPlayed
                              )}
                            </div>

                          </div>

                        </div>

                      </section>


                      {/* ========================================
                          RECENT SEQUENCES
                      ======================================== */}

                      <section className="border-t">

                        <div className="border-b px-3 py-2">

                          <h3 className="text-sm font-semibold text-gray-900">
                            {t.common.sequences}
                          </h3>

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

                            {renderSequence(
                              stats.currentForm
                            )}

                          </div>


                          {/* FIRST HALF */}

                          <div>

                            <div className="mb-2 text-center text-xs font-medium text-gray-700">
                              {t.common.firstHalfSequence}
                            </div>

                            {renderSequence(
                              stats.firstHalfForm
                            )}

                          </div>


                          {/* SECOND HALF */}

                          <div>

                            <div className="mb-2 text-center text-xs font-medium text-gray-700">
                              {t.common.secondHalfSequence}
                            </div>

                            {renderSequence(
                              stats.secondHalfForm
                            )}

                          </div>

                        </div>

                      </section>


                      {/* ========================================
                          HALF-TIME WINNING PATTERNS
                      ======================================== */}

                      <section className="border-t">

                        <div className="border-b px-3 py-2">

                          <h3 className="text-sm font-semibold text-gray-900">
                            {t.common.halfTimeWinningPatterns}
                          </h3>

                        </div>


                        <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">


                          {/* BOTH HALVES */}

                          <div className="p-3">

                            <div className="text-center text-xs text-gray-500">
                              {t.common.winInBothHalves}
                            </div>

                            <div className="mt-1 text-center text-lg font-semibold text-gray-900">

                              {stats.totalWinInBothTimes}

                              <span className="ml-1 text-xs font-normal text-gray-500">

                                ({getPercent(
                                  stats.totalWinInBothTimes,
                                  stats.matchesPlayed
                                )})

                              </span>

                            </div>


                            <div className="mt-3">

                              {renderBooleanSequence(
                                stats.currentFormWinInBothTimes
                              )}

                            </div>

                          </div>


                          {/* AT LEAST ONE */}

                          <div className="p-3">

                            <div className="text-center text-xs text-gray-500">
                              {t.common.winInAtLeastOneHalf}
                            </div>

                            <div className="mt-1 text-center text-lg font-semibold text-gray-900">

                              {stats.totalWinAlLeastInOnTime}

                              <span className="ml-1 text-xs font-normal text-gray-500">

                                ({getPercent(
                                  stats.totalWinAlLeastInOnTime,
                                  stats.matchesPlayed
                                )})

                              </span>

                            </div>


                            <div className="mt-3">

                              {renderBooleanSequence(
                                stats.currentFormWinAtLeastInOneTime
                              )}

                            </div>

                          </div>

                        </div>

                      </section>


                      {/* ========================================
                          HOME / AWAY SEQUENCES
                      ======================================== */}

                      {side === "ALL" && (

                        <section className="border-t">

                          <div className="border-b px-3 py-2">

                            <h3 className="text-sm font-semibold text-gray-900">
                              {t.common.homeAwaySequences}
                            </h3>

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

                                {renderSequence(
                                  stats.currentFormHome
                                )}

                              </div>


                              <div>

                                <div className="mb-2 text-center text-xs text-gray-500">
                                  {t.common.firstHalfSequence}
                                </div>

                                {renderSequence(
                                  stats.firstHalfFormHome
                                )}

                              </div>


                              <div>

                                <div className="mb-2 text-center text-xs text-gray-500">
                                  {t.common.secondHalfSequence}
                                </div>

                                {renderSequence(
                                  stats.secondHalfFormHome
                                )}

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

                                {renderSequence(
                                  stats.currentFormAway
                                )}

                              </div>


                              <div>

                                <div className="mb-2 text-center text-xs text-gray-500">
                                  {t.common.firstHalfSequence}
                                </div>

                                {renderSequence(
                                  stats.firstHalfFormAway
                                )}

                              </div>


                              <div>

                                <div className="mb-2 text-center text-xs text-gray-500">
                                  {t.common.secondHalf}
                                </div>

                                {renderSequence(
                                  stats.secondHalfFormAway
                                )}

                              </div>

                            </div>

                          </div>

                        </section>

                      )}

                    </div>

                  )}

                </section>

              );
            }
          )}

        </div>

      )}

    </div>
  );
};


// ==========================================================
// CATEGORY SORTING
//
// A1 → A2 → A3 → B1 → B2 → C1 ...
//
// Lower letter/number = stronger category.
// ==========================================================

const compareCategories = (
  categoryA: string,
  categoryB: string
): number => {

  const parsedA = parseCategory(categoryA);
  const parsedB = parseCategory(categoryB);


  if (parsedA.letter !== parsedB.letter) {
    return (
      parsedA.letter.charCodeAt(0) -
      parsedB.letter.charCodeAt(0)
    );
  }


  return parsedA.number - parsedB.number;
};


// ==========================================================
// CATEGORY PARSER
// ==========================================================

const parseCategory = (
  category: string
): {
  letter: string;
  number: number;
} => {

  const match =
    category.trim().match(/^([A-Za-z]+)\s*(\d+)?/);


  if (!match) {
    return {
      letter: category,
      number: 999,
    };
  }


  return {
    letter: match[1].toUpperCase(),
    number: match[2]
      ? Number(match[2])
      : 0,
  };
};


export default TeamResultsCategoryView;