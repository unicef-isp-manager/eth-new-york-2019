import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Deviation from './deviation_scale.png';


const styles = {
  scale: {
    height: '118px',
    width: '291px',
    marginTop: '5px',
    backgroundColor: '#e3e3e3',
  },
  chipGradient: {
    marginLeft: '22px',
    marginTop: '22px',
    width: '242px',
    height: '10px',
    borderRadius: '5px',
    backgroundImage: 'linear-gradient(to right, #e4e6ea, #7280c7 44%, #182fab)',
  },
  chipDivergent: {
    marginLeft: '22px',
    marginTop: '22px',
    width: '242px',
    height: '10px',
    borderRadius: '5px',
    backgroundImage: `url(${Deviation})`,
    backgroundSize: 'cover',
  },
  title: {
    paddingTop: '17px',
    paddingLeft: '22px',
    paddingRight: '5px',
    fontFamily: 'IBM Plex Sans',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '0.9px',
    color: '#000000',
    display: 'flex',
    flexDirection: 'row',
  },
  scaleNumbers: {
    paddingLeft: '22px',
    paddingRight: '60px',
    fontFamily: 'IBM Plex Sans',
    lineHeight: '2.6',
    color: '#000000',
    fontSize: '15px',
  },
  scaleText: {
    paddingLeft: '20px',
    fontFamily: 'IBM Plex Sans',
    lineHeight: '3',
    color: '#000000',
    fontSize: '11px',
  },
};

const Scale = ({
  classes,
  title,
  numericRange,
  divergentRange,
  style,
  scaleType,
}) => (
  <div className={classes.scale}>
    <div className={classes.title}>{title}</div>
    <Chip className={scaleType.toLowerCase() === 'deviation' ? classes.chipDivergent : classes.chipGradient} style={style} />
    { scaleType.toLowerCase() === 'deviation'
      ? divergentRange.map(item => (
        <span className={classes.scaleText} key={item}>{item}</span>
      ))
      : numericRange.map(item => (
        <span className={classes.scaleNumbers} key={item}>{item}</span>
      ))
    }
  </div>
);

Scale.defaultProps = {
  style: {},
  scaleType: 'Gradient',
  numericRange: ['0.1', '0.5', '0.9'],
  divergentRange: ['Overestimate', 'No Deviation', 'Underestimate'],
};

Scale.propTypes = {
  style: PropTypes.shape({}),
  scaleType: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  numericRange: PropTypes.arrayOf(PropTypes.string),
  divergentRange: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(Scale);
