import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Searchbar from '../components/Searchbar';
import SingleCard from '../components/SingleCard';
import Filters from '../components/Filters';
import styles from './Explore.module.css';
import elephantLogo from '../assets/elephant-logo.png';

function ExploreHeader({ searchValue, onSearchChange, onSearchSubmit }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerIntroduction}>
        <div className={styles.headerImageTitleWrapper}>
          <img
            className={styles.elephantLogo}
            src={elephantLogo}
            alt="Dessin éléphant noir sur fond transparent"
            id="elephant-logo"
            width="55"
            height="55"
          />
          <h1 className={styles.headerTitle}>Mémoires d&apos;Éléphant</h1>
        </div>
        <p className={styles.headerText}>
          Un portail pour explorer et comprendre le statut des espèces menacées
          et la régulation de leur commerce international
        </p>
      </div>

      <Searchbar
        value={searchValue}
        onChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
    </header>
  );
}
ExploreHeader.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
};

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    animal: [],
    flore: false,
    cites: [],
  });

  return (
    <>
      <ExploreHeader
        searchValue={searchQuery}
        onSearchChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onSearchSubmit={(e) => {
          e.preventDefault();
          alert('Search submit');
        }}
      />
      <section className={styles.background}>
        <div className={styles.content}>
          <aside className={styles.filterBox}>
            <h2>
              <span className={styles.filterBoxCount}>18234</span> espèces
              référencées
            </h2>
            <Filters
              filters={{
                animal: {
                  label: 'Faune',
                  childFilters: [
                    { name: 'actinopteri', label: 'Actinopteri', count: 100 },
                    { name: 'amphibia', label: 'Amphibia', count: 100 },
                    { name: 'anthozoa', label: 'Anthozoa', count: 100 },
                    { name: 'arachnida', label: 'Arachnida', count: 100 },
                    { name: 'aves', label: 'Aves', count: 100 },
                    { name: 'bivalvia', label: 'Bivalvia', count: 100 },
                    { name: 'coelacanthi', label: 'Coelacanthi', count: 100 },
                    { name: 'dipneusti', label: 'Dipneusti', count: 100 },
                    {
                      name: 'elasmobranchii',
                      label: 'Elasmobranchii',
                      count: 100,
                    },
                    { name: 'gastropoda', label: 'Gastropoda', count: 100 },
                    { name: 'hirudinoidea', label: 'Hirudinoidea', count: 100 },
                    {
                      name: 'holothuroidea',
                      label: 'Holothuroidea',
                      count: 100,
                    },
                    { name: 'hydrozoa', label: 'Hydrozoa', count: 100 },
                    { name: 'insecta', label: 'Insecta', count: 100 },
                    { name: 'mammalia', label: 'Mammalia', count: 100 },
                    { name: 'reptilia', label: 'Reptilia', count: 100 },
                  ],
                },
                flore: {
                  label: 'Flore',
                },
                cites: {
                  label: 'Annexe CITES',
                  childFilters: [
                    {
                      name: 'I',
                      label: 'Espèces menacées (Annexe I)',
                      count: 1,
                    },
                    {
                      name: 'II',
                      label: 'Espèces vulnérables (Annexe II)',
                      count: 12,
                    },
                    {
                      name: 'III',
                      label: 'Espèces vulnérables (Annexe III)',
                      count: 123,
                    },
                  ],
                },
              }}
              selected={filters}
              onSelect={setFilters}
            />
          </aside>
          <main>
            <SingleCard />
          </main>
        </div>
      </section>
    </>
  );
}
