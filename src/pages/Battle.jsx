import { useState } from "react";
import PokemonCard from "../components/PokemonCard";
import "./Battle.css";

function Battle() {
  const [pokemon1, setPokemon1] = useState({
    name: "Pikachu",
    hp: 35,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    moves: ["Thunder Shock", "Quick Attack"],
  });

  const [pokemon2, setPokemon2] = useState({
    name: "Charizard",
    hp: 78,
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    moves: ["Flamethrower", "Dragon Claw"],
  });

  return (
    <div className="battle-page">
      <h1 className="battle-title">Battle Simulator</h1>
      <div className="battle-cards">
        <PokemonCard {...pokemon1} />
        <PokemonCard {...pokemon2} />
      </div>
    </div>
  );
}

export default Battle;
