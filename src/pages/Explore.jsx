import React from 'react';
import Searchbar from '../components/Searchbar';
import SingleCard from '../components/SingleCard';
import styles from './Explore.module.css';
import elephantLogo from '../assets/elephant-logo.png';

function ExploreHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerIntroduction}>
        <div className={styles.headerImageTitleWrapper}>
          <img
            className={styles.elephantLogo}
            src={elephantLogo}
            alt="Dessin éléphant noir sur fond transparent"
            id="elephant-logo"
          />
          <h1 className={styles.headerTitle}>Mémoires d&apos;Éléphant</h1>
        </div>
        <p className={styles.headerText}>
          Un portail pour explorer et comprendre le statut des espèces menacées
          et la régulation de leur commerce international
        </p>
      </div>

      <Searchbar />
    </header>
  );
}

export default function Explore() {
  return (
    <>
      <ExploreHeader />
      <main>
        <SingleCard />
      </main>
    </>
  );
}
