import React from 'react';
import IcomoonReact from 'icomoon-react';
import PropTypes from 'prop-types';
import iconSet from '../assets/selection.json';

const Icon = (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <IcomoonReact {...props} iconSet={iconSet} />;
};
Icon.defaultProps = {
  size: '100%',
  className: '',
};
Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
export default Icon;
