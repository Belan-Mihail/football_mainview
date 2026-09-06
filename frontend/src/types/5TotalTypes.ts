export interface TotalGeneral {

    over15: boolean,
    over25: boolean,
    over35: boolean,
    over45: boolean,
    over55: boolean

}

export interface TotalInTimes {

    over05: boolean,
    over15: boolean,
    over25: boolean,

}

export interface TotalsForPeriods {
  match: TotalGeneral;
  firstHalf: TotalInTimes;
  secondHalf: TotalInTimes;
}

export interface TotalResults {
  matchesPlayed: number;

  matchOver15: number;
  matchOver25: number;
  matchOver35: number;
  matchOver45: number;
  matchOver55: number;

  matchNotOver15: number;
  matchNotOver25: number;
  matchNotOver35: number;
  matchNotOver45: number;
  matchNotOver55: number;

  matchOver15Percent: number;
  matchOver25Percent: number;
  matchOver35Percent: number;
  matchOver45Percent: number;
  matchOver55Percent: number;

  matchNotOver15Percent: number;
  matchNotOver25Percent: number;
  matchNotOver35Percent: number;
  matchNotOver45Percent: number;
  matchNotOver55Percent: number;

  firstHalfOver05: number;
  firstHalfOver15: number;
  firstHalfOver25: number;

  firstHalfNotOver05: number;
  firstHalfNotOver15: number;
  firstHalfNotOver25: number;

  firstHalfOver05Percent: number;
  firstHalfOver15Percent: number;
  firstHalfOver25Percent: number;

  firstHalfNotOver05Percent: number;
  firstHalfNotOver15Percent: number;
  firstHalfNotOver25Percent: number;

  secondHalfOver05: number;
  secondHalfOver15: number;
  secondHalfOver25: number;

  secondHalfNotOver05: number;
  secondHalfNotOver15: number;
  secondHalfNotOver25: number;

  secondHalfOver05Percent: number;
  secondHalfOver15Percent: number;
  secondHalfOver25Percent: number;

  secondHalfNotOver05Percent: number;
  secondHalfNotOver15Percent: number;
  secondHalfNotOver25Percent: number;

  currentForm: TotalGeneral[];
  firstHalfForm: TotalInTimes[];
  secondHalfForm: TotalInTimes[];
}

export interface TotalsCategoryResults {
  matches: number;

  matchOver15: number;
  matchOver25: number;
  matchOver35: number;
  matchOver45: number;
  matchOver55: number;

  matchNotOver15: number;
  matchNotOver25: number;
  matchNotOver35: number;
  matchNotOver45: number;
  matchNotOver55: number;

  matchOver15Percent: number;
  matchOver25Percent: number;
  matchOver35Percent: number;
  matchOver45Percent: number;
  matchOver55Percent: number;

  matchNotOver15Percent: number;
  matchNotOver25Percent: number;
  matchNotOver35Percent: number;
  matchNotOver45Percent: number;
  matchNotOver55Percent: number;

  firstHalfOver05: number;
  firstHalfOver15: number;
  firstHalfOver25: number;

  firstHalfNotOver05: number;
  firstHalfNotOver15: number;
  firstHalfNotOver25: number;

  firstHalfOver05Percent: number;
  firstHalfOver15Percent: number;
  firstHalfOver25Percent: number;

  firstHalfNotOver05Percent: number;
  firstHalfNotOver15Percent: number;
  firstHalfNotOver25Percent: number;

  secondHalfOver05: number;
  secondHalfOver15: number;
  secondHalfOver25: number;

  secondHalfNotOver05: number;
  secondHalfNotOver15: number;
  secondHalfNotOver25: number;

  secondHalfOver05Percent: number;
  secondHalfOver15Percent: number;
  secondHalfOver25Percent: number;

  secondHalfNotOver05Percent: number;
  secondHalfNotOver15Percent: number;
  secondHalfNotOver25Percent: number;
}

export interface TotalsCategoryResultsMap {
  [category: string]: TotalsCategoryResults;
}