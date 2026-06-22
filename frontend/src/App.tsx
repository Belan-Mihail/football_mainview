import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChampionshipCard from "./components/ChampionshipCard";

type Championship = {
  championshipid: string;
  name: string;
};

function App() {
  const [championships, setChampionships] = useState<Championship[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/championships/")
      .then((response) => response.json())
      .then((data) => setChampionships(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(championships)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="mb-8 text-center text-4xl font-bold text-blue-900">
            Advanced Football Statistics
          </h2>

          <div className="grid gap-4">
            {championships.map((championship) => (
              <ChampionshipCard
                key={championship.championshipid}
                name={championship.name}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;