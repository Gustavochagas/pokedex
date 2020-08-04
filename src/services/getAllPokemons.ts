import axios from 'axios';


export const getPokemons = async (offset: number): Promise<any> => {
  const limit = 10;
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
    const pokemons = data.results.map((result: { url: any; }) => {
      const { url } = result;
      const id = url.substring(34, url.length -1);

      return {
        ...result,
        id
      }
    });
    return pokemons;
  } catch (e) {
    throw e;
  }
};
