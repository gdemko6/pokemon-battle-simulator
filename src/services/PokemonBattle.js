class PokemonBattle {
  startBattle(pokemon1) {
    // Decide who starts, and define any initial battle state.
    return {
      battleState: "battle started",
      turn: pokemon1.name,
    };
  }

  performMove(attacker, defender, moveIndex) {
    const moveChosen = attacker.moves[moveIndex - 1];
    const newHp = Math.max(0, defender.hp - moveChosen.power);
    const fainted = newHp === 0;
    const nextTurn = defender.name;
    const winner = fainted ? attacker : null;

    return { newHp, nextTurn, winner };
  }
}

export default new PokemonBattle();
