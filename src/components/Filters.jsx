import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { slugify } from '../utils';
import styles from './Filters.module.css';

function FilterWithChildFilters({ label, childFilters, selected, onSelect }) {
  const parentCheckRef = useRef();
  const parentCheckId = useMemo(() => `check-${slugify(label)}`, [label]);

  const isAllChecked = selected.length === childFilters.length;

  useEffect(() => {
    // Indeterminate if some but not all sub filters are checked
    parentCheckRef.current.indeterminate =
      selected.length > 0 && selected.length < childFilters.length;
  }, [selected]);

  const handleParentChange = (e) => {
    onSelect(e.target.checked ? childFilters.map((c) => c.name) : []);
  };

  const handleChildfilterChange = (key) => (e) => {
    onSelect(
      e.target.checked ? [...selected, key] : selected.filter((s) => s !== key),
    );
  };

  const selectedSet = new Set(selected);

  return (
    <>
      {/* Parent filter */}
      <label htmlFor={parentCheckId} className={styles.label}>
        <input
          id={parentCheckId}
          type="checkbox"
          checked={isAllChecked}
          onChange={handleParentChange}
          ref={parentCheckRef}
        />
        <span className={[styles.parentLabelText, styles.labelText].join(' ')}>
          {label}
        </span>
        <span className={styles.count} /> {/* To fill grid space */}
      </label>

      {/* Child filters */}
      <ul className={styles.filterList}>
        {childFilters.map((child) => {
          const childCheckId = `${parentCheckId}-${child.name}`;
          return (
            <li key={child.name} className={styles.filterListItem}>
              <label htmlFor={childCheckId} className={styles.label}>
                <input
                  id={childCheckId}
                  type="checkbox"
                  checked={selectedSet.has(child.name)}
                  onChange={handleChildfilterChange(child.name)}
                />
                <span className={styles.labelText}>{child.label}</span>
                <span className={styles.count}>{child.count}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}
FilterWithChildFilters.propTypes = {
  label: PropTypes.string.isRequired,
  childFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      count: PropTypes.number,
      checked: PropTypes.bool,
    }),
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const animalChildFilters = [
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
];
const citesChildFilters = [
  { name: 'I', label: 'Espèces menacées (Annexe I)', count: 1 },
  { name: 'II', label: 'Espèces vulnérables (Annexe II)', count: 12 },
  { name: 'III', label: 'Espèces vulnérables (Annexe III)', count: 123 },
];
export default function Filters() {
  const [animalFilters, setAnimalFilters] = useState([]);
  const [plantFilter, setPlantFilter] = useState(false);
  const [citesFilters, setCitesFilters] = useState([]);

  return (
    <ul className={styles.filterGrid}>
      <li className={styles.filterListItem}>
        <FilterWithChildFilters
          label="Faune"
          childFilters={animalChildFilters}
          selected={animalFilters}
          onSelect={setAnimalFilters}
        />
      </li>
      <li className={styles.filterListItem}>
        <label htmlFor="check-flore" className={styles.label}>
          <input
            id="check-flore"
            type="checkbox"
            checked={plantFilter}
            onChange={(e) => {
              setPlantFilter(e.target.checked);
            }}
          />
          <span
            className={[styles.parentLabelText, styles.labelText].join(' ')}
          >
            Flore
          </span>
          <span className={styles.count} /> {/* To fill grid space */}
        </label>
      </li>
      <li className={styles.filterListItem}>
        <FilterWithChildFilters
          label="Annexe CITES"
          childFilters={citesChildFilters}
          selected={citesFilters}
          onSelect={setCitesFilters}
        />
      </li>
    </ul>
  );
}
