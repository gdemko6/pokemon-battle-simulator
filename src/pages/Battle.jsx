import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Confetti from "react-confetti";
import "./Battle.css";
import "./Animation.css";
import PokemonBattle from "../services/PokemonBattle";
import pokeApiService from "../services/pokeApiService";

function Battle() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [error1, setError1] = useState(""); // Error if Pokémon not found
  const [error2, setError2] = useState("");
  const [winner, setWinner] = useState(null);
  const [battleState, setBattleState] = useState("not started");
  const [turn, setTurn] = useState(null);
  const [attackingPokemon, setAttackingPokemon] = useState(null);

  const handleFetchPokemon1 = () => {
    pokeApiService.fetchPokemonData(input1, setPokemon1, setError1);
    setInput1("");
  };

  const handleFetchPokemon2 = () => {
    pokeApiService.fetchPokemonData(input2, setPokemon2, setError2);
    setInput2("");
  };

  const handlePerformMove = (
    pokemon,
    targetPokemon,
    setTargetPokemon,
    move
  ) => {
    const { newHp, nextTurn, winner } = PokemonBattle.performMove(
      pokemon,
      targetPokemon,
      move
    );

    if (winner) {
      handleWin(winner);
      return;
    }

    setAttackingPokemon(pokemon);
    setTimeout(() => {
      setAttackingPokemon(null);
    }, 500);

    setTargetPokemon({
      ...targetPokemon,
      hp: newHp,
    });

    setTurn(nextTurn);
  };

  const handleStartBattle = () => {
    const { battleState: newBattleState, turn: newTurn } =
      PokemonBattle.startBattle(pokemon1);
    setBattleState(newBattleState);
    setTurn(newTurn);
  };

  const handleWin = async (winner) => {
    setWinner(winner);
    setBattleState("not started");
    await setDefaultPokemon();
  };

  async function setDefaultPokemon() {
    await pokeApiService.fetchPokemonData("charizard", setPokemon1, setError1);
    await pokeApiService.fetchPokemonData("blastoise", setPokemon2, setError2);
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
        <div
          className={`pokemon-container ${
            attackingPokemon?.name === pokemon1?.name
              ? "attackingPokemonTwo"
              : ""
          }`}
        >
          {pokemon1 ? (
            <>
              <PokemonCard {...pokemon1} />
              {battleState === "battle started" && turn === pokemon1?.name && (
                <div className="perform-moves">
                  <button
                    className="pokemonOneMoveButton"
                    onClick={() =>
                      handlePerformMove(pokemon1, pokemon2, setPokemon2, 1)
                    }
                  >
                    Choose Move 1
                  </button>
                  <button
                    className="pokemonOneMoveButton"
                    onClick={() =>
                      handlePerformMove(pokemon1, pokemon2, setPokemon2, 2)
                    }
                  >
                    Choose Move 2
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>Waiting for Pokémon 1...</p>
          )}
        </div>

        <div
          className={`pokemon-container ${
            attackingPokemon?.name === pokemon2?.name
              ? "attackingPokemonOne"
              : ""
          }`}
        >
          {pokemon2 ? (
            <>
              <PokemonCard {...pokemon2} />
              {battleState === "battle started" && turn === pokemon2?.name && (
                <div className="perform-moves">
                  <button
                    className="pokemonTwoMoveButton"
                    onClick={() =>
                      handlePerformMove(pokemon2, pokemon1, setPokemon1, 1)
                    }
                  >
                    Choose Move 1
                  </button>
                  <button
                    className="pokemonTwoMoveButton"
                    onClick={() =>
                      handlePerformMove(pokemon2, pokemon1, setPokemon1, 2)
                    }
                  >
                    Choose Move 2
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>Waiting for Pokémon 2...</p>
          )}
        </div>
      </div>

      <div className="battle-buttons">
        {battleState === "not started" && (
          <button id="start-battle" onClick={handleStartBattle}>
            Battle!
          </button>
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
