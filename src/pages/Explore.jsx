import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Searchbar from '../components/Searchbar';
import SingleCard from '../components/SingleCard';
import Filters from '../components/Filters';
import styles from './Explore.module.css';
import elephantLogo from '../assets/elephant-logo.png';
import { debounce, useEffectAfterMount, useMount } from '../utils';

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
  const [filtersSelected, setFiltersSelected] = useState({
    animal: [],
    plant: false,
    cites: [],
  });

  const [filters, setFilters] = useState({
    animal: {
      label: 'Faune',
      childFilters: [
        { name: 'actinopteri', label: 'Actinopteri' },
        { name: 'amphibia', label: 'Amphibia' },
        { name: 'anthozoa', label: 'Anthozoa' },
        { name: 'arachnida', label: 'Arachnida' },
        { name: 'aves', label: 'Aves' },
        { name: 'bivalvia', label: 'Bivalvia' },
        { name: 'coelacanthi', label: 'Coelacanthi' },
        { name: 'dipneusti', label: 'Dipneusti' },
        { name: 'elasmobranchii', label: 'Elasmobranchii' },
        { name: 'gastropoda', label: 'Gastropoda' },
        { name: 'hirudinoidea', label: 'Hirudinoidea' },
        { name: 'holothuroidea', label: 'Holothuroidea' },
        { name: 'hydrozoa', label: 'Hydrozoa' },
        { name: 'insecta', label: 'Insecta' },
        { name: 'mammalia', label: 'Mammalia' },
        { name: 'reptilia', label: 'Reptilia' },
      ],
    },
    plant: {
      label: 'Flore',
    },
    cites: {
      label: 'Annexe CITES',
      childFilters: [
        {
          name: 'I',
          label: 'Espèces menacées (Annexe I)',
        },
        {
          name: 'II',
          label: 'Espèces vulnérables (Annexe II)',
        },
        {
          name: 'III',
          label: 'Espèces vulnérables (Annexe III)',
        },
      ],
    },
  });
  const [species, setSpecies] = useState(null);
  const [totalCount, setTotalCount] = useState('?');

  // Pass state by argument to avoid stale references while keeping the same function reference to debounce
  const fetchSpecies = useCallback(
    async (
      searchQuery_,
      filtersSelected_,
      setSpecies_,
      setFilters_,
      setTotalCount_,
    ) => {
      const url = new URL(`http://localhost:5000/species/search`);
      url.searchParams.append('query', searchQuery_);
      url.searchParams.append('plant', filtersSelected_.plant);
      filtersSelected_.animal.forEach((animalClass) =>
        url.searchParams.append('animal[]', animalClass),
      );
      filtersSelected_.cites.forEach((c) =>
        url.searchParams.append('cites[]', c),
      );

      const res = await fetch(url);
      const { species: newSpecies, counts } = await res.json();

      setSpecies_(newSpecies);
      setFilters_((oldFilters) => {
        const newFilters = { ...oldFilters };

        // eslint-disable-next-line no-restricted-syntax
        for (const filter of newFilters.animal.childFilters) {
          filter.count = counts.animalClass[filter.name];
        }

        newFilters.plant.count = counts.plant;

        // eslint-disable-next-line no-restricted-syntax
        for (const filter of newFilters.cites.childFilters) {
          filter.count = counts.cites[filter.name];
        }

        return newFilters;
      });
      setTotalCount_(counts.total);
    },
    [],
  );
  const fetchSpeciesDebounced = useCallback(debounce(fetchSpecies, 1000), []);

  useMount(() => {
    fetchSpecies(
      searchQuery,
      filtersSelected,
      setSpecies,
      setFilters,
      setTotalCount,
    );
  });

  useEffectAfterMount(() => {
    fetchSpeciesDebounced(
      searchQuery,
      filtersSelected,
      setSpecies,
      setFilters,
      setTotalCount,
    );
  }, [searchQuery, filtersSelected, fetchSpeciesDebounced]);

  return (
    <>
      <ExploreHeader
        searchValue={searchQuery}
        onSearchChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onSearchSubmit={(e) => {
          e.preventDefault();
        }}
      />
      <section className={styles.background}>
        <div className={styles.content}>
          <aside className={styles.filterBox}>
            <h2>
              <span className={styles.filterBoxCount}>{totalCount}</span>{' '}
              espèces référencées
            </h2>
            <Filters
              filters={filters}
              selected={filtersSelected}
              onSelect={setFiltersSelected}
            />
          </aside>
          <main>{species ? <SingleCard animalsCards={species} /> : ''}</main>
        </div>
      </section>
    </>
  );
}
