interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
}) => {
  return (
    <div className="rounded-lg border bg-white p-2 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-gray-500 text-center">
        {title}
      </div>

      <div className="mt-2 text-sm font-bold text-gray-900 text-center">
        {value}
      </div>

      {subtitle && (
        <div className="mt-1 text-xs text-gray-500 text-center">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default StatCard;