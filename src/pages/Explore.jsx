import React from 'react';
import Searchbar from '../components/Searchbar';
import './Explore.css';
import elephantLogo from '../assets/elephant-logo.png';

export default function Explore() {
  return (
    <main className="header">
      <div className="introduction">
        <div className="title">
          <img
            src={elephantLogo}
            alt="Dessin éléphant noir sur fond transparent"
            id="elephant-logo"
          />
          <h1>Mémoires d'Éléphant</h1>
        </div>
        <p>
          Un portail pour explorer et comprendre le statut des espèces menacées
          et la régulation de leur commerce international
        </p>
      </div>
      <div>
        <h2>Lancer une recherche</h2>
        <Searchbar />
      </div>
    </main>
  );
}
