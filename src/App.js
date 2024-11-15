import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListaComics from './components/ListaComics';
import Detalles from './components/Detalles';
import Favoritos from './components/Favoritos';
import './App.css';

const App = () => {
  const [favoritos, setFavoritos] = useState(JSON.parse(localStorage.getItem('favoritos')) || []);

  const addToFavorites = (comic) => {
    if (!favoritos.some(fav => fav.id === comic.id)) {
      const updatedFavorites = [...favoritos, comic];
      setFavoritos(updatedFavorites);
      localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (comic) => {
    const updatedFavorites = favoritos.filter(fav => fav.id !== comic.id);
    setFavoritos(updatedFavorites);
    localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Marvel Comics</h1>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <ListaComics
                  favoritos={favoritos}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                />
              }
            />
            <Route path="/comic/:id" element={<Detalles />} />
            <Route
              path="/favoritos"
              element={
                <Favoritos
                  favoritos={favoritos}
                  removeFromFavorites={removeFromFavorites}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
