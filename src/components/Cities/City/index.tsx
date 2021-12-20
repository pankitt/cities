import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IListCities } from 'types';
import { geoSearchParams } from 'common/utils';
import { Button, Loader } from 'common';
import styles from './index.module.css';

interface Props {
  cities: IListCities;
  loadMore: (offsetCurrent: number) => void;
  isLoadingMore: boolean;
}

const City: FC<Props> = ({ cities = {}, loadMore, isLoadingMore }) => {
  const { data = [], links = [], metadata, message = '' } = cities;
  const { offsetCurrent, offsetLast } = geoSearchParams(links);
  const lastElement = offsetLast < offsetCurrent;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Cities List</h3>
      <div className={styles.itemsList}>
        {data.map(({ id, name, country, wikiDataId }) => (
          <Link key={id} to={wikiDataId} className={styles.item}>
            {name} - {country}
          </Link>
        ))}
      </div>
      {isLoadingMore && <Loader />}
      <div className={styles.listInfo}>
        {offsetLast > 0 && (
          <div className={styles.total}>
            <span className={styles.quantity}>Quantity:</span>
            <b>{!lastElement ? offsetCurrent : metadata?.totalCount}</b>/{metadata?.totalCount}
          </div>
        )}
        {!lastElement && (
          <div>
            <Button disabled={isLoadingMore} onClick={() => loadMore(offsetCurrent)}>
              {'Load more'}
            </Button>
          </div>
        )}
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default City;
