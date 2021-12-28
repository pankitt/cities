import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IListCities } from 'types';
import { geoSearchParams } from 'common/utils';
import { LoadingQuantity } from 'components/geodb';
import styles from 'components/geodb/index.module.css';

interface Props {
  cities: IListCities;
  loadMore: (offsetCurrent: number) => void;
  isLoadingMore: boolean;
}

const City: FC<Props> = ({ cities, loadMore, isLoadingMore }) => {
  const { data = [], links = [], metadata, message = '' } = cities;
  const { offsetCurrent, offsetLast } = geoSearchParams(links);

  return (
    <div>
      <h3 className={styles.title}>Cities List</h3>
      <div className={styles.itemsList}>
        {data.map(({ id, name, country, wikiDataId }) => (
          <Link key={id} to={wikiDataId} className={styles.item}>
            {name} <span className={styles.country}>{country}</span>
          </Link>
        ))}
      </div>
      <LoadingQuantity
        isLoadingMore={isLoadingMore}
        offsetCurrent={offsetCurrent}
        offsetLast={offsetLast}
        loadMore={loadMore}
        message={message}
        metadata={metadata}
      />
    </div>
  );
};

export default City;
