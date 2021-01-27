import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './SpeciesCard.module.css';
import CITES from './CITES';

export function SpeciesCard({
  id,
  name,
  commonName,
  cites,
  summary,
  imageUrl,
  linkState,
}) {
  return (
    <Link
      to={{ pathname: `/espece/${id}`, state: linkState }}
      className={styles.link}
    >
      <article className={styles.card}>
        <figure className={styles.figure}>
          <img
            className={styles.image}
            alt="" // The species' name is already in the <figcaption>, no need to repeat the same info twice
            src={
              imageUrl == null
                ? '/placeholder.svg'
                : `${process.env.REACT_APP_API_URL}/api/species/${id}/small-image`
            }
          />
          <figcaption className={styles.figcaption}>
            <h2 className={styles.vernacular}>{commonName}</h2>
            <span className={styles.scientific}>{name}</span>

            <span className={styles.cites}>
              <CITES cites={cites} />
            </span>
          </figcaption>
        </figure>

        <p className={styles.resume}>{summary}</p>
      </article>
    </Link>
  );
}
SpeciesCard.defaultProps = {
  commonName: '',
  summary: '',
  imageUrl: null,
  linkState: undefined,
};
SpeciesCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  commonName: PropTypes.string,
  cites: PropTypes.oneOf(['I', 'I/II', 'II', 'III', '?']).isRequired,
  summary: PropTypes.string,
  imageUrl: PropTypes.string,
  linkState: PropTypes.objectOf(PropTypes.string),
};

export function SpeciesCardList({ species, linkState }) {
  return (
    <ul className={styles.cardList}>
      {species.map((singleSpecies) => (
        <li key={singleSpecies.id}>
          <SpeciesCard
            id={singleSpecies.id}
            name={singleSpecies.name}
            commonName={singleSpecies.common_name ?? singleSpecies.commonName}
            cites={singleSpecies.cites}
            summary={singleSpecies.summary}
            imageUrl={singleSpecies.image_url ?? singleSpecies.imageUrl}
            linkState={linkState}
          />
        </li>
      ))}
    </ul>
  );
}
SpeciesCardList.defaultProps = {
  linkState: undefined,
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
  linkState: PropTypes.objectOf(PropTypes.string),
};
