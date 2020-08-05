import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { debounce } from 'lodash';

import './style.sass';
import { TPokemon, TPokemonInformations } from '../types';
import * as pokemonsService from '../../services/getAllPokemons';
import * as searchPokemon from '../../services/getOnePokemon';

import Pokeball from '../../assets/images/pokeball.png';

import SearchBar from './components/SearchBar';
import PokemonItem from './components/PokemonItem';

const initialData: TPokemonInformations = {
  result: [] as Array<TPokemon>,
  loading: true,
  error: false,
  offset: 0,
  pages: 0,
}

const DEBOUNCE_MILLISECONDS = 500;

const List = () => {
  const [pokemons, setPokemons] = useState(initialData.result);
  const [error, setError] = useState(initialData.error);
  const [loading, setLoading] = useState(initialData.loading);
  const [offset, setOffset] = useState(initialData.offset);
  const [pages, setPages] = useState(initialData.pages);

  useEffect(() => {
    getPokemons(offset);
  }, [offset]);

  const getPokemons = useCallback(async (offset) => {
    try {
      const result = await pokemonsService.getPokemons(offset);
      setPokemons(result[0]);
      setPages(result[1] / Math.ceil(10));
      setError(false);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }, []);

  const getPokemonByNameOrId = useCallback(async (info) => {
    try {
      if (info) {
        const result = await searchPokemon.getPokemon(info);
        setPokemons(result);
        setPages(1);
        setError(false);
      } else {
        const result = await pokemonsService.getPokemons(offset);
        setPokemons(result[0]);
        setPages(result[1] / Math.ceil(10));
        setError(false);
      }
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }, []);

  const handleSearchDebounce = useMemo(() => debounce(getPokemonByNameOrId, DEBOUNCE_MILLISECONDS), [getPokemonByNameOrId]);

  const handleClick = useCallback((data) => {
    setOffset(data.selected * 10);
  }, [offset]);

  if (loading) {
    return (
      <div className="loading">
        <img src={Pokeball} alt="Loading"/>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className="list">
      <SearchBar onSearch={handleSearchDebounce} />
      {error ?
        <div className="error">
          Not found... try again
        </div>
        :
        <>
          <div className="pokemon-list container">
            {pokemons.map(pokemon => (
              <PokemonItem key={pokemon.name} name={pokemon.name} id={pokemon.id} />
            ))}
          </div>
          {pokemons.length >= 10 &&
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={(data) => handleClick(data)}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          }
        </>
      }
    </div>
  )
}

export default List;
