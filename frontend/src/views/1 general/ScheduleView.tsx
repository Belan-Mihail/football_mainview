import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import MatchList from "../../components/MatchList";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const ScheduleView: React.FC<ViewProps> = ({ data, filter }) => {
  const language = useLanguage();
  const t = translations[language];

  const scheduledMatches = useMemo(() => {
    if (!data) return [];

    return data.matches.filter((match) => {
      if (match.status !== "scheduled") {
        return false;
      }

      const season = Number(match.season);
      const seasonFrom = Number(filter.seasonFrom);
      const seasonTo = Number(filter.seasonTo);

      return season >= seasonFrom && season <= seasonTo;
    });
  }, [data, filter]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  return (
    <MatchList
      matches={scheduledMatches}
      rounds={data.rounds}
      teams={data.teams}
    />
  );
};

export default ScheduleView;