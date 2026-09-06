import { useMemo } from "react";

import { filterMatchesByRound } from "../logic/2filterMatches";

import type {
  ChampionshipData,
  Match,
} from "../types/football";

const useRoundFilteredMatches = (
  data: ChampionshipData | null,
  season: number,
  round: number
): Match[] => {
  return useMemo(() => {
    if (!data) return [];

    return filterMatchesByRound(data, season, round);
  }, [data, season, round]);
};

export default useRoundFilteredMatches;