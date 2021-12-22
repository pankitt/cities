import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IListCountries } from 'types';
import { geoSearchParams } from 'common/utils';
import { Button, Loader } from 'common';
import styles from './index.module.css';

interface Props {
  countries: IListCountries;
  loadMore: (offsetCurrent: number) => void;
  isLoadingMore: boolean;
}

const Country: FC<Props> = ({ countries = {}, loadMore, isLoadingMore }) => {
  const { data = [], links = [], metadata, message = '' } = countries;
  const { offsetCurrent, offsetLast } = geoSearchParams(links);
  const lastElement = offsetLast < offsetCurrent;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Countries List</h3>
      <div className={styles.itemsList}>
        {data.map(({ code, name }) => (
          <Link to={code} key={code} className={styles.item}>
            {name}
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
        {offsetLast > 0 && !lastElement && (
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

export default Country;
