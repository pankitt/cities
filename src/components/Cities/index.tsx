import React from 'react';
import City from 'components/Cities/City';
import { useCities } from 'hooks';
import styles from './index.module.css';

const Cities = (): JSX.Element => {
  const [cities, isLoading] = useCities();

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <City cities={cities} />
        {isLoading ? 'loading...' : ''}
      </div>
    </div>
  );
};

export default Cities;
