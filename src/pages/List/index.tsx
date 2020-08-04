import React, { useState, useEffect, useCallback } from 'react';
import ReactPaginate from 'react-paginate';

import './style.sass';
import { TPokemon, TPokemonInformations } from '../types';
import * as pokemonsService from '../../services/getAllPokemons';

import SearchBar from './components/SearchBar';
import PokemonItem from './components/PokemonItem';

const initialData: TPokemonInformations = {
  result: [] as Array<TPokemon>,
  loading: true,
  error: false,
  offset: 0,
}

const List = () => {
  const [pokemons, setPokemons] = useState(initialData.result);
  const [error, setError] = useState(initialData.error);
  const [loading, setLoading] = useState(initialData.loading);
  const [offset, setOffset] = useState(initialData.offset);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = useCallback(async () => {
    try {
      const result = await pokemonsService.getPokemons(offset);
      setPokemons(result);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }, [offset]);

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="error">
        Error, refresh and try again...
      </div>
    )
  }

  return (
    <div className="list">
      <SearchBar />
      <div className="pokemon-list container">
        {pokemons.map(pokemon => (
          <PokemonItem key={pokemon.name} name={pokemon.name} id={pokemon.id} />
        ))}
      </div>
      <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={() => {}}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
    </div>
  )
}

export default List;
