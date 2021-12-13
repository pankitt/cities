import React from 'react';
import City from 'components/Cities/City';
import { useCities } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const Cities = (): JSX.Element => {
  const [cities, metaData, isLoading] = useCities();

  return (
    <div className={styles.wrapper}>
      <div>{isLoading ? <Loader /> : <City cities={cities} metadata={metaData} />}</div>
    </div>
  );
};

export default Cities;
