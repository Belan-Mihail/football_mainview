import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChampionshipCard from "../components/ChampionshipCard";
import LayoutContainer from "../components/LayoutContainer";
import { useParams } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";
import { translations } from "../i18n/translations";

type Championship = {
  id: number;
  name: string;
  slug: string;
  language: string;
};



const HomePage = () => {
  const [championships, setChampionships] = useState<
    Championship[]
  >([]);

  const language = useLanguage();
  const t = translations[language];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/championships/")
      .then((response) => response.json())
      .then((data) => setChampionships(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <LayoutContainer>

          <div className="py-3 xs:py-4 sm:py-6 md:py-8">

            <h2 className="mb-4 text-center text-lg font-bold text-blue-900 xs:text-xl sm:text-2xl md:mb-8 md:text-4xl">
              {t.common.MainSlogan}
            </h2>

            <div className="grid gap-2 xs:gap-3 md:gap-4">

              {championships.filter((championship) => championship.id === 1).map((championship) => (

                <ChampionshipCard
                  key={championship.id}
                  name={championship.name}
                  slug={championship.slug}
                  language={language}
                />

              ))}

            </div>

          </div>

        </LayoutContainer>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;