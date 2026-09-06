export interface CategoryBTTSStats {
  matches: number;

  yes: number;
  no: number;

  yesPercent: number;
  noPercent: number;

  firstHalfYes: number;
  firstHalfNo: number;

  firstHalfYesPercent: number;
  firstHalfNoPercent: number;

  secondHalfYes: number;
  secondHalfNo: number;

  secondHalfYesPercent: number;
  secondHalfNoPercent: number;

  currentForm: boolean[];
  firstHalfForm: boolean[];
  secondHalfForm: boolean[];
}

export interface CategoryBTTSMap {
  [category: string]: CategoryBTTSStats;
}