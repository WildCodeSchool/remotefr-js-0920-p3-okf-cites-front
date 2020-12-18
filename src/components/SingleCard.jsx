import React from 'react';
import PropTypes from 'prop-types';
import styles from './SingleCard.module.css';

export default function SingleCard({ animalsCards }) {
  return (
    <div className={styles.cardContainer}>
      {animalsCards.map((animalCard) => (
        <div className={styles.singleCard} key={animalCard.id}>
          <figure className={styles.picCard}>
            <img
              className={styles.animalPic}
              alt={animalCard.name}
              src={animalCard.image_url}
            />
            <figcaption className={styles.caption}>
              {animalCard.cites}
            </figcaption>
          </figure>

          <h2 className={styles.vernacular}>{animalCard.common_name}</h2>
          <h3 className={styles.scientific}>{animalCard.name}</h3>
          <p className={styles.resume}>
            Il est constitué d'une combinaison d'atomes de carbone, d'oxygène et
            d'hydrogène. Ainsi, la matière vivante est constituée de molécules
            contenant, entre autres, du carbone, qui a été absorbé de
            différentes manières dans l'environnement (eau, air, aliments).
          </p>
          <button type="button">ajouter des informations</button>
        </div>
      ))}
    </div>
  );
}

SingleCard.propTypes = {
  animalsCards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      cites: PropTypes.string,
      common_name: PropTypes.string,
    }),
  ).isRequired,
};
