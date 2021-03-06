import React from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import Icon from './Icon';

export default function Searchbar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {/* Label has associated id, but not possible to put the input element inside due to div */
      /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="searchbar" className={styles.label}>
        Lancer une recherche
      </label>

      <div className={styles.inputButtonWrapper}>
        <input
          id="searchbar"
          className={styles.searchbar}
          placeholder="Nom d'une plante ou d'un animal"
          value={value}
          onChange={onChange}
        />
        <button
          className={styles.searchButton}
          type="submit"
          aria-label="Lancer la recherche"
        >
          <Icon color="white" size="1.25em" icon="search" />
        </button>
      </div>
    </form>
  );
}
Searchbar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
