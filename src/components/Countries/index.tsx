import React from 'react';
import Country from 'components/Countries/Country';
import { useCountries } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const Cities = (): JSX.Element => {
  const [countriesList, metaData, isLoading] = useCountries();

  return (
    <div className={styles.wrapper}>
      <div>
        {isLoading ? <Loader /> : <Country countries={countriesList} metadata={metaData} />}
      </div>
    </div>
  );
};

export default Cities;
