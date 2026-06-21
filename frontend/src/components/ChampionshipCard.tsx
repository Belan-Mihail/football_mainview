type Props = {
  name: string;
};

export default function ChampionshipCard({ name }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🏴</span>

        <span className="text-lg font-semibold text-blue-900">
          {name}
        </span>
      </div>
    </div>
  );
}