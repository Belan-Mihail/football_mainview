import { useMemo } from "react";

import type { RoundViewProps } from "../../config/panelConfig";

import StatCard from "../../components/StatCard";

import { calculateGeneralStatistics } from "../../logic/6calculateGeneralStatistics";

import useLanguage from "../../hooks/useLanguage";
import { translations } from "../../i18n/translations";


const GeneralRoundView: React.FC<RoundViewProps> = ({ data }) => {

  const language = useLanguage();
  const t = translations[language];


  // ==========================================================
  // LOADING
  // ==========================================================

  if (!data) {
    return <div>{t.common.loading}...</div>;
  }


  // ==========================================================
  // MATCHES
  // ==========================================================


  const finishedMatches = useMemo(() => {
    return data.matches.filter(
      (match) => match.status === "finished"
    );
  }, [data.matches]);


  // ==========================================================
  // STATISTICS
  // ==========================================================

  const statistics = useMemo(() => {
    return calculateGeneralStatistics(
      finishedMatches
    );
  }, [finishedMatches]);


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


        {/* ==================== MATCHES ==================== */}

        <StatCard
          title={t.common.MatchesPlayed}
          value={statistics.matchesPlayed}
        />


        {/* ==================== GOALS ==================== */}

        <StatCard
          title={t.common.TotalGoals}
          value={statistics.totalGoals}
        />

        <StatCard
          title={t.common.HomeGoals}
          value={statistics.totalHomeGoals}
        />

        <StatCard
          title={t.common.AwayGoals}
          value={statistics.totalAwayGoals}
        />

        <StatCard
          title={t.common.AverageGoals}
          value={statistics.averageGoals.toFixed(2)}
        />

        <StatCard
          title={t.common.AverageHomeGoals}
          value={statistics.averageHomeGoals.toFixed(2)}
        />

        <StatCard
          title={t.common.AverageAwayGoals}
          value={statistics.averageAwayGoals.toFixed(2)}
        />

        <StatCard
          title={t.common.averageFirstHalfGoals}
          value={statistics.averageFirstHalfGoals.toFixed(2)}
        />

        <StatCard
          title={t.common.averageSecondHalfGoals}
          value={statistics.averageSecondHalfGoals.toFixed(2)}
        />

        <StatCard
          title={t.common.averageHomeTeamFirstHalfGoals}
          value={statistics.averageHomeTeamFirstHalfGoals.toFixed(2)}
        />

        <StatCard
          title={t.common.averageHomeTeamSecondHalfGoals}
          value={statistics.averageHomeTeamSecondHalfGoals.toFixed(2)}
        />

        <StatCard
          title={t.common.averageAwayTeamFirstHalfGoals}
          value={statistics.averageAwayTeamFirstHalfGoals.toFixed(2)}
        />

        <StatCard
          title={t.common.averageAwayTeamSecondHalfGoals}
          value={statistics.averageAwayTeamSecondHalfGoals.toFixed(2)}
        />


        {/* ==================== RESULTS ==================== */}

        <StatCard
          title={t.common.HomeWins}
          value={`${statistics.homeWinsPercent.toFixed(1)} %`}
        />

        <StatCard
          title={t.common.Draws}
          value={`${statistics.drawsPercent.toFixed(1)} %`}
        />

        <StatCard
          title={t.common.AwayWins}
          value={`${statistics.awayWinsPercent.toFixed(1)} %`}
        />


        {/* ==================== BTTS ==================== */}

        <StatCard
          title={t.common.BothTeamsToScore}
          value={`${statistics.bothTeamsToScorePercent.toFixed(1)} %`}
        />

        <StatCard
          title={t.common.BothTeamsNotToScore}
          value={`${statistics.noBothTeamsToScorePercent.toFixed(1)} %`}
        />


        {/* ==================== TOTALS ==================== */}

        <StatCard
          title={t.common.Over15}
          value={`${statistics.over15Percent.toFixed(1)} %`}
        />

        <StatCard
          title={t.common.Over25}
          value={`${statistics.over25Percent.toFixed(1)} %`}
        />

        <StatCard
          title={t.common.Over35}
          value={`${statistics.over35Percent.toFixed(1)} %`}
        />


        {/* ==================== CLEAN SHEETS ==================== */}

        <StatCard
          title={t.common.HomeCleanSheets}
          value={`${statistics.homeCleanSheetsPercent.toFixed(1)} %`}
        />

        <StatCard
          title={t.common.AwayCleanSheets}
          value={`${statistics.awayCleanSheetsPercent.toFixed(1)} %`}
        />


        {/* ==================== TOTAL GOALS BY HALF ==================== */}

        <StatCard
          title={t.common.totalFirstHalfGoals}
          value={statistics.totalFirstHalfGoals}
        />

        <StatCard
          title={t.common.totalSecondHalfGoals}
          value={statistics.totalSecondHalfGoals}
        />

        <StatCard
          title={t.common.totalHomeTeamFirstHalfGoals}
          value={statistics.totalHomeTeamFirstHalfGoals}
        />

        <StatCard
          title={t.common.totalHomeTeamSecondHalfGoals}
          value={statistics.totalHomeTeamSecondHalfGoals}
        />

        <StatCard
          title={t.common.totalAwayTeamFirstHalfGoals}
          value={statistics.totalAwayTeamFirstHalfGoals}
        />

        <StatCard
          title={t.common.totalAwayTeamSecondHalfGoals}
          value={statistics.totalAwayTeamSecondHalfGoals}
        />


        {/* ==================== GOALS BY PERIOD ==================== */}

        <StatCard
          title={t.common.totalGoalsTill15Min}
          value={statistics.totalGoalsTill15Min}
        />

        <StatCard
          title={t.common.totalGoalsFrom16Till30Min}
          value={statistics.totalGoalsFrom16Till30Min}
        />

        <StatCard
          title={t.common.totalGoalsFrom31Till45Min}
          value={statistics.totalGoalsFrom31Till45Min}
        />

        <StatCard
          title={t.common.totalGoalsFrom46Till60Min}
          value={statistics.totalGoalsFrom46Till60Min}
        />

        <StatCard
          title={t.common.totalGoalsFrom61Till75Min}
          value={statistics.totalGoalsFrom61Till75Min}
        />

        <StatCard
          title={t.common.totalGoalsAfter75Min}
          value={statistics.totalGoalsAfter75Min}
        />


        {/* ==================== HOME TEAM GOALS BY PERIOD ==================== */}

        <StatCard
          title={t.common.totalHomeTeamGoalsTill15Min}
          value={statistics.totalHomeTeamGoalsTill15Min}
        />

        <StatCard
          title={t.common.totalHomeTeamGoalsFrom16Till30Min}
          value={statistics.totalHomeTeamGoalsFrom16Till30Min}
        />

        <StatCard
          title={t.common.totalHomeTeamGoalsFrom31Till45Min}
          value={statistics.totalHomeTeamGoalsFrom31Till45Min}
        />

        <StatCard
          title={t.common.totalHomeTeamGoalsFrom46Till60Min}
          value={statistics.totalHomeTeamGoalsFrom46Till60Min}
        />

        <StatCard
          title={t.common.totalHomeTeamGoalsFrom61Till75Min}
          value={statistics.totalHomeTeamGoalsFrom61Till75Min}
        />

        <StatCard
          title={t.common.totalHomeTeamGoalsAfter75Min}
          value={statistics.totalHomeTeamGoalsAfter75Min}
        />


        {/* ==================== AWAY TEAM GOALS BY PERIOD ==================== */}

        <StatCard
          title={t.common.totalAwayTeamGoalsTill15Min}
          value={statistics.totalAwayTeamGoalsTill15Min}
        />

        <StatCard
          title={t.common.totalAwayTeamGoalsFrom16Till30Min}
          value={statistics.totalAwayTeamGoalsFrom16Till30Min}
        />

        <StatCard
          title={t.common.totalAwayTeamGoalsFrom31Till45Min}
          value={statistics.totalAwayTeamGoalsFrom31Till45Min}
        />

        <StatCard
          title={t.common.totalAwayTeamGoalsFrom46Till60Min}
          value={statistics.totalAwayTeamGoalsFrom46Till60Min}
        />

        <StatCard
          title={t.common.totalAwayTeamGoalsFrom61Till75Min}
          value={statistics.totalAwayTeamGoalsFrom61Till75Min}
        />

        <StatCard
          title={t.common.totalAwayTeamGoalsAfter75Min}
          value={statistics.totalAwayTeamGoalsAfter75Min}
        />

      </div>
    </div>
  );
};


export default GeneralRoundView;

