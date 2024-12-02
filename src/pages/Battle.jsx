import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import "./Battle.css";

function Battle() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [error1, setError1] = useState(""); // Error if Pokémon not found
  const [error2, setError2] = useState("");

  //power is not included in the first fetch
  async function fetchMovePower(moveUrl) {
    try {
      const response = await fetch(moveUrl);
      const data = await response.json();
      return data.power;
    } catch (error) {
      console.error(`Error fetching move details:`, error);
      return "N/A";
    }
  }

  // we pass in name to search for that pokemon, and pass
  // the set state variables to easily change the states
  async function fetchPokemonData(pokemonName, setPokemon, setError) {
    try {
      setError("");
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();

      // retrieving the name of the move and the move power
      const moves = await Promise.all(
        data.moves.slice(0, 2).map(async (move) => {
          const power = await fetchMovePower(move.move.url);
          return { name: move.move.name, power };
        })
      );

      // changing the pokemon state to reflect the users search
      setPokemon({
        name: data.name,
        hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
        image: data.sprites.other["official-artwork"].front_default,
        moves,
      });
    } catch (error) {
      console.error(`Error fetching data for ${pokemonName}:`, error);
      setPokemon(null); // Clear Pokémon data if fetch fails
      setError("Pokémon not found. Please try again.");
    }
  }

  const handleFetchPokemon1 = () => {
    fetchPokemonData(input1, setPokemon1, setError1);
  };

  const handleFetchPokemon2 = () => {
    fetchPokemonData(input2, setPokemon2, setError2);
  };

  useEffect(() => {
    fetchPokemonData("charizard", setPokemon1, setError1);
    fetchPokemonData("pikachu", setPokemon2, setError2);
  }, []);

  return (
    <div className="battle-page">
      <h1 className="battle-title">Battle Simulator</h1>

      <div className="battle-inputs">
        <div>
          <input
            type="text"
            placeholder="Enter Pokémon 1"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
          <button onClick={handleFetchPokemon1}>Choose Pokémon 1</button>
          {error1 && <p className="error-message">{error1}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Pokémon 2"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
          <button onClick={handleFetchPokemon2}>Choose Pokémon 2</button>
          {error2 && <p className="error-message">{error2}</p>}
        </div>
      </div>

      <div className="battle-cards">
        {pokemon1 ? (
          <PokemonCard {...pokemon1} />
        ) : (
          <p>Waiting for Pokémon 1...</p>
        )}
        {pokemon2 ? (
          <PokemonCard {...pokemon2} />
        ) : (
          <p>Waiting for Pokémon 2...</p>
        )}
      </div>
    </div>
  );
}

export default Battle;
