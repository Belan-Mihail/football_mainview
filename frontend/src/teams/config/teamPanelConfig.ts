import React from "react";

import type {
  Championship,
  Match,
  Season,
  Team,
} from "../../types/football";

import TeamOverviewView from "../views/1TeamOverviewView";
import TeamResultsView from "../views/2TeamResultsView";
import TeamStatisticsView from "../views/3TeamStatisticsView";
import TeamAdditionalStatisticsView from "../views/4TeamAdditionalStatisticsView";
import TeamResultsFavoriteView from "../views/2-1TeamResultFavoriteView";
import TeamResultsCategoryView from "../views/2-2TeamResultCategoryView";


// ==========================================================
// TEAM DATA
// ==========================================================

export interface TeamData {
  team: Team;
  championships: Championship[];
  seasons: Season[];
  matches: Match[];
}


// ==========================================================
// VIEW PROPS
// ==========================================================

export interface TeamViewProps {
  data: TeamData;
  matches: Match[];
}


// ==========================================================
// TEAM VIEW TRANSLATION KEYS
// ==========================================================

export type TeamViewTranslationKey =
  | "overview"
  | "results"
  | "statistics"
  | "additionalStatistics";


// ==========================================================
// SINGLE VIEW CONFIG
// ==========================================================

export interface TeamViewConfig {
  type: "view";

  translationKey: TeamViewTranslationKey;

  slug: string;

  /**
   * Translation key for browser title,
   * heading and meta description.
   */
  pageKey: string;

  component: React.FC<TeamViewProps>;
}


// ==========================================================
// GROUP VIEW CONFIG
// ==========================================================

export interface TeamViewGroupConfig {
  type: "group";

  translationKey: TeamViewTranslationKey;

  children: Record<string, TeamViewConfig>;
}


// ==========================================================
// TEAM VIEW
// ==========================================================

export type TeamView = TeamViewConfig | TeamViewGroupConfig;


// ==========================================================
// TEAM PANEL CONFIG
// ==========================================================

export interface TeamPanelConfig {
  translationKey: "team";

  views: Record<string, TeamView>;
}


// ==========================================================
// TEAM PANEL
// ==========================================================

export const teamPanelConfig: TeamPanelConfig = {
  translationKey: "team",

  views: {
    OVERVIEW: {
      type: "view",

      translationKey: "overview",
      slug: "",
      pageKey: "overview",

      component: TeamOverviewView,
    },

    RESULTS: {
      type: "group",

      translationKey: "results",

      children: {
        GENERAL: {
          type: "view",

          translationKey: "results",
          slug: "results",
          pageKey: "results",

          component: TeamResultsView,
        },

        FAVORITES: {
          type: "view",

          translationKey: "results",
          slug: "results/favorites",
          pageKey: "resultsFavorites",

          component: TeamResultsFavoriteView,
        },

        CATEGORIES: {
          type: "view",

          translationKey: "results",
          slug: "results/categories",
          pageKey: "resultsCategories",

          component: TeamResultsCategoryView,
        },
      },
    },

    STATISTICS: {
      type: "view",

      translationKey: "statistics",
      slug: "statistics",
      pageKey: "statistics",

      component: TeamStatisticsView,
    },

    ADDITIONAL: {
      type: "view",

      translationKey: "additionalStatistics",
      slug: "additional-statistics",
      pageKey: "additionalStatistics",

      component: TeamAdditionalStatisticsView,
    },
  },
};