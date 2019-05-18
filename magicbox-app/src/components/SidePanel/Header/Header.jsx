import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from './UNICEF_logo.png';

const styles = {
  header: {
    backgroundColor: '#000000',
    height: '57px',
  },
  image: {
    marginTop: '18px',
    marginLeft: '20px',
  },
};

const Header = ({ classes }) => (
  <div className={classes.header}>
    <img src={logo} alt="UNICEF Poverty Map" className={classes.image} />
  </div>
);

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Header);
