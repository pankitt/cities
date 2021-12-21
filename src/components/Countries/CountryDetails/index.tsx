import React from 'react';
import { useParams } from 'react-router-dom';
import { useCountryDetails } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const CountryDetails = (): JSX.Element => {
  const params = useParams();
  const { id = '' } = params;
  const [country, isLoading] = useCountryDetails({ detailsCode: id });
  // TODO::
  console.log(country);
  return <div className={styles.wrapper}>{isLoading ? <Loader /> : <div>CityDetails</div>}</div>;
};

export default CountryDetails;
