import md5 from 'md5';

const publicKey = "a5a419b2a4c3a71f68938045e15f7799"; 
const privateKey = "7cbee466985f4224b7321ffed644c3f656aea8ae"; 

const ts = Date.now();
const hash = md5(ts + privateKey + publicKey);  

// Fetch de los cómics
const fetchData = async () => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/comics?orderBy=-modified&apikey=${publicKey}&ts=${ts}&hash=${hash}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los cómics:', error);
    return null;
  }
};

// Obtener detalles del cómic
const getComicDetails = async (id) => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/comics/${id}?apikey=${publicKey}&ts=${ts}&hash=${hash}`
    );
    const data = await response.json();
    return data.data.results[0];
  } catch (error) {
    console.error('Error al obtener los detalles del cómic:', error);
    return null;
  }
};

// Obtener personajes del cómic
const getCharactersForComic = async (id) => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/comics/${id}/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}`
    );
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error al obtener los personajes del cómic:', error);
    return [];
  }
};


export { fetchData, getComicDetails, getCharactersForComic };
