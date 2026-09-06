import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LayoutContainer from "../components/LayoutContainer";

import GeneralRoundView from "../views/9 round/GeneralRoundView";

import useLanguage from "../hooks/useLanguage";
import { translations } from "../i18n/translations";

import type { RoundData } from "../types/football";


const RoundPage: React.FC = () => {

  const {
    slug,
    season,
    round,
  } = useParams<{
    slug: string;
    season: string;
    round: string;
  }>();


  const language = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();


  const [data, setData] =
    useState<RoundData | null>(null);


  // ==========================================================
  // LOAD ROUND DATA
  // ==========================================================

  useEffect(() => {

    if (!slug || !season || !round) {
      return;
    }


    fetch(
      `http://127.0.0.1:8000/api/championships/${slug}/rounds/${season}/${round}/`
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Failed to load round data"
          );
        }

        return response.json();
      })
      .then((result: RoundData) => {

        setData(result);

      })
      .catch((error) => {

        console.error(
          "Failed to load round:",
          error
        );

        setData(null);

      });

  }, [
    slug,
    season,
    round,
  ]);


  // ==========================================================
  // SEO
  // ==========================================================

  useEffect(() => {

    if (!data) {
      return;
    }


    const championshipName =
      data.championship.name;


    const roundNumber =
      data.round.number;


    const seasonName =
      data.season.name;


    const title =
      language === "de"
        ? `${championshipName} Spieltag ${roundNumber} – Ergebnisse ${seasonName}`
        : `${championshipName} Round ${roundNumber} – Results ${seasonName}`;


    const description =
      language === "de"
        ? `${championshipName} Spieltag ${roundNumber}: Ergebnisse, Spielstände und Statistiken der Saison ${seasonName}.`
        : `${championshipName} Round ${roundNumber}: results, scores and statistics from the ${seasonName} season.`;


    document.title = title;


    let metaDescription =
      document.querySelector(
        'meta[name="description"]'
      );


    if (!metaDescription) {

      metaDescription =
        document.createElement("meta");

      metaDescription.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(
        metaDescription
      );
    }


    metaDescription.setAttribute(
      "content",
      description
    );


    return () => {
      document.title = "";
    };

  }, [
    data,
    language,
  ]);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (!data) {

    return (
      <div className="flex min-h-screen flex-col bg-white">

        <LayoutContainer>
          <Navbar />
        </LayoutContainer>

        <main className="flex-1">

          <LayoutContainer>

            <div className="py-6">
              {t.common.loading}...
            </div>

          </LayoutContainer>

        </main>

        <Footer />

      </div>
    );
  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="flex min-h-screen flex-col bg-white">

      <LayoutContainer>
        <Navbar />
      </LayoutContainer>


      <main className="flex-1">

        <LayoutContainer>

          <div className="border-x border-gray-300">

            <div className="flex items-center justify-between gap-2 px-1 py-3">

              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {data.championship.name}{" "}
                {language === "de"
                  ? "– Spieltag"
                  : "– Round"
                }{" "}
                {data.round.number}
              </h1>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/${language}/championship/${data.championship.slug}/result`
                  )
                }
                className="shrink-0 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                ← {t.common.Back}
              </button>

            </div>


            <GeneralRoundView
              data={data}
            />

          </div>

        </LayoutContainer>

      </main>


      <Footer />

    </div>
  );
};


export default RoundPage;