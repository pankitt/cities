import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { useI18n } from 'hooks';
import { IListCountries } from 'types';
import { geoSearchParams } from 'common/utils';
import { LoadingQuantity } from 'components/geodb';
import styles from 'components/geodb/index.module.css';

interface Props {
  countries: IListCountries;
  loadMore: (offsetCurrent: number) => void;
  isLoadingMore: boolean;
}

const Country: FC<Props> = ({ countries, loadMore, isLoadingMore }) => {
  const { data = [], links = [], metadata, message = '' } = countries;
  const { offsetCurrent, offsetLast } = geoSearchParams(links);
  const { t } = useI18n();

  return (
    <div>
      <h3 className={styles.title}>{t('main.countries')}:</h3>
      <div className={styles.itemsList}>
        {data.map(({ code, name }, index: number) => (
          <Link to={code} key={code} className={styles.item}>
            <span className={styles.index}>{++index}.</span> {name}
            <ReactCountryFlag countryCode={code} className={styles.flagSmall} title={name} svg />
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

export default Country;
