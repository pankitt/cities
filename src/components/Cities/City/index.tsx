import React, { FC } from 'react';
import { IListCities } from 'types';
import { geoSearchParams } from 'common/utils';
import { Button } from 'common';
import styles from './index.module.css';

interface Props {
  cities: IListCities;
  loadFetch: () => void;
}

const City: FC<Props> = ({ cities = {}, loadFetch }) => {
  const { data = [], links = [], metadata, message = '' } = cities;
  const { offsetCurrent, offsetLast } = geoSearchParams(links);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Cities List</h3>
      {data.map(({ id, name, country }) => (
        <div key={id} className={styles.item}>
          {name} - {country}
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
            <Button onClick={loadFetch}>{'Load more'}</Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default City;
