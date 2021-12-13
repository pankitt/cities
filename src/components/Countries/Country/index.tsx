import React, { FC } from 'react';
import { ICountry, IMetaData } from 'types';
import styles from './index.module.css';

interface Props {
  countries: ICountry[];
  metadata: IMetaData;
}

const Country: FC<Props> = ({ countries = [], metadata = {} }) => {
  return (
    <div className={styles.wrapper}>
      {countries.map(({ code, name }) => (
        <div key={code} className={styles.item}>
          {name} - {code}
        </div>
      ))}
      <div>
        <h3>Total: {metadata.totalCount}</h3>
      </div>
    </div>
  );
};

export default Country;
