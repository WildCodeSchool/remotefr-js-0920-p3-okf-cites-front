import React from 'react';
import PropTypes from 'prop-types';
import styles from './SingleCard.module.css';

export default function SingleCard({ animalsCards }) {
  return (
    <div className={styles.cardContainer}>
      {animalsCards.map((animalCard) => (
        <div className={styles.singleCard}>
          <figure className={styles.picCard}>
            <img
              className={styles.animalPic}
              alt={styles.scientificName}
              src={animalCard.photo}
            />
            <figcaption className={styles.caption}>
              {animalCard.cites}
            </figcaption>
          </figure>

          <h2 className={styles.vernacular}>{animalCard.common_name}</h2>
          <h3 className={styles.scientific}>{animalCard.name}</h3>
          <p className={styles.resume}>{animalCard.descrpition}</p>
        </div>
      ))}
    </div>
  );
}

SingleCard.propTypes = {
  animalsCards: PropTypes.string.isRequired,
};
