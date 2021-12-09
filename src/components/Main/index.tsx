import React, { useState, useEffect } from 'react';
import List from 'components/List';
import { ICountryDetail } from 'types';
// import { countriesMock } from 'mock';
import styles from './index.module.css';

const Main = (): JSX.Element => {
  // const countries: ICountryDetail[] = countriesMock;
  const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=10';
  const [countries, setCountries] = useState<ICountryDetail[]>([]);
  console.log(1111111111, countries);

  useEffect(() => {
    fetchCountries(url);
  }, []);

  async function fetchCountries(url = '') {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          'x-rapidapi-key': '22c953082emsha514076bb452b74p1b64aejsn1dfc41e5ca42'
        }
      });
      const result = await response.json();
      setCountries(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <List countries={countries} />
      </div>
    </div>
  );
};

export default Main;
