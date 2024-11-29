import PropTypes from "prop-types";
import "./PokemonCard.css";

function PokemonCard({ name, hp, image, moves }) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-header">
        <span className="pokemon-name">{name}</span>
        <span className="pokemon-hp">HP: {hp}</span>
      </div>
      <div className="pokemon-image-container">
        <img src={image} alt={name} className="pokemon-image" />
      </div>
      <div className="pokemon-moves">
        <h4>Moves</h4>
        <ul>
          {moves.map((move, index) => (
            <li key={index}>
              {move.name}: {move.power}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  hp: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  moves: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      power: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    })
  ).isRequired,
};

export default PokemonCard;
