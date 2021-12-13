import React, { FC } from 'react';
import { ICity, IMetaData } from 'types';
import styles from './index.module.css';

interface Props {
  cities: ICity[];
  metadata: IMetaData;
}

const City: FC<Props> = ({ cities = [], metadata = {} }) => {
  return (
    <div className={styles.wrapper}>
      {cities.map(({ id, name, country }) => (
        <div key={id} className={styles.item}>
          {name} - {country}
        </div>
      ))}
      <div>
        <h3>Total: {metadata.totalCount}</h3>
      </div>
    </div>
  );
};

export default City;
