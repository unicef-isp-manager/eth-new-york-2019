import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
// import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

/* eslint-disable no-unused-vars */
const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
    // flexWrap: 'wrap',
    // alignItems: 'center',
    width: '200px',
    height: 'auto',
    right: 0,
    bottom: 0,
    zIndex: 100,
    position: 'absolute',
    background: '#e3e3e3',
    // backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    marginTop: '16px',
    marginBottom: '16px'
  }
}));

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

function DonationCard(props) {
  const { countryFromMap, dataset, handleDonationClick } = props;

  const classes = useStyles();
  
  // values for TextFields
  const [values, setValues] = useState({
    countries: [],
    country: '',
    amount: '',
    currency: 'USD',
  });
  
  const [countries, setCountries] = useState(null);
  
  useEffect(() => {
    if (dataset) {
      // console.log('DATASET', dataset);
      const countries = dataset.datasets[0].data.allData
      .map(set => ({ value: set[2], label: set[1] }));
      console.log('COUNTRIES', countries);
  
      setCountries(countries);
    }
  }, [dataset]);
  
  useEffect(() => {
    setValues({ ...values, country: countryFromMap });
  }, [values, countryFromMap]);

  const handleChange = name => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };


  return (
    // <div className={classes.container}>
    <Card
      // className={classes.card}
      classes={{
        root: classes.card,
      }}
    >
      {/* country */}

      {countryFromMap ? (
        <TextField
          // autoFocus={true}
          id="outlined-read-only-input"
          // label="Country"
          // label={values.country}
          // defaultValue={values.country} // does not appear
          className={classes.textField}
          margin="normal"
          InputLabelProps={{
            focused: true
          }}
          InputProps={{
            readOnly: true,
          }}
          value={values.country}
          variant="outlined"
        />

      ) : (

        <TextField
          id="outlined-select-country"
          select
          label="Country"
          className={classes.textField}
          value={values.country}
          onChange={handleChange('country')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          // helperText="Please select your currency"
          margin="normal"
          variant="outlined"
        >
          {countries && countries.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

      )}

      {/* amount */}

      <TextField
        id="outlined-name"
        label="Amount &diams; in Finney"
        className={classes.textField}
        value={values.amount}
        onChange={handleChange('amount')}
        margin="normal"
        variant="outlined"
      />

      {/* <TextField
        id="outlined-select-currency"
        select
        label="Select"
        className={classes.textField}
        value={values.currency}
        onChange={handleChange('currency')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        helperText="Please select your currency"
        margin="normal"
        variant="outlined"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField> */}

      {/* button */}
      <Button
        variant="contained"
        // color="primary"
        color="secondary"
        className={classes.button}
        onClick={() => handleDonationClick(values.country, values.amount, values.currency)}
      >
        Donate
      </Button>
      {/* </div> */}
    </Card>
  );
}

DonationCard.propTypes = {
  countryFromMap: PropTypes.string,
  // handleDonationClick: PropTypes.func.isRequired,
  dataset: PropTypes.shape({}).isRequired,
};

DonationCard.defaultProps = {
  countryFromMap: '',
};

export default DonationCard;
