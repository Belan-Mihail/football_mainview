import { useMemo } from "react";

import type { ViewProps } from "../../config/panelConfig";

import MatchList from "../../components/MatchList";
import useFilteredMatches from "../../hooks/useFilteredMatches";
import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";

const ResultsView: React.FC<ViewProps> = ({
  data,
  filter,
}) => {
  const language = useLanguage();
  const t = translations[language];

  const filteredMatches = useFilteredMatches(
    data,
    filter
  );

  const finishedMatches = useMemo(() => {
    return filteredMatches.filter(
      (match) => match.status === "finished"
    );
  }, [filteredMatches]);

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }

  return (
    <div>
      <MatchList
        matches={finishedMatches}
        rounds={data.rounds}
        teams={data.teams}
        reverseRounds
        championshipSlug={data.championship.slug}
        roundLinks
      />
    </div>
  );
};

export default ResultsView;

