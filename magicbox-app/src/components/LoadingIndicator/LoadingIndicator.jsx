import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingIndicator = ({ value }) => (
  <div className="loadingIndicator">
    <CircularProgress
      color="secondary"
      variant={value !== null ? 'determinate' : 'indeterminate'}
      value={value}
    />
  </div>
);

LoadingIndicator.defaultProps = {
  value: null,
};

LoadingIndicator.propTypes = {
  value: PropTypes.number,
};

export default LoadingIndicator;
