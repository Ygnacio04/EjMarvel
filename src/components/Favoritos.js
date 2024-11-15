// Favoritos.js
import React from 'react';
import { Link } from 'react-router-dom';

const Favoritos = ({ favoritos, removeFromFavorites }) => {
  return (
    <div className="favoritos-container">
      <Link to="/">
        <button className="go-to-comics-button">Volver a la Lista de Cómics</button>
      </Link>
      <h2>Comics Favoritos</h2>
      {favoritos.length === 0 ? (
        <p>No tienes cómics favoritos.</p>
      ) : (
        <div className="favoritos-list">
          {favoritos.map((comic) => (
            <div key={comic.id} className="comic-card">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <h3>{comic.title}</h3>
              <button onClick={() => removeFromFavorites(comic)}>Quitar de Favoritos</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
