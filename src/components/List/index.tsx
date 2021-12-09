import React, { FC } from 'react';
import { ICountryDetail } from 'types';
import styles from './index.module.css';

interface CountriesListProps {
  countries: ICountryDetail[];
}

const List: FC<CountriesListProps> = ({ countries = [] }) => {
  console.log(countries.map((i) => i.name));
  return (
    <div className={styles.wrapper}>
      {countries.map(({ code, name }) => (
        <div key={code}>
          {name} - {code}
        </div>
      ))}
    </div>
  );
};

export default List;
