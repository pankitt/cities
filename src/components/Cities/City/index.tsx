import React, { FC } from 'react';
import { ICity, IMetaData } from 'types';
import { Button } from 'common';
import styles from './index.module.css';

interface Props {
  cities: ICity[] | string;
  metadata: IMetaData;
  loadFetch: () => void;
}

const City: FC<Props> = ({ cities = [], metadata = {}, loadFetch }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Cities List</h3>
      {typeof cities === 'string' ? (
        <Button onClick={loadFetch}>{'Show list!'}</Button>
      ) : (
        cities.map(({ id, name, country }) => (
          <div key={id} className={styles.item}>
            {name} - {country}
          </div>
        ))
      )}
      <div>
        <span className={styles.total}>Total: {metadata.totalCount || 0}</span>
      </div>
    </div>
  );
};

export default City;
