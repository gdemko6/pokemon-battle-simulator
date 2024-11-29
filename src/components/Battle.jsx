import { useState } from "react";
import "./Battle.css";

function Battle() {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [winner, setWinner] = useState("");

  const handleSimulateBattle = () => {
    if (!pokemon1 || !pokemon2) {
      alert("Please select two Pokémon before simulating the battle.");
      return;
    }
    // Simulate a random winner for now
    const randomWinner = Math.random() < 0.5 ? pokemon1 : pokemon2;
    setWinner(randomWinner);
  };

  return (
    <div className="battle-page">
      <h1 className="battle-title">Battle Simulator</h1>
      <div className="battle-inputs">
        <input
          type="text"
          placeholder="Enter Pokémon 1"
          value={pokemon1}
          onChange={(e) => setPokemon1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Pokémon 2"
          value={pokemon2}
          onChange={(e) => setPokemon2(e.target.value)}
        />
      </div>
      <button className="simulate-button" onClick={handleSimulateBattle}>
        Simulate Battle
      </button>
      {winner && <h2 className="battle-result">Winner: {winner}!</h2>}
    </div>
  );
}

export default Battle;
