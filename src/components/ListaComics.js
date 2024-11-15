import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from './Api';

const ListaComics = ({ favoritos, addToFavorites, removeFromFavorites }) => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const getComics = async () => {
      const data = await fetchData(); // Llamada a la función fetchData
      if (data) {
        setComics(data.data.results);
      }
    };
    getComics();
  }, []);

  const handleFavoriteClick = (comic) => {
    if (favoritos.some(fav => fav.id === comic.id)) {
      removeFromFavorites(comic); 
    } else {
      addToFavorites(comic); 
    }
  };

  return (
    <div className="lista-comics-container">
      <Link to="/favoritos">
        <button className="go-to-favorites-button">Ver Comics Favoritos</button>
      </Link>
      <div className="comics-lista">
        {comics.length === 0 ? (
          <p>Cargando cómics...</p>
        ) : (
          comics.map((comic) => (
            <div key={comic.id} className="comic-card">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <h3>{comic.title}</h3>
              <div className="comic-actions">
                <Link to={`/comic/${comic.id}`}>
                  <button>Ver Detalles</button>
                </Link>
                <button onClick={() => handleFavoriteClick(comic)}>
                  {favoritos.some(fav => fav.id === comic.id) ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaComics;
