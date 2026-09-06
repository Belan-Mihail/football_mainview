import { useParams } from "react-router-dom";

export type Language = "en" | "de";

const useLanguage = (): Language => {

  const { language } = useParams();

  return language === "de"
    ? "de"
    : "en";
};

export default useLanguage;