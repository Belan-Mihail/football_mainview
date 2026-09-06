import { useMemo } from "react";

import filterMatches from "../logic/2filterMatches";

import type {
  ChampionshipData,
  Match,
  MatchFilter,
} from "../types/football";

const useFilteredMatches = (
  data: ChampionshipData | null,
  filter: MatchFilter
): Match[] => {
  return useMemo(() => {
    if (!data) return [];

    return filterMatches(data, filter);
  }, [data, filter]);
};

export default useFilteredMatches;