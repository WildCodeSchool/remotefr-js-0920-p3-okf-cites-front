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

export const LoadingState = {
  Loading: 0,
  NotLoading: 1,
  Error: 2,
};

export function Loading({
  state,
  loading,
  error,
  onTryAgain,
  className,
  style,
  size,
  children,
}) {
  if (state === LoadingState.Loading || loading) {
    return <Spinner className={className} style={style} size={size} />;
  }

  if (state === LoadingState.Error || error) {
    return (
      <div className={styles.loadingError} role="alert">
        Erreur de chargement
        {onTryAgain != null && (
          <button
            type="button"
            onClick={onTryAgain}
            title="Relancer la requête"
          >
            Réessayer ?
          </button>
        )}
      </div>
    );
  }

  return children;
}
Loading.defaultProps = {
  ...Spinner.defaultProps,
  state: null,
  loading: false,
  error: false,
  onTryAgain: null,
};
Loading.propTypes = {
  ...Spinner.propTypes,
  state: PropTypes.oneOf(Object.values(LoadingState)),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onTryAgain: PropTypes.func,
  children: PropTypes.node.isRequired,
};
