import React, { FC } from 'react';
import { IListCities } from 'types';
import { Button } from 'common';
import styles from './index.module.css';

interface Props {
  cities: IListCities;
  loadFetch: () => void;
}

const City: FC<Props> = ({ cities = {}, loadFetch }) => {
  const { data = [], metadata, message = '' } = cities;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Cities List</h3>
      {message ? (
        <Button onClick={loadFetch}>{'Show list!'}</Button>
      ) : (
        data.map(({ id, name, country }) => (
          <div key={id} className={styles.item}>
            {name} - {country}
          </div>
        ))
      )}
      <div>
        <span className={styles.total}>Total: {metadata?.totalCount || 0}</span>
      </div>
    </div>
  );
};

export default City;
