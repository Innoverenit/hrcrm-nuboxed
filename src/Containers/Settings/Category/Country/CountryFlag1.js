import React from 'react';
import ReactCountryFlag from 'react-country-flag';

const CountryFlag1 = ({ countryCode }) => {
  if (!countryCode || countryCode.length !== 2) {
    return <span>Not Available</span>;
  }

  return <ReactCountryFlag countryCode={countryCode} svg />;
};

export default CountryFlag1;