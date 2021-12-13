import React, { FC } from 'react';
import { ICity } from 'types';
import styles from './index.module.css';

interface Props {
  cities: ICity[];
}

const City: FC<Props> = ({ cities = [] }) => {
  return (
    <div className={styles.wrapper}>
      {cities.map(({ id, name, country }) => (
        <div key={id} className={styles.item}>
          {name} - {country}
        </div>
      ))}
    </div>
  );
};

export default City;
