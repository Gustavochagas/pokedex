export type TPokemonInformations = {
  result: Array<TPokemon>;
  loading: boolean;
  error: boolean;
  offset: number;
}

export type TPokemon = {
  name: string;
  id: string;
}
