import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Searchbar from '../components/Searchbar';
import { SpeciesCardList } from '../components/SpeciesCard';
import styles from './Explore.module.css';
import elephantLogo from '../assets/elephant-logo.png';
import { debounce, useEffectAfterMount, useMount } from '../utils';
import {
  Filter,
  FilterBoolean,
  FilterGroup,
  FilterOption,
} from '../components/Filters';

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

  const [counts, setCounts] = useState({
    total: '?',
  });
  const [species, setSpecies] = useState(null);

  // Pass state by argument to avoid stale references while keeping the same function reference to debounce
  const fetchSpecies = useCallback(
    async (searchQuery_, filtersSelected_, setSpecies_, setCounts_) => {
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
      const { species: newSpecies, counts: counts_ } = await res.json();

      setSpecies_(newSpecies);
      setCounts_(counts_);
    },
    [],
  );
  const fetchSpeciesDebounced = useCallback(debounce(fetchSpecies, 1000), []);

  useMount(() => {
    fetchSpecies(searchQuery, filtersSelected, setSpecies, setCounts);
  });

  useEffectAfterMount(() => {
    fetchSpeciesDebounced(searchQuery, filtersSelected, setSpecies, setCounts);
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
              <span className={styles.filterBoxCount}>{counts.total}</span>{' '}
              espèces référencées
            </h2>

            <FilterGroup
              selected={filtersSelected}
              onSelect={setFiltersSelected}
            >
              <Filter
                name="animal"
                label="Faune"
                count={counts.kingdom?.animalia}
              >
                <FilterOption
                  value="actinopteri"
                  label="Actinopteri"
                  count={counts.class?.actinopteri}
                />
                <FilterOption
                  value="amphibia"
                  label="Amphibia"
                  count={counts.class?.amphibia}
                />
                <FilterOption
                  value="anthozoa"
                  label="Anthozoa"
                  count={counts.class?.anthozoa}
                />
                <FilterOption
                  value="arachnida"
                  label="Arachnida"
                  count={counts.class?.arachnida}
                />
                <FilterOption
                  value="aves"
                  label="Aves"
                  count={counts.class?.aves}
                />
                <FilterOption
                  value="bivalvia"
                  label="Bivalvia"
                  count={counts.class?.bivalvia}
                />
                <FilterOption
                  value="coelacanthi"
                  label="Coelacanthi"
                  count={counts.class?.coelacanthi}
                />
                <FilterOption
                  value="dipneusti"
                  label="Dipneusti"
                  count={counts.class?.dipneusti}
                />
                <FilterOption
                  value="elasmobranchii"
                  label="Elasmobranchii"
                  count={counts.class?.elasmobranchii}
                />
                <FilterOption
                  value="gastropoda"
                  label="Gastropoda"
                  count={counts.class?.gastropoda}
                />
                <FilterOption
                  value="hirudinoidea"
                  label="Hirudinoidea"
                  count={counts.class?.hirudinoidea}
                />
                <FilterOption
                  value="holothuroidea"
                  label="Holothuroidea"
                  count={counts.class?.holothuroidea}
                />
                <FilterOption
                  value="hydrozoa"
                  label="Hydrozoa"
                  count={counts.class?.hydrozoa}
                />
                <FilterOption
                  value="insecta"
                  label="Insecta"
                  count={counts.class?.insecta}
                />
                <FilterOption
                  value="mammalia"
                  label="Mammalia"
                  count={counts.class?.mammalia}
                />
                <FilterOption
                  value="reptilia"
                  label="Reptilia"
                  count={counts.class?.reptilia}
                />
              </Filter>
              <FilterBoolean
                name="plant"
                label="Flore"
                count={counts.kingdom?.plantae}
              />
              <Filter name="cites" label="Annexe CITES">
                <FilterOption
                  value="I"
                  label="Espèces menacées (Annexe I)"
                  count={counts.cites?.I}
                />
                <FilterOption
                  value="II"
                  label="Espèces vulnérables (Annexe II)"
                  count={counts.cites?.II}
                />
                <FilterOption
                  value="III"
                  label="Espèces vulnérables (Annexe III)"
                  count={counts.cites?.III}
                />
              </Filter>
            </FilterGroup>
          </aside>
          <main className={styles.main}>
            {species ? <SpeciesCardList species={species} /> : ''}
          </main>
        </div>
      </section>
    </>
  );
}
