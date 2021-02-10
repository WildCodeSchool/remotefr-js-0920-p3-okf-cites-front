import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Filters.module.css';

export function Filter({ name, label, count, children, selected, onSelect }) {
  const inputRef = useRef();
  const inputId = `check-option-${name}`;

  const filterOptionCount = React.Children.count(children);
  const isAllChecked = selected.length === filterOptionCount;

  useEffect(() => {
    // Indeterminate if some but not all sub filters are checked
    inputRef.current.indeterminate =
      selected.length > 0 && selected.length < filterOptionCount;
  }, [selected, filterOptionCount]);

  const handleChange = (e) => {
    onSelect(
      e.target.checked
        ? React.Children.map(children, (c) => c.props.value)
        : [],
    );
  };

  const handleChildChange = (key) => (e) => {
    onSelect(
      e.target.checked ? [...selected, key] : selected.filter((s) => s !== key),
    );
  };

  return (
    <>
      {/* Parent filter */}
      <label htmlFor={inputId} className={styles.label}>
        <input
          id={inputId}
          type="checkbox"
          checked={isAllChecked}
          onChange={handleChange}
          ref={inputRef}
        />
        <span className={styles.parentLabelText}>{label}</span>
        <span className={styles.count}>{count}</span>
      </label>

      {/* Child filters */}
      <ul className={styles.filterList}>
        {React.Children.map(children, (option) => (
          <li key={option.props.value} className={styles.filterListItem}>
            {React.cloneElement(option, {
              isSelected: selected.includes(option.props.value),
              onSelect: handleChildChange(option.props.value),
            })}
          </li>
        ))}
      </ul>
    </>
  );
}
Filter.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
};
Filter.defaultProps = {
  count: null,
  selected: null, // Passed on by <FilterGroup />
  onSelect: null, // Passed on by <FilterGroup />
};
/**
 * Selectable option inside a {@see Filter}
 */
export function FilterOption({ value, label, count, isSelected, onSelect }) {
  const inputId = `check-option-${value}`;

  return (
    <label htmlFor={inputId} className={styles.label}>
      <input
        id={inputId}
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
      />
      <span>{label}</span>
      <span className={styles.count}>{count}</span>
    </label>
  );
}
FilterOption.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSelected: PropTypes.bool, // Passed on by <Filter />
  onSelect: PropTypes.func, // Passed on by <Filter />
};
FilterOption.defaultProps = {
  count: null,
  isSelected: null, // Passed on by <Filter />
  onSelect: null, // Passed on by <Filter />
};

export function FilterBoolean({ name, label, count, selected, onSelect }) {
  const inputId = `check-${name}`;

  return (
    <label htmlFor={inputId} className={styles.label}>
      <input
        id={inputId}
        type="checkbox"
        checked={selected}
        onChange={(e) => {
          onSelect(e.target.checked);
        }}
      />
      <span className={styles.parentLabelText}>{label}</span>
      <span className={styles.count}>{count} </span>
    </label>
  );
}
FilterBoolean.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};
FilterBoolean.defaultProps = {
  count: null,
  selected: null, // Passed on by <FilterGroup />
  onSelect: null, // Passed on by <FilterGroup />
};

export function FilterGroup({ selected, onSelect, children }) {
  const handleSelect = (name) => (newValue) => {
    onSelect({ ...selected, [name]: newValue });
  };

  return (
    <ul className={styles.filterGrid}>
      {React.Children.map(children, (filter) => (
        <li key={filter.props.name} className={styles.filterListItem}>
          {React.cloneElement(filter, {
            selected: selected[filter.props.name],
            onSelect: handleSelect(filter.props.name),
          })}
        </li>
      ))}
    </ul>
  );
}
FilterGroup.propTypes = {
  selected: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.bool]),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
