import React from 'react';
import PropTypes from 'prop-types';
import styles from './CITES.module.css';

const citesText = {
  I: 'I Espèce menacée',
  'I/II': 'I/II Espèce menacée',
  II: 'II Espèce vulnérable',
  III: 'III Espèce vulnérable',
};

const citesClass = {
  I: styles.citesI,
  'I/II': styles.citesI,
  II: styles.citesII,
  III: styles.citesIII,
};

export default function CITES({ cites }) {
  return (
    <span className={`${styles.cites} ${citesClass[cites]}`}>
      {citesText[cites]}
    </span>
  );
}
CITES.propTypes = {
  cites: PropTypes.oneOf(['I', 'I/II', 'II', 'III']).isRequired,
};
