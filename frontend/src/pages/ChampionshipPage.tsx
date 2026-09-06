import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LayoutContainer from "../components/LayoutContainer";
import ChampionshipPanel from "../components/ChampionshipPanel";

import { panelConfig } from "../config/panelConfig";

import getDefaultFilter from "../logic/1getDefaultFilter";

import type {
  ChampionshipData,
  MatchFilter,
  Round,
  Season,
} from "../types/football";
import useLanguage from "../hooks/useLanguage";
import { translations } from "../i18n/translations";


const ChampionshipPage = () => {

  const language = useLanguage();
  const t = translations[language];

  const { slug } = useParams();
  const location = useLocation();


  const [data, setData] =
    useState<ChampionshipData | null>(null);


  const [filter, setFilter] =
    useState<MatchFilter>({
      seasonFrom: 0,
      roundFrom: 0,
      seasonTo: 0,
      roundTo: 0,
    });


  // ==========================================================
  // LOAD CHAMPIONSHIP
  // ==========================================================

  useEffect(() => {

    if (!slug) return;

    fetch(
      `http://127.0.0.1:8000/api/championships/${slug}/data/`
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to load championship"
          );
        }

        return response.json();
      })
      .then((result: ChampionshipData) => {

        setData(result);

        setFilter(
          getDefaultFilter(result)
        );

      })
      .catch(console.error);

  }, [slug]);


  // ==========================================================
  // SEO
  // ==========================================================

  useEffect(() => {

    if (!data) return;


    const championshipName =
      data.championship.name;


    const pathParts =
      location.pathname
        .split("/")
        .filter(Boolean);


    const championshipIndex =
      pathParts.indexOf("championship");


    const firstSlug =
      pathParts[championshipIndex + 2] ?? "";


    const secondSlug =
      pathParts[championshipIndex + 3] ?? "";


    // ========================================================
    // FIND PANEL
    // ========================================================

    let panel =
      panelConfig.GENERAL;


    let viewSlug =
      firstSlug;


    /*
      General URLs:

      /championship/premier-league
      /championship/premier-league/result
      /championship/premier-league/schedule
      /championship/premier-league/statistics

      Other panels:

      /championship/premier-league/btts
      /championship/premier-league/btts/categories

      /championship/premier-league/total
      /championship/premier-league/total/categories

      /championship/premier-league/handicap
      /championship/premier-league/handicap/favorites
    */


    const generalViewExists =
      Object.values(
        panelConfig.GENERAL.views
      ).some(
        (view) =>
          view.slug === firstSlug
      );


    if (!generalViewExists && firstSlug) {

      const foundPanel =
        Object.values(
          panelConfig
        ).find(
          (config) =>
            config.slug === firstSlug
        );


      if (foundPanel) {

        panel =
          foundPanel;

        viewSlug =
          secondSlug;
      }

    }


    // ========================================================
    // FIND VIEW
    // ========================================================

    const firstViewKey =
      Object.keys(
        panel.views
      )[0];


    let view =
      panel.views[firstViewKey];


    const foundView =
      Object.values(
        panel.views
      ).find(
        (item) =>
          item.slug === viewSlug
      );


    if (foundView) {

      view =
        foundView;

    }


    // ========================================================
    // PAGE TITLE
    // ========================================================

    document.title =
      `${championshipName} ${translations[language].pages[view.pageKey].title}`;


    // ========================================================
    // META DESCRIPTION
    // ========================================================

    const description =
      `${championshipName} ${translations[language].pages[view.pageKey].description}`;


    let metaDescription =
      document.querySelector(
        'meta[name="description"]'
      );


    if (!metaDescription) {

      metaDescription =
        document.createElement(
          "meta"
        );


      metaDescription.setAttribute(
        "name",
        "description"
      );


      document.head.appendChild(
        metaDescription
      );

    }


    metaDescription.setAttribute(
      "content",
      description
    );


  }, [
    data,
    location.pathname,
  ]);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (!data) {

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
  // PAGE
  // ==========================================================

  const seasonFromRounds = data.rounds.filter(
    (round) => round.season === filter.seasonFrom
  );

  const seasonToRounds = data.rounds.filter(
    (round) => round.season === filter.seasonTo
  );

  return (

    <div className="flex min-h-screen flex-col bg-white">




      {/* ====================================================
          FILTERS
          ==================================================== */}



      <LayoutContainer>
        <Navbar>


        </Navbar>
        <div className="border-x border-gray-300 border-b border-b-black bg-gray-100">
          <div className="flex flex-wrap gap-2 py-2 xs:gap-3 sm:flex-nowrap sm:py-3 mx-1">


            {/* ================================================
                SEASON FROM
                ================================================ */}

            <select
              className="min-w-0 flex-1 rounded border bg-white px-2 py-1 text-xs xs:text-sm"
              value={filter.seasonFrom}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  seasonFrom:
                    Number(
                      e.target.value
                    ),
                })
              }
            >

              {data.seasons.map(
                (season: Season) => (

                  <option
                    key={season.id}
                    value={season.id}
                  >
                    {season.name}
                  </option>

                )
              )}

            </select>


            {/* ================================================
                ROUND FROM
                ================================================ */}

            <select
              className="min-w-0 flex-1 rounded border bg-white px-2 py-1 text-xs xs:text-sm"
              value={filter.roundFrom}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  roundFrom: Number(e.target.value),
                })
              }
            >
              {seasonFromRounds.map(
                (round: Round) => (
                  <option
                    key={round.id}
                    value={round.id}
                  >
                    {round.number}
                  </option>
                )
              )}
            </select>


            {/* ================================================
                SEASON TO
                ================================================ */}

            <select
              className="min-w-0 flex-1 rounded border bg-white px-2 py-1 text-xs xs:text-sm"
              value={filter.seasonTo}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  seasonTo:
                    Number(
                      e.target.value
                    ),
                })
              }
            >

              {data.seasons.map(
                (season: Season) => (

                  <option
                    key={season.id}
                    value={season.id}
                  >
                    {season.name}
                  </option>

                )
              )}

            </select>


            {/* ================================================
                ROUND TO
                ================================================ */}

            <select
              className="min-w-0 flex-1 rounded border bg-white px-2 py-1 text-xs xs:text-sm"
              value={filter.roundTo}
              onChange={(e) =>
                setFilter({
                  ...filter,
                  roundTo: Number(e.target.value),
                })
              }
            >
              {seasonToRounds.map(
                (round: Round) => (
                  <option
                    key={round.id}
                    value={round.id}
                  >
                    {round.number}
                  </option>
                )
              )}
            </select>

          </div>
        </div>
      </LayoutContainer>




      {/* ====================================================
          MAIN
          ==================================================== */}

      <main className="flex-1 ">

        <LayoutContainer>
          <div className="border-x border-gray-300">

            {/* ==================================================
              H1
              ================================================== */}

            <h1 className="py-3 text-xl font-bold text-gray-900 sm:text-2xl mx-1">

              {data.championship.name}

            </h1>


            {/* ==================================================
              CHAMPIONSHIP PANEL
              ================================================== */}

            <ChampionshipPanel
              data={data}
              filter={filter}
            />

          </div>
        </LayoutContainer>

      </main>


      <Footer />

    </div>

  );

};


export default ChampionshipPage;