import React from 'react';
import PropTypes from 'prop-types';
import styles from './SpeciesCard.module.css';
import CITES from './CITES';

export function SpeciesCard({ name, commonName, cites, imageUrl }) {
  return (
    <article className={styles.card}>
      <figure className={styles.figure}>
        <img
          className={styles.image}
          alt="" // The species' name is already in the <figcaption>, no need to repeat the same info twice
          src={imageUrl}
        />
        <figcaption className={styles.figcaption}>
          <h2 className={styles.vernacular}>{commonName}</h2>
          <span className={styles.scientific}>{name}</span>

          <span className={styles.cites}>
            <CITES cites={cites} />
          </span>
        </figcaption>
      </figure>
    </article>
  );
}
SpeciesCard.defaultProps = {
  commonName: '',
  imageUrl: '/placeholder.svg',
};
SpeciesCard.propTypes = {
  name: PropTypes.string.isRequired,
  commonName: PropTypes.string,
  cites: PropTypes.oneOf(['I', 'I/II', 'II', 'III', '?']).isRequired,
  imageUrl: PropTypes.string,
};

export function SpeciesCardList({ species, cardContent }) {
  return (
    <ul className={styles.cardList}>
      {species.map((singleSpecies) => {
        const speciesCardEl = (
          <SpeciesCard
            name={singleSpecies.name}
            commonName={singleSpecies.common_name ?? singleSpecies.commonName}
            cites={singleSpecies.cites}
            summary={singleSpecies.summary}
            imageUrl={singleSpecies.image_url ?? singleSpecies.imageUrl}
          />
        );

        return (
          <li key={singleSpecies.id}>
            {cardContent != null
              ? cardContent(speciesCardEl, singleSpecies)
              : speciesCardEl}
          </li>
        );
      })}
    </ul>
  );
}
SpeciesCardList.defaultProps = {
  cardContent: null,
};
SpeciesCardList.propTypes = {
  species: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      common_name: PropTypes.string,
      image_url: PropTypes.string,
      cites: PropTypes.string,
      summary: PropTypes.string,
    }),
  ).isRequired,
  cardContent: PropTypes.func,
};
