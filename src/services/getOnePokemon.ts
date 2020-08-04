import axios from 'axios';

export const getPokemon = async (info: any): Promise<any> => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${info}`);
    const form = data.forms;

    if (form) {
      const pokemons = form.map((result: { url: any; }) => {
        const { url } = result;
        const id = url.substring(39, url.length -1);

        return {
          ...result,
          id
        }
      });
      return pokemons;
    }
  } catch (e) {
    throw e;
  }
};
