import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1 className="home-title">Pokémon Battle Simulator</h1>

      <div className="home-buttons">
        <button
          className="home-button"
          id="home-battle-button"
          onClick={() => navigate("/battle")}
        >
          Battle Now
        </button>
        <button
          className="home-button"
          id="home-about-button"
          onClick={() => navigate("/about")}
        >
          About
        </button>
      </div>
    </div>
  );
}

export default Home;
