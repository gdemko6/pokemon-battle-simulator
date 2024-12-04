import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Confetti from "react-confetti";
import "./Battle.css";

function Battle() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [error1, setError1] = useState(""); // Error if Pokémon not found
  const [error2, setError2] = useState("");
  const [winner, setWinner] = useState(null);
  const [battleState, setBattleState] = useState("not started");

  const performMove = (pokemon, targetPokemon, setTargetPokemon, move) => {
    const moveChosen = pokemon.moves[move - 1];

    const newHp = Math.max(0, targetPokemon.hp - moveChosen.power);

    //target pokemon has fainted
    if (newHp === 0) {
      handleWin(pokemon);
    }
    setTargetPokemon({
      ...targetPokemon,
      hp: newHp,
    });
  };

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
          const power = Math.floor((await fetchMovePower(move.move.url)) / 2);
          return { name: move.move.name, power };
        })
      );

      // changing the pokemon state to reflect the users search
      setPokemon({
        name: data.name,
        hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat * 2,
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

  const handleStartBattle = () => {
    setBattleState("battle started");
  };

  const handleWin = async (pokemon) => {
    setWinner(pokemon);
    setBattleState("not started");
    //winning screen stays for 7 seconds before new match

    await setDefaultPokemon();
  };

  async function setDefaultPokemon() {
    await fetchPokemonData("charizard", setPokemon1, setError1);
    await fetchPokemonData("pikachu", setPokemon2, setError2);
  }

  useEffect(() => {
    setDefaultPokemon();
  }, []);

  return (
    <div className="battle-page">
      <h1 className="battle-title">Battle Simulator</h1>

      {winner && <Confetti />}

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

      <div className="battle-buttons">
        {battleState === "not started" && (
          <button id="start-battle" onClick={handleStartBattle}>
            Battle!
          </button>
        )}

        {battleState === "battle started" && (
          <div className="perform-moves-container">
            <div className="perform-moves-left">
              <button
                className="pokemonOneMoveButton"
                onClick={() => performMove(pokemon1, pokemon2, setPokemon2, 1)}
              >
                Choose Move 1
              </button>
              <button
                className="pokemonOneMoveButton"
                onClick={() => performMove(pokemon1, pokemon2, setPokemon2, 2)}
              >
                Choose Move 2
              </button>
            </div>
            <div className="perform-moves-right">
              <button
                className="pokemonTwoMoveButton"
                onClick={() => performMove(pokemon2, pokemon1, setPokemon1, 1)}
              >
                Choose Move 1
              </button>
              <button
                className="pokemonTwoMoveButton"
                onClick={() => performMove(pokemon2, pokemon1, setPokemon1, 2)}
              >
                Choose Move 2
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className="modal-overlay"
        style={{ display: winner ? "flex" : "none" }}
      >
        <div className="modal-container">
          <h2>{winner?.name} Wins!</h2>
          <img
            src={winner?.image}
            alt={`${winner?.name}`}
            className="modal-image"
          />
          <button onClick={() => setWinner(null)} className="close-modal">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Battle;
