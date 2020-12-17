import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.css';

function FilterWithChildFilters({
  name,
  label,
  childFilters,
  selected,
  onSelect,
}) {
  const parentCheckRef = useRef();
  const parentCheckId = `check-${name}`;

  const isAllChecked = selected.length === childFilters.length;

  useEffect(() => {
    // Indeterminate if some but not all sub filters are checked
    parentCheckRef.current.indeterminate =
      selected.length > 0 && selected.length < childFilters.length;
  }, [selected, childFilters]);

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
        <span className={styles.parentLabelText}>{label}</span>
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
                <span>{child.label}</span>
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
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  childFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      count: PropTypes.number,
    }),
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};
export default function Filters({ filters, selected, onSelect }) {
  const handleOnSelect = (name) => (newSelected) => {
    onSelect({ ...selected, [name]: newSelected });
  };

  return (
    <ul className={styles.filterGrid}>
      {Object.entries(filters).map(([name, filter]) => (
        <li key={name} className={styles.filterListItem}>
          {filter.childFilters !== undefined ? (
            // Filter with child filters
            <FilterWithChildFilters
              name={name}
              label={filter.label}
              childFilters={filter.childFilters}
              selected={selected[name]}
              onSelect={handleOnSelect(name)}
            />
          ) : (
            // Filter with no child filter
            <label htmlFor={`check-${name}`} className={styles.label}>
              <input
                id={`check-${name}`}
                type="checkbox"
                checked={selected[name]}
                onChange={(e) => {
                  handleOnSelect(name)(e.target.checked);
                }}
              />
              <span className={styles.parentLabelText}>{filter.label}</span>
              <span className={styles.count} /> {/* To fill grid space */}
            </label>
          )}
        </li>
      ))}
    </ul>
  );
}
Filters.propTypes = {
  filters: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string,
      childFilters: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          label: PropTypes.string,
          count: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  selected: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.bool]),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};
