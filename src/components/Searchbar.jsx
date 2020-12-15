import React from 'react';
import IcomoonReact from 'icomoon-react';
import iconSet from '../assets/selection.json';
import styles from './Searchbar.module.css';

export default function Searchbar() {
  return (
    <form className={styles.form}>
      {/* Label has associated id, but not possible to put the input element inside due to div */
      /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="searchbar" className={styles.label}>
        Lancer une recherche
      </label>

      <div className={styles.inputButtonWrapper}>
        <input
          id="searchbar"
          className={styles.searchbar}
          placeholder="Veuillez entrer le nom d'une plante ou d'un animal"
        />
        <button className={styles.searchButton} type="submit">
          <IcomoonReact
            className="search-icon"
            iconSet={iconSet}
            color="#FFF"
            size={15}
            icon="search"
          />
        </button>
      </div>
    </form>
  );
}
