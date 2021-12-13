import React from 'react';
import Country from 'components/Countries/Country';
import { useCountries } from 'hooks';
import styles from './index.module.css';

const Cities = (): JSX.Element => {
  const [countries, isLoading] = useCountries();

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Country countries={countries} />
        {isLoading ? 'loading...' : ''}
      </div>
    </div>
  );
};

export default Cities;
