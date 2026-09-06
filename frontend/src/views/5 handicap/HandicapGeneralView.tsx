import { useMemo, useState } from "react";

import type { ViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import useFilteredMatches from "../../hooks/useFilteredMatches";

import { calculateGeneralHandicapResults } from "../../logic/14calculateHandicapsGeneral";

import type {
  HandicapGeneral,
  HandicapHalf,
} from "../../types/6HandicapTypes";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const HandicapGeneralView: React.FC<ViewProps> = ({ data, filter }) => {
  const language = useLanguage();
  const t = translations[language];
  const [side, setSide] = useState<"HOME" | "AWAY">("HOME");

  const filteredMatches = useFilteredMatches(data, filter);

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter(
      (match) => match.status === "finished",
    );
  }, [filteredMatches]);

  const statistics = useMemo(() => {
    return calculateGeneralHandicapResults(
      finishedMatches,
      side,
    );
  }, [finishedMatches, side]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  const renderSequence = (sequence: boolean[]) => (
    <div className="flex flex-wrap justify-center gap-1">
      {sequence.map((result, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full ${
            result ? "bg-green-500" : "bg-red-500"
          }`}
        />
      ))}
    </div>
  );

  const renderFullTimeSequence = (
    title: string,
    selector: (item: HandicapGeneral) => boolean,
  ) => (
    <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-2 text-center text-sm font-semibold">
        {title}
      </div>

      {renderSequence(statistics.currentForm.map(selector))}
    </div>
  );

  const renderHalfSequence = (
    title: string,
    sequence: HandicapHalf[],
    selector: (item: HandicapHalf) => boolean,
  ) => (
    <div className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-2 text-center text-sm font-semibold">
        {title}
      </div>

      {renderSequence(sequence.map(selector))}
    </div>
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

      {/* Header */}

      <div className="mb-4 flex items-center justify-between border-b pb-2">

        <div>

          <h2 className="text-lg font-bold">
            {t.pages.handicap.heading}
          </h2>

          <div className="text-xs text-gray-500">
            {t.pages.handicap.description}
          </div>

        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={() => setSide("HOME")}
            className={`rounded px-3 py-1 text-sm ${
              side === "HOME"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {t.common.home}
          </button>

          <button
            onClick={() => setSide("AWAY")}
            className={`rounded px-3 py-1 text-sm ${
              side === "AWAY"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {t.common.away}
          </button>

          <div className="rounded bg-gray-100 px-3 py-1 text-sm font-semibold">
            {finishedMatches.length} {t.common.matches}
          </div>

        </div>

      </div>

      {/* Full Time */}

      <div className="mb-6">

        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
          {t.common.fullTime}
        </h3>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-6">

          <StatCard
            title="-0.5"
            value={`${statistics.minus05} (${statistics.minus05Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title="-1.5"
            value={`${statistics.minus15} (${statistics.minus15Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title="-2.5"
            value={`${statistics.minus25} (${statistics.minus25Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title="+0.5"
            value={`${statistics.plus05} (${statistics.plus05Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title="+1.5"
            value={`${statistics.plus15} (${statistics.plus15Percent.toFixed(
              1,
            )}%)`}
          />

          <StatCard
            title="+2.5"
            value={`${statistics.plus25} (${statistics.plus25Percent.toFixed(
              1,
            )}%)`}
          />

        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-6">

          {renderFullTimeSequence("-0.5", x => x.minus05)}

          {renderFullTimeSequence("-1.5", x => x.minus15)}

          {renderFullTimeSequence("-2.5", x => x.minus25)}

          {renderFullTimeSequence("+0.5", x => x.plus05)}

          {renderFullTimeSequence("+1.5", x => x.plus15)}

          {renderFullTimeSequence("+2.5", x => x.plus25)}

        </div>

      </div>

      {/* Halves */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
            {t.common.firstHalf}
          </h3>

          <div className="grid grid-cols-4 gap-2">

            <StatCard
              title="-0.5"
              value={`${statistics.firstHalfMinus05} (${statistics.firstHalfMinus05Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title="-1.5"
              value={`${statistics.firstHalfMinus15} (${statistics.firstHalfMinus15Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title="+0.5"
              value={`${statistics.firstHalfPlus05} (${statistics.firstHalfPlus05Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title="+1.5"
              value={`${statistics.firstHalfPlus15} (${statistics.firstHalfPlus15Percent.toFixed(
                1,
              )}%)`}
            />

          </div>

          <div className="mt-4 space-y-2">

            {renderHalfSequence("-0.5", statistics.firstHalfForm, x => x.minus05)}

            {renderHalfSequence("-1.5", statistics.firstHalfForm, x => x.minus15)}

            {renderHalfSequence("+0.5", statistics.firstHalfForm, x => x.plus05)}

            {renderHalfSequence("+1.5", statistics.firstHalfForm, x => x.plus15)}

          </div>

        </div>

        <div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600">
            {t.common.secondHalf}
          </h3>

          <div className="grid grid-cols-4 gap-2">

            <StatCard
              title="-0.5"
              value={`${statistics.secondHalfMinus05} (${statistics.secondHalfMinus05Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title="-1.5"
              value={`${statistics.secondHalfMinus15} (${statistics.secondHalfMinus15Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title="+0.5"
              value={`${statistics.secondHalfPlus05} (${statistics.secondHalfPlus05Percent.toFixed(
                1,
              )}%)`}
            />

            <StatCard
              title="+1.5"
              value={`${statistics.secondHalfPlus15} (${statistics.secondHalfPlus15Percent.toFixed(
                1,
              )}%)`}
            />

          </div>

          <div className="mt-4 space-y-2">

            {renderHalfSequence("-0.5", statistics.secondHalfForm, x => x.minus05)}

            {renderHalfSequence("-1.5", statistics.secondHalfForm, x => x.minus15)}

            {renderHalfSequence("+0.5", statistics.secondHalfForm, x => x.plus05)}

            {renderHalfSequence("+1.5", statistics.secondHalfForm, x => x.plus15)}

          </div>

        </div>

      </div>

    </div>
  );
};

export default HandicapGeneralView;