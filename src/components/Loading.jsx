import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loading.module.css';

export function Spinner({ className, style, size }) {
  return (
    <div
      className={`
      ${styles['la-ball-atom']} ${styles[`la-${size}`]} ${className}
      `}
      style={style}
      title="Chargement..."
      aria-busy="true"
      aria-live="polite"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
Spinner.defaultProps = {
  className: '',
  style: { marginTop: '3rem' },
  size: '3x',
};
Spinner.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  size: PropTypes.oneOf(['sm', '1x', '2x', '3x']),
};

export function Loading({ loading, className, style, size, children }) {
  return loading ? (
    <Spinner className={className} style={style} size={size} />
  ) : (
    children
  );
}
Loading.defaultProps = Spinner.defaultProps;
Loading.propTypes = {
  ...Spinner.propTypes,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
