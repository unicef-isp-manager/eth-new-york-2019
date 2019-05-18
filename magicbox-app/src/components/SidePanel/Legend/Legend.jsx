import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Instructions from './Instructions_icon.svg';

const styles = {
  legend: {
    height: '238px',
    width: '291px',
    marginBottom: '5px',
    backgroundColor: '#e3e3e3',
    fontColor: 'black',
  },
  image: {
    paddingTop: '30px',
    paddingLeft: '96px',
  },
  content: {
    marginTop: '22px',
    paddingLeft: '22px',
  },
};

const Legend = ({ classes, text }) => (
  <div className={classes.legend}>
    <img src={Instructions} alt="Instructions for how to identify and select countries that have data" className={classes.image} />
    <div className={classes.content}>
      {text}
    </div>
  </div>
);

Legend.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(Legend);
