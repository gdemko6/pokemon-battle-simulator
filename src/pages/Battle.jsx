import React, { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import "./Battle.css";

function Battle() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  useEffect(() => {
    async function fetchPokemonData(pokemonName, setPokemon) {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
        );
        const data = await response.json();
        setPokemon({
          name: data.name,
          hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
          image: data.sprites.other["official-artwork"].front_default,
          moves: data.moves.slice(0, 2).map((move) => move.move.name),
        });
      } catch (error) {
        console.error(`Error fetching data for ${pokemonName}:`, error);
      }
    }

    fetchPokemonData("charizard", setPokemon1);
    fetchPokemonData("pikachu", setPokemon2);
  }, []);

  if (!pokemon1 || !pokemon2) return <p>Loading...</p>;

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
