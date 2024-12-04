import PropTypes from "prop-types";
import "./PokemonCard.css";

//recieves props from the fetch done in Battle.jsx
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
        <h4 className="moves-heading">Moves</h4>
        <ul>
          {moves.map((move, index) => (
            <li key={index} className="pokemon-move">
              <span className="move-name">{move.name}</span>
              <span className="move-power">{move.power}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ensure no problems will occur due to invalid prop type
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
