import "./PokemonCard.css";
import PropTypes from "prop-types";

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
            <li key={index}>{move}</li>
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
  moves: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PokemonCard;
