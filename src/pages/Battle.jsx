import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import "./Battle.css";

function Battle() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);

  // power is not included in the initial fetch
  // so we use the nested url to get the power
  async function fetchMoveDetails(moveUrl) {
    try {
      const response = await fetch(moveUrl);
      const data = await response.json();
      return data.power || "N/A"; // Return power or "N/A" if unavailable
    } catch (error) {
      console.error(`Error fetching move details:`, error);
      return "N/A";
    }
  }

  async function fetchPokemonData(pokemonName, setPokemon) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const data = await response.json();

      // grabs first two moves of a pokemon. uses Promise.all
      // because the map function was returning unexpected array
      const moves = await Promise.all(
        data.moves.slice(0, 2).map(async (move) => {
          const power = await fetchMoveDetails(move.move.url);
          return { name: move.move.name, power };
        })
      );

      setPokemon({
        name: data.name,
        hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
        image: data.sprites.other["official-artwork"].front_default,
        moves,
      });
    } catch (error) {
      console.error(`Error fetching data for ${pokemonName}:`, error);
    }
  }

  useEffect(() => {
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
