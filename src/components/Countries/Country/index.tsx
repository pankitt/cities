import React, { FC } from 'react';
import { ICountry } from 'types';
import styles from './index.module.css';

interface Props {
  countries: ICountry[];
}

const Country: FC<Props> = ({ countries = [] }) => {
  return (
    <div className={styles.wrapper}>
      {countries.map(({ code, name }) => (
        <div key={code} className={styles.item}>
          {name} - {code}
        </div>
      ))}
    </div>
  );
};

export default Country;
