import { capitalizeFirstLetter } from "../utils/string";

class pokeApiService {
  // we pass in name to search for that pokemon, and pass
  // the set state variables to easily change the states
  async fetchPokemonData(pokemonName, setPokemon, setError) {
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
          const power = Math.floor(
            (await this.fetchMovePower(move.move.url)) / 2
          );
          return { name: move.move.name, power };
        })
      );

      // changing the pokemon state to reflect the users search
      setPokemon({
        name: capitalizeFirstLetter(data.name),
        hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat * 2,
        image: data.sprites.other["official-artwork"].front_default,
        moves,
      });
    } catch (error) {
      console.error(`Error fetching data for ${pokemonName}:`, error);
      setPokemon(null); // clear Pokémon data if fetch fails
      setError("Pokémon not found. Please try again.");
    }
  }

  //power is not included in the first fetch
  async fetchMovePower(moveUrl) {
    try {
      const response = await fetch(moveUrl);
      const data = await response.json();
      return data.power;
    } catch (error) {
      console.error(`Error fetching move details:`, error);
      return "N/A";
    }
  }
}

export default new pokeApiService();
