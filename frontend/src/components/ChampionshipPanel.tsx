import React, { useMemo } from "react";

import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { panelConfig } from "../config/panelConfig";
import type { PanelType } from "../config/panelConfig";

import { translations } from "../i18n/translations";

import useLanguage from "../hooks/useLanguage";

import type {
  ChampionshipData,
  MatchFilter,
} from "../types/football";


interface ChampionshipPanelProps {
  data: ChampionshipData | null;
  filter: MatchFilter;
}


const ChampionshipPanel: React.FC<
  ChampionshipPanelProps
> = ({
  data,
  filter,
}) => {

  const { slug } = useParams();

  const language =
    useLanguage();

  const t =
    translations[language];

  const location =
    useLocation();

  const navigate =
    useNavigate();


  // ==========================================================
  // DETERMINE CURRENT PANEL / VIEW
  // ==========================================================

  const {
    activePanel,
    activeView,
  } = useMemo(() => {

    const pathParts =
      location.pathname
        .split("/")
        .filter(Boolean);


    const championshipIndex =
      pathParts.indexOf("championship");


    /*
      GENERAL:

      /en/championship/premier-league
      /en/championship/premier-league/results
      /en/championship/premier-league/schedule
      /en/championship/premier-league/statistics


      OTHER PANELS:

      /en/championship/premier-league/match-results
      /en/championship/premier-league/match-results/favorites

      /en/championship/premier-league/btts
      /en/championship/premier-league/btts/categories

      /en/championship/premier-league/total-statistics
      /en/championship/premier-league/total-statistics/categories

      /en/championship/premier-league/handicap-statistics
      /en/championship/premier-league/handicap-statistics/favorites
    */


    const firstSlug =
      pathParts[
        championshipIndex + 2
      ] ?? "";


    const secondSlug =
      pathParts[
        championshipIndex + 3
      ] ?? "";


    // ========================================================
    // DEFAULT = GENERAL
    // ========================================================

    let panelType: PanelType =
      "GENERAL";


    let panel =
      panelConfig.GENERAL;


    let viewSlug =
      firstSlug;


    // ========================================================
    // CHECK IF FIRST SLUG IS A GENERAL VIEW
    // ========================================================

    const generalViewExists =
      Object.values(
        panelConfig.GENERAL.views
      ).some(
        (view) =>
          view.slug === firstSlug
      );


    // ========================================================
    // IF NOT GENERAL VIEW -> LOOK FOR PANEL
    // ========================================================

    if (
      !generalViewExists &&
      firstSlug
    ) {

      for (
        const [
          key,
          config,
        ] of Object.entries(
          panelConfig
        )
      ) {

        if (
          config.slug === firstSlug
        ) {

          panelType =
            key as PanelType;

          panel =
            config;

          viewSlug =
            secondSlug;

          break;
        }

      }

    }


    // ========================================================
    // FIND VIEW
    // ========================================================

    const viewKeys =
      Object.keys(
        panel.views
      );


    let viewKey =
      viewKeys[0];


    for (
      const [
        key,
        view,
      ] of Object.entries(
        panel.views
      )
    ) {

      if (
        view.slug === viewSlug
      ) {

        viewKey =
          key;

        break;
      }

    }


    return {
      activePanel:
        panelType,

      activeView:
        viewKey,
    };

  }, [
    location.pathname,
  ]);


  // ==========================================================
  // CURRENT PANEL
  // ==========================================================

  const panel =
    panelConfig[
      activePanel
    ];


  const views =
    panel.views;


  const ActiveComponent =
    views[
      activeView
    ].component;


  // ==========================================================
  // PANEL URL
  // ==========================================================

  const getPanelUrl = (
    panelType: PanelType
  ) => {

    const panelConfigItem =
      panelConfig[
        panelType
      ];


    const firstViewKey =
      Object.keys(
        panelConfigItem.views
      )[0];


    const firstView =
      panelConfigItem.views[
        firstViewKey
      ];


    // ========================================================
    // GENERAL
    // ========================================================

    if (
      panelType === "GENERAL"
    ) {

      return (
        `/${language}/championship/${slug}`
      );

    }


    // ========================================================
    // OTHER PANELS
    // ========================================================

    let url =
      `/${language}/championship/${slug}`;


    if (
      panelConfigItem.slug
    ) {

      url +=
        `/${panelConfigItem.slug}`;

    }


    /*
      Open first view of selected panel.
    */

    if (
      firstView.slug
    ) {

      url +=
        `/${firstView.slug}`;

    }


    return url;

  };


  // ==========================================================
  // VIEW URL
  // ==========================================================

  const getViewUrl = (
    viewSlug: string
  ) => {

    // ========================================================
    // GENERAL
    // ========================================================

    if (
      activePanel === "GENERAL"
    ) {

      let url =
        `/${language}/championship/${slug}`;


      if (
        viewSlug
      ) {

        url +=
          `/${viewSlug}`;

      }


      return url;

    }


    // ========================================================
    // OTHER PANELS
    // ========================================================

    let url =
      `/${language}/championship/${slug}`;


    if (
      panel.slug
    ) {

      url +=
        `/${panel.slug}`;

    }


    if (
      viewSlug
    ) {

      url +=
        `/${viewSlug}`;

    }


    return url;

  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="flex min-h-full flex-col xs:flex-col sm:flex-row">


      {/* ====================================================
          MOBILE NAVIGATION
          ==================================================== */}

      <div className="border-b bg-white sm:hidden">


        {/* PANEL SELECT */}

        <div className="p-2">

          <select
            className="w-full rounded border px-2 py-1 text-sm"
            value={activePanel}
            onChange={(e) => {

              const panelType =
                e.target.value as PanelType;


              navigate(
                getPanelUrl(
                  panelType
                )
              );

            }}
          >

            {Object.entries(
              panelConfig
            ).map(
              ([
                key,
                config,
              ]) => (

                <option
                  key={key}
                  value={key}
                >
                  {
                    t.panels[
                      config.translationKey
                    ]
                  }
                </option>

              )
            )}

          </select>

        </div>


        {/* VIEWS */}

        <div className="flex overflow-x-auto border-t">

          {Object.entries(
            views
          ).map(
            ([
              key,
              view,
            ]) => (

              <Link
                key={key}
                to={getViewUrl(
                  view.slug
                )}
                className={`whitespace-nowrap px-3 py-2 text-xs ${
                  activeView === key
                    ? "border-b-2 border-blue-700 font-semibold"
                    : ""
                }`}
              >
                {
                  t.views[
                    view.translationKey
                  ]
                }
              </Link>

            )
          )}

        </div>

      </div>


      {/* ====================================================
          DESKTOP SIDEBAR
          ==================================================== */}

      <div className="hidden w-52 shrink-0 self-stretch sm:flex sm:flex-col">


        {/* PANEL SELECT */}

        <div className="p-2">

          <select
            className="w-full rounded border p-2"
            value={activePanel}
            onChange={(e) => {

              const panelType =
                e.target.value as PanelType;


              navigate(
                getPanelUrl(
                  panelType
                )
              );

            }}
          >

            {Object.entries(
              panelConfig
            ).map(
              ([
                key,
                config,
              ]) => (

                <option
                  key={key}
                  value={key}
                >
                  {
                    t.panels[
                      config.translationKey
                    ]
                  }
                </option>

              )
            )}

          </select>

        </div>


        {/* VIEWS TITLE */}

        <div className="px-2 pb-2 text-xs uppercase text-gray-500">

          {t.common.views}

        </div>


        {/* VIEWS */}

        <div className="flex flex-col gap-1 p-2">

          {Object.entries(
            views
          ).map(
            ([
              key,
              view,
            ]) => (

              <Link
                key={key}
                to={getViewUrl(
                  view.slug
                )}
                className={`rounded px-3 py-2 text-left text-sm ${
                  activeView === key
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {
                  t.views[
                    view.translationKey
                  ]
                }
              </Link>

            )
          )}

        </div>

      </div>


      {/* ====================================================
          ACTIVE VIEW
          ==================================================== */}

      <div className="min-w-0 flex-1 py-2 sm:p-2">

        <ActiveComponent
          data={data}
          filter={filter}
        />

      </div>

    </div>

  );

};


export default ChampionshipPanel;