import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LayoutContainer from "../components/LayoutContainer";

import useLanguage from "../hooks/useLanguage";

import { teamTranslations } from "../teams/config/teamTranslations";
import {
  teamPanelConfig,
  type TeamData,
} from "../teams/config/teamPanelConfig";

import type {
  Championship,
  Match,
  Season,
} from "../types/football";

import {
  getTeamFilterOptions,
} from "../teams/utils/getTeamFilterOptions";

import {
  filterTeamMatches,
} from "../teams/utils/filterTeamMatches";
import { calculateGeneralStatistics } from "../teams/logic/2TeamsGeneralStatistics";


const MONTHS = [
  { value: 1, key: "january" },
  { value: 2, key: "february" },
  { value: 3, key: "march" },
  { value: 4, key: "april" },
  { value: 5, key: "may" },
  { value: 6, key: "june" },
  { value: 7, key: "july" },
  { value: 8, key: "august" },
  { value: 9, key: "september" },
  { value: 10, key: "october" },
  { value: 11, key: "november" },
  { value: 12, key: "december" },
];


const TeamPage = () => {
  const { teamSlug } = useParams<{
    language: string;
    championshipSlug: string;
    teamSlug: string;
  }>();

  const language = useLanguage();
  const t = teamTranslations[language];

  const [data, setData] = useState<TeamData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // ==========================================================
  // ACTIVE VIEW
  // ==========================================================

  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [activeView, setActiveView] = useState("OVERVIEW");


  // ==========================================================
  // FILTER STATE
  // ==========================================================

  const [selectedChampionship, setSelectedChampionship] =
    useState<number | undefined>(undefined);

  const [selectedSeason, setSelectedSeason] =
    useState<number | undefined>(undefined);

  const [monthFrom, setMonthFrom] = useState(8);

  const [monthTo, setMonthTo] = useState(
    new Date().getMonth() + 1,
  );


  // ==========================================================
  // LOAD TEAM
  // ==========================================================

  useEffect(() => {
    if (!teamSlug) return;

    setLoading(true);
    setError(null);

    fetch(
      `http://127.0.0.1:8000/api/teams/${teamSlug}/data/`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load team: ${response.status}`,
          );
        }

        return response.json();
      })
      .then((result: TeamData) => {

        setData(result);
      })
      .catch((err) => {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unknown error",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [teamSlug]);


  // ==========================================================
  // FILTER OPTIONS
  // ==========================================================

  const filterOptions = useMemo(() => {
    if (!data) {
      return {
        championships: [] as Championship[],
        seasons: [] as Season[],
        months: [] as number[],
      };
    }

    return getTeamFilterOptions(
      data.matches,
      data.championships,
      data.seasons,
      selectedChampionship,
    );
  }, [
    data,
    selectedChampionship,
  ]);


  // ==========================================================
  // FILTERED MATCHES
  // ==========================================================

  const filteredMatches = useMemo(() => {
    if (!data) {
      return [];
    }

    return filterTeamMatches(
      data.matches,
      {
        championship: selectedChampionship,
        season: selectedSeason,
        monthFrom,
        monthTo,
      },
    );
  }, [
    data,
    selectedChampionship,
    selectedSeason,
    monthFrom,
    monthTo,
  ]);



  // ==========================================================
  // CHAMPIONSHIP CHANGE
  // ==========================================================

  const handleChampionshipChange = (
    value: string,
  ) => {
    if (value === "all") {
      setSelectedChampionship(undefined);
      return;
    }

    const championshipId = Number(value);

    /*
     * If a season is currently selected,
     * try to preserve the same season by its name.
     */
    if (selectedSeason !== undefined && data) {
      const currentSeason = data.seasons.find(
        (season) => season.id === selectedSeason,
      );

      if (currentSeason) {
        const matchingSeason = data.seasons.find(
          (season) =>
            season.championship === championshipId &&
            season.name === currentSeason.name,
        );

        setSelectedSeason(
          matchingSeason?.id,
        );
      } else {
        setSelectedSeason(undefined);
      }
    }

    setSelectedChampionship(championshipId);
  };


  // ==========================================================
  // SEASON CHANGE
  // ==========================================================

  const handleSeasonChange = (
    value: string,
  ) => {
    if (value === "all") {
      setSelectedSeason(undefined);
      return;
    }

    setSelectedSeason(Number(value));
  };


  // ==========================================================
  // CURRENT VIEW
  // ==========================================================

  const getActiveView = () => {
    // Direct view
    const directView = teamPanelConfig.views[activeView];

    if (directView && directView.type === "view") {
      return directView;
    }

    // Nested view
    if (activeView.startsWith("RESULTS_")) {
      const childKey = activeView.replace("RESULTS_", "");

      const resultsGroup = teamPanelConfig.views.RESULTS;

      if (
        resultsGroup &&
        resultsGroup.type === "group"
      ) {
        const childView = resultsGroup.children[childKey];

        if (childView) {
          return childView;
        }
      }
    }

    // Fallback
    return teamPanelConfig.views.OVERVIEW;
  };

  const currentView = getActiveView();

  const CurrentView = currentView.component;


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">

        <Navbar />

        <main className="flex-1">
          <LayoutContainer>
            <div className="py-6">
              {t.common.loading}...
            </div>
          </LayoutContainer>
        </main>

        <Footer />

      </div>
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col bg-white">

        <Navbar />

        <main className="flex-1">
          <LayoutContainer>

            <div className="py-6 text-red-600">

              {t.common.loading}

              {error && (
                <div className="mt-1 text-sm">
                  {error}
                </div>
              )}

            </div>

          </LayoutContainer>
        </main>

        <Footer />

      </div>
    );
  }


  // ==========================================================
  // DATA
  // ==========================================================

  const {
    team,
  } = data;

  let generalStatistics = calculateGeneralStatistics(filteredMatches, team.id)

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="flex min-h-screen flex-col bg-white">

      {/* ====================================================
          NAVBAR
      ==================================================== */}

      <Navbar />


      {/* ====================================================
          FILTERS
      ==================================================== */}

      <LayoutContainer>

        <div className="border-x border-gray-300 border-b border-b-black bg-gray-100">

          <div className="mx-1 flex flex-wrap gap-2 py-2 xs:gap-3 sm:flex-nowrap sm:py-3">

            {/* ==================================================
                CHAMPIONSHIP
            ================================================== */}

            <select
              value={
                selectedChampionship === undefined
                  ? "all"
                  : String(selectedChampionship)
              }
              onChange={(event) =>
                handleChampionshipChange(
                  event.target.value,
                )
              }
              className="min-w-0 flex-1 rounded border bg-white px-2 py-1 text-xs xs:text-sm"
            >

              <option value="all">
                {t.filters.allChampionships}
              </option>

              {filterOptions.championships.map(
                (championship) => (
                  <option
                    key={championship.id}
                    value={championship.id}
                  >
                    {championship.name}
                  </option>
                ),
              )}

            </select>


            {/* ==================================================
                SEASON
            ================================================== */}

            <select
              value={
                selectedSeason === undefined
                  ? "all"
                  : String(selectedSeason)
              }
              onChange={(event) =>
                handleSeasonChange(
                  event.target.value,
                )
              }
              className="min-w-0 flex-1 rounded border bg-white px-2 py-1 text-xs xs:text-sm"
            >

              <option value="all">
                {t.filters.allSeasons}
              </option>

              {filterOptions.seasons.map(
                (season) => (
                  <option
                    key={season.id}
                    value={season.id}
                  >
                    {season.name}
                  </option>
                ),
              )}

            </select>


            {/* ==================================================
                PERIOD FROM
            ================================================== */}

            <select
              value={monthFrom}
              onChange={(event) =>
                setMonthFrom(
                  Number(event.target.value),
                )
              }
              className="min-w-0 flex-1 rounded border bg-white px-2 py-1 text-xs xs:text-sm"
              title={t.filters.periodFrom}
            >

              {MONTHS.map((month) => (
                <option
                  key={month.value}
                  value={month.value}
                >
                  {t.months[month.key]}
                </option>
              ))}

            </select>


            {/* ==================================================
                PERIOD TO
            ================================================== */}

            <select
              value={monthTo}
              onChange={(event) =>
                setMonthTo(
                  Number(event.target.value),
                )
              }
              className="min-w-0 flex-1 rounded border bg-white px-2 py-1 text-xs xs:text-sm"
              title={t.filters.periodTo}
            >

              {MONTHS.map((month) => (
                <option
                  key={month.value}
                  value={month.value}
                >
                  {t.months[month.key]}
                </option>
              ))}

            </select>

          </div>

        </div>

      </LayoutContainer>


      {/* ====================================================
          MAIN
      ==================================================== */}

      <main className="flex-1">

        <LayoutContainer>

          <div className="border-x border-gray-300">

            {/* ==================================================
                H1
            ================================================== */}

            <h1 className="mx-1 py-3 text-xl font-bold text-gray-900 sm:text-2xl">
              {team.name}
            </h1>


            {/* ==================================================
                TEAM CONTENT
            ================================================== */}

            <div className="grid grid-cols-1 border-t border-gray-300 md:grid-cols-[220px_1fr]">


              {/* ==================================================
                  LEFT MENU
              ================================================== */}

              <aside className="border-b border-gray-300 bg-gray-50 md:border-b-0 md:border-r">

                <div className="p-2">

                  <div className="mb-2 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {t.panel.team}
                  </div>


                  {Object.entries(teamPanelConfig.views).map(
                    ([viewKey, view]) => {
                      // ======================================================
                      // SINGLE VIEW
                      // ======================================================

                      if (view.type === "view") {
                        const isActive = viewKey === activeView;

                        return (
                          <button
                            key={viewKey}
                            type="button"
                            onClick={() => setActiveView(viewKey)}
                            className={
                              isActive
                                ? "mb-1 w-full rounded bg-gray-200 px-3 py-2 text-left text-sm font-medium"
                                : "mb-1 w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
                            }
                          >
                            {t.views[view.translationKey]}
                          </button>
                        );
                      }


                      // ======================================================
                      // GROUP
                      // ======================================================

                      const isExpanded =
                        expandedGroups.includes(viewKey);

                      const hasActiveChild =
                        Object.keys(view.children).some(
                          (childKey) =>
                            activeView === `${viewKey}_${childKey}`,
                        );

                      return (
                        <div key={viewKey}>
                          <button
                            type="button"
                            onClick={() => {
                              const firstChildKey =
                                Object.keys(view.children)[0];

                              const firstChildView =
                                view.children[firstChildKey];

                              if (!isExpanded) {
                                setExpandedGroups((prev) => [
                                  ...prev,
                                  viewKey,
                                ]);
                              }

                              setActiveView(
                                `${viewKey}_${firstChildKey}`,
                              );
                            }}
                            className={
                              hasActiveChild
                                ? "mb-1 flex w-full items-center justify-between rounded bg-gray-200 px-3 py-2 text-left text-sm font-medium"
                                : "mb-1 flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
                            }
                          >
                            <span>
                              {t.views[view.translationKey]}
                            </span>

                            <span className="text-xs">
                              {isExpanded ? "▾" : "▸"}
                            </span>
                          </button>


                          {isExpanded && (
                            <div className="ml-3 border-l border-gray-300 pl-2">
                              {Object.entries(view.children).map(
                                ([childKey, childView]) => {
                                  const childViewKey =
                                    `${viewKey}_${childKey}`;

                                  const isChildActive =
                                    activeView === childViewKey;

                                  return (
                                    <button
                                      key={childKey}
                                      type="button"
                                      onClick={() =>
                                        setActiveView(childViewKey)
                                      }
                                      className={
                                        isChildActive
                                          ? "mb-1 w-full rounded bg-gray-200 px-3 py-2 text-left text-sm font-medium"
                                          : "mb-1 w-full rounded px-3 py-2 text-left text-sm hover:bg-gray-100"
                                      }
                                    >
                                      {childKey === "GENERAL"
                                        ? "General"
                                        : childKey === "FAVORITES"
                                          ? "Favorites"
                                          : childKey === "CATEGORIES"
                                            ? "Categories"
                                            : childKey}
                                    </button>
                                  );
                                },
                              )}
                            </div>
                          )}
                        </div>
                      );
                    },
                  )}

                </div>

              </aside>


              {/* ==================================================
                  RIGHT VIEW
              ================================================== */}

              <section className="min-w-0">

                <div className="border-b border-gray-300 px-3 py-3">

                  <h2 className="text-lg font-semibold text-gray-900">
                    {t.pages[currentView.pageKey].heading}
                  </h2>

                </div>


                <div className="p-3">

                  <CurrentView
                    data={data}
                    matches={filteredMatches}
                  />

                </div>

              </section>

            </div>

          </div>

        </LayoutContainer>

      </main>


      {/* ====================================================
          FOOTER
      ==================================================== */}

      <Footer />

    </div>
  );
};


export default TeamPage;