import React from 'react';
import { TPokemon } from '../../../types';

import './style.sass';

const PokemonItem: React.FC<TPokemon> = ({ id, name }) => {
  return (
    <div className="pokemon-item">
      <div className="pokemon-item-image">
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} alt={name} />
      </div>
      <div className="pokemon-item-content">
        <span className="pokemon-item-code">
          # {id}
        </span>
        <p className="pokemon-item-title">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
      </div>
    </div>
  )
}

export default PokemonItem;
