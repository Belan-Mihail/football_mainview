import React from "react";

import StandingsView from "../views/1 general/StandingsView";
import ScheduleView from "../views/1 general/ScheduleView";
import GeneralStatisticsView from "../views/1 general/GeneralStatisticsView";
import ResultView from "../views/1 general/ResultView";

import GeneralMatchResultView from "../views/2 matchResults/GeneralMatchResultView";
import MatchResultByFavorView from "../views/2 matchResults/MatchResultByFavorView";
import MatchResultByCategoryView from "../views/2 matchResults/CategoryResultsView";

import BTTSGeneralView from "../views/3 btts/BTTSGeneralView";
import BTTSByCategoryView from "../views/3 btts/BTTSByCategoryView";

import TotalGeneralView from "../views/4 total/TotalsGeneralView";
import TotalsByCategoryView from "../views/4 total/TotalsByCategoryView";

import HandicapGeneralView from "../views/5 handicap/HandicapGeneralView";
import FavoriteHandicapView from "../views/5 handicap/HandicapsByFavView";
import HandicapByCategoryView from "../views/5 handicap/HandicapByCategoryView";

import type {
  ChampionshipData,
  MatchFilter,
  RoundData,
} from "../types/football";


export interface ViewProps {
  data: ChampionshipData | null;
  filter: MatchFilter;
}

export interface RoundViewProps {
  data: RoundData | null;
}


export type PanelType =
  | "GENERAL"
  | "RESULTS"
  | "BTTS"
  | "TOTAL"
  | "HANDICAP";


export type TranslationKey =
  | "standings"
  | "results"
  | "schedule"
  | "generalStatistics"
  | "generalResults"
  | "favorites"
  | "byCategories"
  | "general";


export interface ViewConfig {

  translationKey: TranslationKey;

  slug: string;

  /**
   * Translation key for browser title,
   * heading and meta description.
   */
  pageKey: string;

  component: React.FC<ViewProps>;
}


export interface PanelConfig {

  translationKey:
    | "general"
    | "results"
    | "btts"
    | "total"
    | "handicap";

  slug: string;

  views: Record<string, ViewConfig>;
}


export const panelConfig:
  Record<PanelType, PanelConfig> = {

  // ==========================================================
  // GENERAL
  // ==========================================================

  GENERAL: {

    translationKey: "general",

    slug: "",

    views: {

      STANDINGS: {

        translationKey: "standings",

        slug: "standings",

        pageKey: "standings",

        component: StandingsView,
      },

      RESULT: {

        translationKey: "results",

        slug: "results",

        pageKey: "results",

        component: ResultView,
      },

      SCHEDULE: {

        translationKey: "schedule",

        slug: "schedule",

        pageKey: "schedule",

        component: ScheduleView,
      },

      STATISTICS: {

        translationKey: "generalStatistics",

        slug: "statistics",

        pageKey: "statistics",

        component: GeneralStatisticsView,
      },
    },
  },


  // ==========================================================
  // MATCH RESULTS
  // ==========================================================

  RESULTS: {

    translationKey: "results",

    slug: "match-results",

    views: {

      GENERAL_RESULTS: {

        translationKey: "generalResults",

        slug: "",

        pageKey: "matchResults",

        component: GeneralMatchResultView,
      },

      FAVORITES: {

        translationKey: "favorites",

        slug: "favorites",

        pageKey: "favoriteResults",

        component: MatchResultByFavorView,
      },

      BY_CATEGORIES: {

        translationKey: "byCategories",

        slug: "categories",

        pageKey: "matchResultsCategories",

        component: MatchResultByCategoryView,
      },
    },
  },


  // ==========================================================
  // BTTS
  // ==========================================================

  BTTS: {

    translationKey: "btts",

    slug: "btts",

    views: {

      GENERAL_RESULTS: {

        translationKey: "general",

        slug: "",

        pageKey: "btts",

        component: BTTSGeneralView,
      },

      BY_CATEGORIES: {

        translationKey: "byCategories",

        slug: "categories",

        pageKey: "bttsCategories",

        component: BTTSByCategoryView,
      },
    },
  },


  // ==========================================================
  // TOTAL
  // ==========================================================

  TOTAL: {

    translationKey: "total",

    slug: "total-statistics",

    views: {

      GENERAL_RESULTS: {

        translationKey: "general",

        slug: "",

        pageKey: "total",

        component: TotalGeneralView,
      },

      BY_CATEGORIES: {

        translationKey: "byCategories",

        slug: "categories",

        pageKey: "totalCategories",

        component: TotalsByCategoryView,
      },
    },
  },


  // ==========================================================
  // HANDICAP
  // ==========================================================

  HANDICAP: {

    translationKey: "handicap",

    slug: "handicap-statistics",

    views: {

      GENERAL_RESULTS: {

        translationKey: "general",

        slug: "",

        pageKey: "handicap",

        component: HandicapGeneralView,
      },

      FAVORITES: {

        translationKey: "favorites",

        slug: "favorites",

        pageKey: "favoriteHandicap",

        component: FavoriteHandicapView,
      },

      BY_CATEGORIES: {

        translationKey: "byCategories",

        slug: "categories",

        pageKey: "handicapCategories",

        component: HandicapByCategoryView,
      },
    },
  },
};