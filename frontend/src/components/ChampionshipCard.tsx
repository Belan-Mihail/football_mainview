import { Link } from "react-router-dom";

type Props = {
  name: string;
  slug: string;
  language: string;
};

export default function ChampionshipCard({
  name,
  slug,
  language
}: Props) {
  return (
    <Link
      to={`/${language}/championship/${slug}`}
      className="
        block
        rounded-md
        border
        border-gray-200
        bg-white
        px-3
        py-2
        transition
        hover:bg-gray-50
        hover:shadow
      "
    >
      <div className="flex items-center gap-2">
        <span className="text-xl sm:text-2xl">
          🏴
        </span>

        <span className="truncate text-sm font-semibold text-blue-900 sm:text-base md:text-lg">
          {name}
        </span>
      </div>
    </Link>
  );
}