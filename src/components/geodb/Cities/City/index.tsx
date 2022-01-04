import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { useI18n } from 'hooks';
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
  const { t } = useI18n();

  return (
    <div>
      <h3 className={styles.title}>{t('main.cities')}:</h3>
      <div className={styles.itemsList}>
        {data.map(({ id, name, country, countryCode, wikiDataId }) => (
          <Link key={id} to={wikiDataId} className={styles.item}>
            {name}
            <ReactCountryFlag
              countryCode={countryCode}
              className={styles.flagSmall}
              title={country}
              svg
            />
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
