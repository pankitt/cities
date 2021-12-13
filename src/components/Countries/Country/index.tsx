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
      <h3 className={styles.title}>Countries List</h3>
      {countries.map(({ code, name }) => (
        <div key={code} className={styles.item}>
          {name} - {code}
        </div>
      ))}
      <div>
        <span className={styles.total}>Total: {metadata.totalCount || 0}</span>
      </div>
    </div>
  );
};

export default Country;
