
export interface HandicapGeneral {

    minus05: boolean,
    minus15: boolean,
    minus25: boolean,
    plus05: boolean,
    plus15: boolean,
    plus25: boolean,

}

export interface HandicapHalf {

    minus05: boolean,
    minus15: boolean,
    plus05: boolean,
    plus15: boolean,

}

export interface HandicapResults {
  matchesPlayed: number;

  minus05: number;
  minus15: number;
  minus25: number;

  plus05: number;
  plus15: number;
  plus25: number;

  minus05Percent: number;
  minus15Percent: number;
  minus25Percent: number;

  plus05Percent: number;
  plus15Percent: number;
  plus25Percent: number;

  firstHalfMinus05: number;
  firstHalfMinus15: number;

  firstHalfPlus05: number;
  firstHalfPlus15: number;

  firstHalfMinus05Percent: number;
  firstHalfMinus15Percent: number;

  firstHalfPlus05Percent: number;
  firstHalfPlus15Percent: number;

  secondHalfMinus05: number;
  secondHalfMinus15: number;

  secondHalfPlus05: number;
  secondHalfPlus15: number;

  secondHalfMinus05Percent: number;
  secondHalfMinus15Percent: number;

  secondHalfPlus05Percent: number;
  secondHalfPlus15Percent: number;

  currentForm: HandicapGeneral[];

  firstHalfForm: HandicapHalf[];

  secondHalfForm: HandicapHalf[];
}

export interface HandicapGeneralFav {

    favoriteMinus05: boolean,
    favoriteMinus15: boolean,
    favoriteMinus25: boolean,
    nonFavoritePlus05: boolean,
    nonFavoritePlus15: boolean,
    nonFavoritePlus25: boolean,
    strongFavoriteMinus05: boolean | null,
    strongFavoriteMinus15: boolean | null,
    strongFavoriteMinus25: boolean | null,

}

export interface HandicapHalfFav {

    favoriteMinus05: boolean,
    favoriteMinus15: boolean,

    nonFavoritePlus05: boolean,
    nonFavoritePlus15: boolean,

    strongFavoriteMinus05: boolean | null,
    strongFavoriteMinus15: boolean | null,

}

export interface FavoriteHandicapResults {
  matchesPlayed: number;

  minus05: number;
  minus15: number;
  minus25: number;

  plus05: number;
  plus15: number;
  plus25: number;

  minus05Percent: number;
  minus15Percent: number;
  minus25Percent: number;

  plus05Percent: number;
  plus15Percent: number;
  plus25Percent: number;

  firstHalfMinus05: number;
  firstHalfMinus15: number;

  firstHalfPlus05: number;
  firstHalfPlus15: number;

  firstHalfMinus05Percent: number;
  firstHalfMinus15Percent: number;

  firstHalfPlus05Percent: number;
  firstHalfPlus15Percent: number;

  secondHalfMinus05: number;
  secondHalfMinus15: number;

  secondHalfPlus05: number;
  secondHalfPlus15: number;

  secondHalfMinus05Percent: number;
  secondHalfMinus15Percent: number;

  secondHalfPlus05Percent: number;
  secondHalfPlus15Percent: number;

fullTime05Form: boolean[];
fullTime15Form: boolean[];
fullTime25Form: boolean[];

firstHalf05Form: boolean[];
firstHalf15Form: boolean[];

secondHalf05Form: boolean[];
secondHalf15Form: boolean[];
}

export interface FavoriteHandicapStatistics {
  favorites: FavoriteHandicapResults;
  nonFavorites: FavoriteHandicapResults;
  strongFavorites: FavoriteHandicapResults;
}

export interface HandicapCategory {
  handicap05: boolean;
  handicap15: boolean;
  handicap25: boolean;
}

export interface CategoryHandicapResults {
  matchesPlayed: number;

  handicap05: number;
  handicap15: number;
  handicap25: number;

  handicap05Percent: number;
  handicap15Percent: number;
  handicap25Percent: number;

  firstHalfHandicap05: number;
  firstHalfHandicap15: number;

  firstHalfHandicap05Percent: number;
  firstHalfHandicap15Percent: number;

  secondHalfHandicap05: number;
  secondHalfHandicap15: number;

  secondHalfHandicap05Percent: number;
  secondHalfHandicap15Percent: number;

fullTime05Form: boolean[];
fullTime15Form: boolean[];
fullTime25Form: boolean[];

firstHalf05Form: boolean[];
firstHalf15Form: boolean[];

secondHalf05Form: boolean[];
secondHalf15Form: boolean[];
}


export interface CategoryHandicapResultsMap {
  [category: string]: CategoryHandicapResults;
}