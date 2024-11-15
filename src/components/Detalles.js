import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComicDetails, getCharactersForComic } from './Api';

const Detalles = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    const fetchDetails = async () => {
      const comicData = await getComicDetails(id);
      setComic(comicData);

      const charactersData = await getCharactersForComic(id);
      setCharacters(charactersData);
    };

    fetchDetails();
  }, [id]);

  if (!comic) return <p>Cargando detalles...</p>;

  return (
    <div className="comic-details-container">
      <h2>{comic.title}</h2>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
      <p>{comic.description || "No hay descripción disponible."}</p>

      <h3>Personajes</h3>
      <div className="characters">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <p>{character.name}</p>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <Link to="/">
          <button>Volver a la lista de cómics</button>
        </Link>
        <Link to="/favoritos">
          <button>Ver cómics favoritos</button>
        </Link>
      </div>
    </div>
  );
};

export default Detalles;
	