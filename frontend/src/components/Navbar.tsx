import { useLocation, useNavigate } from "react-router-dom";
import LayoutContainer from "./LayoutContainer";
import { Link } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const language = location.pathname.slice(1, 3);

  const changeLanguage = (newLanguage: "en" | "de") => {
    const pathWithoutLanguage = location.pathname.slice(3);

    navigate(`/${newLanguage}${pathWithoutLanguage}`);
  };

  return (
    <nav className="border-b border-gray-300 bg-white shadow-sm">
      <LayoutContainer>
        <div className="flex h-11 items-center justify-between xs:h-12 sm:h-14 md:h-16">
          <Link to="/:language">
          <h2 className="truncate text-sm font-bold text-blue-900 xs:text-base md:text-xl">
            Football Main View
          </h2>
          </Link>

          <div className="flex overflow-hidden rounded-md border border-gray-300 text-xs font-semibold">
            <button
              onClick={() => changeLanguage("en")}
              className={`px-2.5 py-1.5 transition xs:px-3 ${
                language === "en"
                  ? "bg-blue-800 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              EN
            </button>

            <button
              onClick={() => changeLanguage("de")}
              className={`px-2.5 py-1.5 transition xs:px-3 ${
                language === "de"
                  ? "bg-blue-800 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              DE
            </button>
          </div>

        </div>
      </LayoutContainer>
    </nav>
  );
}