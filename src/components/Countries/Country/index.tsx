import React, { FC } from 'react';
import { IListCountries } from 'types';
import { geoSearchParams } from 'common/utils';
import { Button } from 'common';
import styles from './index.module.css';

interface Props {
  countries: IListCountries;
}

const Country: FC<Props> = ({ countries = {} }) => {
  const { data = [], links = [], metadata, message = '' } = countries;
  const { offsetCurrent, offsetLast } = geoSearchParams(links);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Countries List</h3>
      {data.map(({ code, name }) => (
        <div key={code} className={styles.item}>
          {name}
        </div>
      ))}
      {offsetLast !== offsetCurrent || message ? (
        <div className={styles.listInfo}>
          {!message && (
            <span className={styles.total}>
              Quantity: <b>{offsetCurrent}</b>/{metadata?.totalCount}
            </span>
          )}
          <div>
            <Button>{'Load more'}</Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Country;
