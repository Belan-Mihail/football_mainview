import type { Language } from "../i18n/types";

export const translations = {
    en: {
        panels: {
            general: "General",
            results: "Match Results",
            btts: "BTTS",
            total: "Total",
            handicap: "Handicap",
        },

        views: {
            standings: "Tournament Table",
            results: "Results",
            schedule: "Schedule",
            generalStatistics: "General Statistics",

            generalResults: "General Results",
            favorites: "Favorites",
            byCategories: "By Categories",

            general: "General",
        },

        pages: {
            standings: {
                title: "Standings",
                heading: "Standings",
                description:
                    "League standings, team positions, points, wins, draws, losses and goal statistics.",
            },

            results: {
                title: "Results",
                heading: "Match Results",
                description:
                    "Latest football match results, scores and completed matches from the championship.",
            },

            schedule: {
                title: "Schedule",
                heading: "Match Schedule",
                description:
                    "Upcoming football matches, fixtures and championship schedule.",
            },

            statistics: {
                title: "Statistics",
                heading: "General Statistics",
                description:
                    "Football statistics including goals, home wins, draws, away wins, BTTS, Over 2.5, Over 3.5 and clean sheets.",
            },

            matchResults: {
                title: "Match Results",
                heading: "Match Results",
                description:
                    "Detailed football match results and statistical analysis of completed championship matches.",
            },

            favoriteResults: {
                title: "Favorite Team Results",
                heading: "Favorite Team Results",
                description:
                    "Football results and statistics for matches involving favorite teams.",
            },

            nonfavoriteResults: {
                title: "Non-Favorite Team Results",
                heading: "Non-Favorite Team Results",
                description:
                    "Football results and statistics for matches involving non-favorite teams.",
            },

            strongFavoriteResults: {
                title: "Strong Favorite Team Results",
                heading: "Strong Favorite Team Results",
                description:
                    "Strong favorite is a team whose odds to win are at least 3.0 lower than the opponent's.",
            },

            matchResultsCategories: {
                title: "Match Results by Categories",
                heading: "Match Results by Categories",
                description:
                    "Football match results and statistics grouped by betting odds categories.",
            },

            btts: {
                title: "BTTS Statistics",
                heading: "Both Teams To Score Statistics",
                description:
                    "Both Teams To Score statistics including BTTS results and percentages for championship matches.",
            },

            bttsCategories: {
                title: "BTTS Statistics by Categories",
                heading: "BTTS Statistics by Categories",
                description:
                    "Both Teams To Score statistics grouped by betting odds categories.",
            },

            total: {
                title: "Total Goals Statistics",
                heading: "Total Goals Statistics",
                description:
                    "Football total goals statistics including average goals, Over 2.5, Over 3.5 and other goal markets.",
            },

            totalCategories: {
                title: "Total Goals Statistics by Categories",
                heading: "Total Goals by Categories",
                description:
                    "Total goals statistics grouped by betting odds categories.",
            },

            handicap: {
                title: "Handicap Statistics",
                heading: "Handicap Statistics",
                description:
                    "Football handicap statistics including handicap results, percentages and goal differences.",
            },

            favoriteHandicap: {
                title: "Favorite Handicap Statistics",
                heading: "Favorite Handicap Statistics",
                description:
                    "Football handicap statistics for favorite and strong favorite teams.",
            },

            nonfavoriteHandicap: {
                title: "Non-Favorite Handicap Statistics",
                heading: "Non-Favorite Handicap Statistics",
                description:
                    "Football handicap statistics for non-favorite teams.",
            },

            strongfavoriteHandicap: {
                title: "Strong Favorite Handicap Statistics",
                heading: "Strong Favorite Handicap Statistics",
                description:
                    "Strong favorite is a team whose odds to win are at least 3.0 lower than the opponent's.",
            },

            handicapCategories: {
                title: "Handicap Statistics by Categories",
                heading: "Handicap Statistics by Categories",
                description:
                    "Football handicap statistics grouped by betting odds categories.",
            },
        },

        common: {
            views: "Views",

            category: "Category",
            matches: "matches",

            fullTime: "Full Time",
            firstHalf: "First Half",
            secondHalf: "Second Half",

            over: "Over",

            loading: "Loading",
            current_form: "Current Form",
            home: "Home",
            away: "Away",
            favorites: "Favorites",
            nonfavorites: "Non-Favorites",
            strongFavorits: "Strong Favorites",
            last_matches: "Last Matches",
            Matches: "Matches",
            Wins: "Wins",
            Draws: "Draws",
            Losses: "Losses",
            AvgScored: "Avg Scored",
            AvgConceded: "Avg Conceded",
            HomeWins: "Home Wins",
            AwayWins: "Away Wins",
            MatchesPlayed: "Matches Played",
            AverageGoals: "Average Goals",
            AverageHomeGoals: "Average Home Goals",
            AverageAwayGoals: "Average Away Goals",
            BothTeamsToScore: "Both Teams To Score",
            BothTeamsNotToScore: "Both Teams Not To Score",
            Over05: "Over 0.5",
            Over15: "Over 1.5",
            Over25: "Over 2.5",
            Over35: "Over 3.5",
            Over45: "Over 4.5",
            Over55: "Over 5.5",
            HomeCleanSheets: "Home Clean Sheets",
            AwayCleanSheets: "Away Clean Sheets",
            TotalGoals: "Total Goals",
            HomeGoals: "Home Goals",
            AwayGoals: "Away Goals",
            Round: "Round",
            MainSlogan: "Advanced Football Statistics",
            averageFirstHalfGoals: "Average First Half Goals",
            Back: "Back",
averageSecondHalfGoals: "Average Second Half Goals",
averageHomeTeamFirstHalfGoals: "Average Home Team First Half Goals",
averageHomeTeamSecondHalfGoals: "Average Home Team Second Half Goals",
averageAwayTeamFirstHalfGoals: "Average Away Team First Half Goals",
averageAwayTeamSecondHalfGoals: "Average Away Team Second Half Goals",

totalFirstHalfGoals: "Total First Half Goals",
totalSecondHalfGoals: "Total Second Half Goals",
totalHomeTeamFirstHalfGoals: "Total Home Team First Half Goals",
totalHomeTeamSecondHalfGoals: "Total Home Team Second Half Goals",
totalAwayTeamFirstHalfGoals: "Total Away Team First Half Goals",
totalAwayTeamSecondHalfGoals: "Total Away Team Second Half Goals",

totalGoalsTill15Min: "Goals Up to 15 Minutes",
totalGoalsFrom16Till30Min: "Goals from 16 to 30 Minutes",
totalGoalsFrom31Till45Min: "Goals from 31 to 45 Minutes",
totalGoalsFrom46Till60Min: "Goals from 46 to 60 Minutes",
totalGoalsFrom61Till75Min: "Goals from 61 to 75 Minutes",
totalGoalsAfter75Min: "Goals After 75 Minutes",

totalHomeTeamGoalsTill15Min: "Home Team Goals Up to 15 Minutes",
totalHomeTeamGoalsFrom16Till30Min: "Home Team Goals from 16 to 30 Minutes",
totalHomeTeamGoalsFrom31Till45Min: "Home Team Goals from 31 to 45 Minutes",
totalHomeTeamGoalsFrom46Till60Min: "Home Team Goals from 46 to 60 Minutes",
totalHomeTeamGoalsFrom61Till75Min: "Home Team Goals from 61 to 75 Minutes",
totalHomeTeamGoalsAfter75Min: "Home Team Goals After 75 Minutes",

totalAwayTeamGoalsTill15Min: "Away Team Goals Up to 15 Minutes",
totalAwayTeamGoalsFrom16Till30Min: "Away Team Goals from 16 to 30 Minutes",
totalAwayTeamGoalsFrom31Till45Min: "Away Team Goals from 31 to 45 Minutes",
totalAwayTeamGoalsFrom46Till60Min: "Away Team Goals from 46 to 60 Minutes",
totalAwayTeamGoalsFrom61Till75Min: "Away Team Goals from 61 to 75 Minutes",
totalAwayTeamGoalsAfter75Min: "Away Team Goals After 75 Minutes",

        },
    },

    de: {
        panels: {
            general: "Allgemein",
            results: "Spielergebnisse",
            btts: "Beide Teams treffen",
            total: "Tore Gesamt",
            handicap: "Handicap",
        },

        views: {
            standings: "Tabelle",
            results: "Ergebnisse",
            schedule: "Spielplan",
            generalStatistics: "Allgemeine Statistiken",

            generalResults: "Allgemeine Ergebnisse",
            favorites: "Favoriten",
            byCategories: "Nach Kategorien",

            general: "Allgemein",
        },

        pages: {
            standings: {
                title: "Tabelle",
                heading: "Ligatabelle",
                description:
                    "Ligatabelle mit Platzierungen, Punkten, Siegen, Unentschieden, Niederlagen und Torstatistiken.",
            },

            results: {
                title: "Ergebnisse",
                heading: "Spielergebnisse",
                description:
                    "Aktuelle Fußballergebnisse, Spielstände und abgeschlossene Spiele der Meisterschaft.",
            },

            schedule: {
                title: "Spielplan",
                heading: "Spielplan",
                description:
                    "Bevorstehende Fußballspiele, Begegnungen und Spielplan der Meisterschaft.",
            },

            statistics: {
                title: "Statistiken",
                heading: "Allgemeine Statistiken",
                description:
                    "Fußballstatistiken einschließlich Tore, Heimsiege, Unentschieden, Auswärtssiege, Beide Teams treffen, Über 2,5, Über 3,5 und Zu-Null-Spiele.",
            },

            matchResults: {
                title: "Spielergebnisse",
                heading: "Spielergebnisse",
                description:
                    "Detaillierte Fußballergebnisse und statistische Analyse abgeschlossener Spiele der Meisterschaft.",
            },

            favoriteResults: {
                title: "Ergebnisse der Favoriten",
                heading: "Ergebnisse der Favoritenteams",
                description:
                    "Fußballergebnisse und Statistiken für Spiele mit Favoritenteams.",
            },

            nonfavoriteResults: {
                title: "Ergebnisse der Nicht-Favoriten",
                heading: "Ergebnisse der Nicht-Favoritenteams",
                description:
                    "Fußballergebnisse und Statistiken für Spiele mit Nicht-Favoritenteams.",
            },

            strongFavoriteResults: {
                title: "Ergebnisse der starken Favoriten",
                heading: "Ergebnisse der starken Favoritenteams",
                description:
                    "Ein starker Favorit ist eine Mannschaft, deren Quote auf den Sieg mindestens um 3,0 niedriger ist als die des Gegners",
            },

            matchResultsCategories: {
                title: "Spielergebnisse nach Kategorien",
                heading: "Spielergebnisse nach Kategorien",
                description:
                    "Fußballergebnisse und Statistiken, gruppiert nach Quoten-Kategorien.",
            },

            btts: {
                title: "BTTS-Statistiken",
                heading: "Beide Teams treffen",
                description:
                    "Statistiken dazu, ob beide Teams in Meisterschaftsspielen ein Tor erzielen.",
            },

            bttsCategories: {
                title: "BTTS-Statistiken nach Kategorien",
                heading: "Beide Teams treffen nach Kategorien",
                description:
                    "BTTS-Statistiken, gruppiert nach Quoten-Kategorien.",
            },

            total: {
                title: "Tor-Statistiken",
                heading: "Gesamttore-Statistiken",
                description:
                    "Statistiken zu Gesamttoren einschließlich durchschnittlicher Tore, Über 2,5, Über 3,5 und weiterer Tor-Märkte.",
            },

            totalCategories: {
                title: "Tor-Statistiken nach Kategorien",
                heading: "Gesamttore nach Kategorien",
                description:
                    "Statistiken zu Gesamttoren, gruppiert nach Quoten-Kategorien.",
            },

            handicap: {
                title: "Handicap-Statistiken",
                heading: "Handicap-Statistiken",
                description:
                    "Fußball-Handicap-Statistiken einschließlich Handicap-Ergebnissen, Prozentsätzen und Tordifferenzen.",
            },

            favoriteHandicap: {
                title: "Favoriten-Handicap-Statistiken",
                heading: "Handicap-Statistiken der Favoriten",
                description:
                    "Handicap-Statistiken für Favoriten und starke Favoriten.",
            },
            nonfavoriteHandicap: {
                title: "Nicht-Favoriten-Handicap-Statistiken",
                heading: "Nicht-Favoriten-Handicap-Statistiken",
                description:
                    "Handicap-Statistiken für Nicht-Favoriten.",
            },

            strongfavoriteHandicap: {
                title: "Starke Favoriten-Handicap-Statistiken",
                heading: "Starke Favoriten-Handicap-Statistiken",
                description:
                    "Ein starker Favorit ist eine Mannschaft, deren Quote auf den Sieg mindestens um 3,0 niedriger ist als die des Gegners",
            },

            handicapCategories: {
                title: "Handicap-Statistiken nach Kategorien",
                heading: "Handicap nach Kategorien",
                description:
                    "Handicap-Statistiken, gruppiert nach Quoten-Kategorien.",
            },
        },

        common: {
            views: "Ansichten",

            category: "Kategorie",
            matches: "Spiele",

            fullTime: "Gesamtzeit",
            firstHalf: "1. Halbzeit",
            secondHalf: "2. Halbzeit",

            over: "Über",

            loading: "Laden",
            current_form: "Aktuelle Form",
            home: "Heim",
            away: "Auswärts",
            favorites: "Favoriten",
            nonfavorites: "Nicht-Favoriten",
            strongFavorits: "Starke Favoriten",
            last_matches: "Letzte Spiele",
            Matches: "Spiele",
            Wins: "Siege",
            Draws: "Unentschieden",
            Losses: "Niederlagen",
            AvgScored: "Durchschnitt erzielte Tore",
            AvgConceded: "Durchschnitt kassierte Tore",
            HomeWins: "Heimsiege",
            AwayWins: "Auswärtssiege",

            MatchesPlayed: "Gespielte Spiele",
            AverageGoals: "Durchschnittliche Tore",
            AverageHomeGoals: "Durchschnittliche Heimtore",
            AverageAwayGoals: "Durchschnittliche Auswärtstore",
            BothTeamsToScore: "Beide Teams treffen",
            BothTeamsNotToScore: "Nicht beide Teams treffen",
            Over05: "Über 0,5",
            Over15: "Über 1,5",
            Over25: "Über 2,5",
            Over35: "Über 3,5",
            Over45: "Über 4,5",
            Over55: "Über 5,5",
            HomeCleanSheets: "Heimspiele ohne Gegentor",
            AwayCleanSheets: "Auswärtsspiele ohne Gegentor",
            TotalGoals: "Gesamttore",
            HomeGoals: "Heimtore",
            AwayGoals: "Auswärtstore",
            Round: "Runde",
            Back: "Zurück",
            MainSlogan: "Fortgeschrittene Fußballstatistiken",
averageFirstHalfGoals: "Durchschnittliche Tore in der 1. Halbzeit",
averageSecondHalfGoals: "Durchschnittliche Tore in der 2. Halbzeit",
averageHomeTeamFirstHalfGoals: "Durchschnittliche Heimtore in der 1. Halbzeit",
averageHomeTeamSecondHalfGoals: "Durchschnittliche Heimtore in der 2. Halbzeit",
averageAwayTeamFirstHalfGoals: "Durchschnittliche Auswärtstore in der 1. Halbzeit",
averageAwayTeamSecondHalfGoals: "Durchschnittliche Auswärtstore in der 2. Halbzeit",

totalFirstHalfGoals: "Gesamttore in der 1. Halbzeit",
totalSecondHalfGoals: "Gesamttore in der 2. Halbzeit",
totalHomeTeamFirstHalfGoals: "Gesamte Heimtore in der 1. Halbzeit",
totalHomeTeamSecondHalfGoals: "Gesamte Heimtore in der 2. Halbzeit",
totalAwayTeamFirstHalfGoals: "Gesamte Auswärtstore in der 1. Halbzeit",
totalAwayTeamSecondHalfGoals: "Gesamte Auswärtstore in der 2. Halbzeit",

totalGoalsTill15Min: "Tore bis zur 15. Minute",
totalGoalsFrom16Till30Min: "Tore von der 16. bis zur 30. Minute",
totalGoalsFrom31Till45Min: "Tore von der 31. bis zur 45. Minute",
totalGoalsFrom46Till60Min: "Tore von der 46. bis zur 60. Minute",
totalGoalsFrom61Till75Min: "Tore von der 61. bis zur 75. Minute",
totalGoalsAfter75Min: "Tore nach der 75. Minute",

totalHomeTeamGoalsTill15Min: "Heimtore bis zur 15. Minute",
totalHomeTeamGoalsFrom16Till30Min: "Heimtore von der 16. bis zur 30. Minute",
totalHomeTeamGoalsFrom31Till45Min: "Heimtore von der 31. bis zur 45. Minute",
totalHomeTeamGoalsFrom46Till60Min: "Heimtore von der 46. bis zur 60. Minute",
totalHomeTeamGoalsFrom61Till75Min: "Heimtore von der 61. bis zur 75. Minute",
totalHomeTeamGoalsAfter75Min: "Heimtore nach der 75. Minute",

totalAwayTeamGoalsTill15Min: "Auswärtstore bis zur 15. Minute",
totalAwayTeamGoalsFrom16Till30Min: "Auswärtstore von der 16. bis zur 30. Minute",
totalAwayTeamGoalsFrom31Till45Min: "Auswärtstore von der 31. bis zur 45. Minute",
totalAwayTeamGoalsFrom46Till60Min: "Auswärtstore von der 46. bis zur 60. Minute",
totalAwayTeamGoalsFrom61Till75Min: "Auswärtstore von der 61. bis zur 75. Minute",
totalAwayTeamGoalsAfter75Min: "Auswärtstore nach der 75. Minute",
        },
    },
} as const;

export type Translations = typeof translations;