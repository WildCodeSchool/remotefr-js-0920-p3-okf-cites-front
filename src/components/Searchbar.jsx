import React from 'react';
import '../index.css';
import './Searchbar.css';
import IcomoonReact from 'icomoon-react';
import iconSet from '../assets/selection.json';

export default function Searchbar() {
  return (
    <form className="search">
      <input
        className="searchbar"
        placeholder="Veuillez entrer le nom d'une plante ou d'un animal"
      />
      <button className="search-button" type="submit">
        <IcomoonReact
          className="search-icon"
          iconSet={iconSet}
          color="#FFF"
          size={15}
          icon="search"
        />
      </button>
    </form>
  );
}
