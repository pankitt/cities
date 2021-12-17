import React, { FC } from 'react';
import { IListCities } from 'types';
import { geoSearchParams } from 'common/utils';
import { Button } from 'common';
import styles from './index.module.css';

interface Props {
  cities: IListCities;
  loadMore: (offsetCurrent: number) => void;
}

const City: FC<Props> = ({ cities = {}, loadMore }) => {
  const { data = [], links = [], metadata } = cities;
  const { offsetCurrent, offsetLast } = geoSearchParams(links);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Cities List</h3>
      <div className={styles.itemsList}>
        {data.map(({ id, name, country }) => (
          <div key={id} className={styles.item}>
            {name} - {country}
          </div>
        ))}
      </div>
      <div className={styles.listInfo}>
        {offsetLast > 0 && (
          <span className={styles.total}>
            Quantity: <b>{offsetCurrent}</b>/{metadata?.totalCount}
          </span>
        )}
        <div>
          <Button onClick={() => loadMore(offsetCurrent)}>{'Load more'}</Button>
        </div>
      </div>
    </div>
  );
};

export default City;
