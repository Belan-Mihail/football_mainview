import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import { calculateGeneralTotalsResults } from "../../logic/12calculateGeneralResultTotal";

import type {
  TotalGeneral,
  TotalInTimes,
} from "../../types/5TotalTypes";

import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";


const TotalsGeneralView: React.FC<ViewProps> = ({
  data,
  filter,
}) => {

  // ==========================================================
  // LANGUAGE
  // ==========================================================

  const language =
    useLanguage();

  const t =
    translations[language];


  // ==========================================================
  // FILTERED MATCHES
  // ==========================================================

  const filteredMatches =
    useFilteredMatches(
      data,
      filter,
    );


  // ==========================================================
  // FINISHED MATCHES
  // ==========================================================

  const finishedMatches =
    useMemo(() => {

      return filteredMatches.filter(
        (match) =>
          match.status === "finished",
      );

    }, [
      filteredMatches,
    ]);


  // ==========================================================
  // STATISTICS
  // ==========================================================

  const statistics =
    useMemo(() => {

      return calculateGeneralTotalsResults(
        finishedMatches,
      );

    }, [
      finishedMatches,
    ]);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (!data) {

    return (
      <div>
        {t.common.loading}...
      </div>
    );

  }


  // ==========================================================
  // SEQUENCE
  // ==========================================================

  const renderSequence = (
    sequence: boolean[],
  ) => (

    <div className="flex flex-wrap justify-center gap-1">

      {sequence.map(
        (result, index) => (

          <div
            key={index}
            className={`h-3 w-3 rounded-full ${
              result
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

        ),
      )}

    </div>

  );


  // ==========================================================
  // FULL TIME SEQUENCE
  // ==========================================================

  const renderFullTimeSequence = (
    title: string,
    selector: (
      item: TotalGeneral
    ) => boolean,
  ) => (

    <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

      <div className="mb-2 text-center text-sm font-semibold">
        {title}
      </div>

      {renderSequence(
        statistics.currentForm.map(
          selector,
        ),
      )}

    </div>

  );


  // ==========================================================
  // HALF SEQUENCE
  // ==========================================================

  const renderHalfSequence = (
    title: string,
    sequence: TotalInTimes[],
    selector: (
      item: TotalInTimes
    ) => boolean,
  ) => (

    <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">

      <div className="mb-2 text-center text-sm font-semibold">
        {title}
      </div>

      {renderSequence(
        sequence.map(
          selector,
        ),
      )}

    </div>

  );


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">


      {/* ====================================================
          HEADER
          ==================================================== */}

      <div className="mb-4 flex items-center justify-between border-b pb-2">

        <div>

          <h2 className="text-lg font-bold">
            {t.pages.total.heading}
          </h2>

          <div className="text-xs text-gray-500">
            {t.pages.total.description}
          </div>

        </div>

        <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold">

          {finishedMatches.length}{" "}
          {t.common.matches}

        </div>

      </div>


      {/* ====================================================
          FULL TIME
          ==================================================== */}

      <div className="mb-6">

        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.fullTime}
        </h3>


        <div className="grid grid-cols-2 gap-2 lg:grid-cols-5">

          <StatCard
            title={`${t.common.over} 1.5`}
            value={`${statistics.matchOver15} (${statistics.matchOver15Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={`${t.common.over} 2.5`}
            value={`${statistics.matchOver25} (${statistics.matchOver25Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={`${t.common.over} 3.5`}
            value={`${statistics.matchOver35} (${statistics.matchOver35Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={`${t.common.over} 4.5`}
            value={`${statistics.matchOver45} (${statistics.matchOver45Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title={`${t.common.over} 5.5`}
            value={`${statistics.matchOver55} (${statistics.matchOver55Percent.toFixed(
              1,
            )}%)`}
          />

        </div>


        {/* CURRENT FORM */}

        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-5">

          {renderFullTimeSequence(
            `${t.common.over} 1.5`,
            (x) => x.over15,
          )}

          {renderFullTimeSequence(
            `${t.common.over} 2.5`,
            (x) => x.over25,
          )}

          {renderFullTimeSequence(
            `${t.common.over} 3.5`,
            (x) => x.over35,
          )}

          {renderFullTimeSequence(
            `${t.common.over} 4.5`,
            (x) => x.over45,
          )}

          {renderFullTimeSequence(
            `${t.common.over} 5.5`,
            (x) => x.over55,
          )}

        </div>

      </div>


      {/* ====================================================
          HALVES
          ==================================================== */}

      <div className="grid gap-6 lg:grid-cols-2">


        {/* ==================================================
            FIRST HALF
            ================================================== */}

        <div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
            {t.common.firstHalf}
          </h3>


          <div className="grid grid-cols-3 gap-2">

            <StatCard
              title={`${t.common.over} 0.5`}
              value={`${statistics.firstHalfOver05} (${statistics.firstHalfOver05Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title={`${t.common.over} 1.5`}
              value={`${statistics.firstHalfOver15} (${statistics.firstHalfOver15Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title={`${t.common.over} 2.5`}
              value={`${statistics.firstHalfOver25} (${statistics.firstHalfOver25Percent.toFixed(
                1,
              )}%)`}
            />

          </div>


          <div className="mt-4 space-y-2">

            {renderHalfSequence(
              `${t.common.over} 0.5`,
              statistics.firstHalfForm,
              (x) => x.over05,
            )}

            {renderHalfSequence(
              `${t.common.over} 1.5`,
              statistics.firstHalfForm,
              (x) => x.over15,
            )}

            {renderHalfSequence(
              `${t.common.over} 2.5`,
              statistics.firstHalfForm,
              (x) => x.over25,
            )}

          </div>

        </div>


        {/* ==================================================
            SECOND HALF
            ================================================== */}

        <div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
            {t.common.secondHalf}
          </h3>


          <div className="grid grid-cols-3 gap-2">

            <StatCard
              title={`${t.common.over} 0.5`}
              value={`${statistics.secondHalfOver05} (${statistics.secondHalfOver05Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title={`${t.common.over} 1.5`}
              value={`${statistics.secondHalfOver15} (${statistics.secondHalfOver15Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title={`${t.common.over} 2.5`}
              value={`${statistics.secondHalfOver25} (${statistics.secondHalfOver25Percent.toFixed(
                1,
              )}%)`}
            />

          </div>


          <div className="mt-4 space-y-2">

            {renderHalfSequence(
              `${t.common.over} 0.5`,
              statistics.secondHalfForm,
              (x) => x.over05,
            )}

            {renderHalfSequence(
              `${t.common.over} 1.5`,
              statistics.secondHalfForm,
              (x) => x.over15,
            )}

            {renderHalfSequence(
              `${t.common.over} 2.5`,
              statistics.secondHalfForm,
              (x) => x.over25,
            )}

          </div>

        </div>

      </div>

    </div>

  );

};


export default TotalsGeneralView;