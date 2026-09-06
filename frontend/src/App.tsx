import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ChampionshipPage from "./pages/ChampionshipPage";
import RoundPage from "./pages/RoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/en" replace />}
        />

        <Route
          path="/:language"
          element={<HomePage />}
        />

        <Route
          path="/:language/championship/:slug/round/:season/:round"
          element={<RoundPage />}
        />

        <Route
          path="/:language/championship/:slug/*"
          element={<ChampionshipPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;