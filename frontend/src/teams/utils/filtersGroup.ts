import type { Match } from "../../types/football";
import { isTeamFavorite, isTeamNonFavorite, isTeamStrongFavorite } from "../logic/1teamMatchUtils";

export function getFavoriteTeamMatches(matches:Match[], teamId: number): Match[] | undefined {
    return matches.filter(match => isTeamFavorite(match, teamId))
}

export function getNonFavoriteTeamMatches(matches:Match[], teamId: number): Match[] | undefined {
    return matches.filter(match => isTeamNonFavorite(match, teamId))
}

export function getStrongFavoriteTeamMatches(matches:Match[], teamId: number): Match[] | undefined {
    return matches.filter(match => isTeamStrongFavorite(match, teamId))
}

