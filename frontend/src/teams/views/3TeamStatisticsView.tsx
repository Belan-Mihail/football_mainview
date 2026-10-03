import type { TeamViewProps } from "../config/teamPanelConfig";

const TeamStatisticsView: React.FC<TeamViewProps> = ({
  matches,
}) => {
  return (
    <div className="p-3">
      <div className="rounded-lg border bg-gray-50 p-4">
        <div className="text-sm font-semibold">
          Team Statistics
        </div>

        <div className="mt-1 text-sm text-gray-600">
          {matches.length} matches
        </div>
      </div>
    </div>
  );
};

export default TeamStatisticsView;