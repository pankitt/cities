import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCityDetails } from 'hooks';
import { Button, Loader } from 'common';
import styles from './index.module.css';

const CityDetails = (): JSX.Element => {
  const params = useParams();
  const { id = '' } = params;
  const [currentState, setCurrentState] = useState({
    detailsCode: id,
    loadMoreCounter: 0
  });
  const [city, isLoading] = useCityDetails(currentState);
  const {
    data = {
      name: '',
      country: '',
      countryCode: '',
      type: '',
      population: 0,
      region: '',
      regionCode: '',
      timezone: '',
      wikiDataId: ''
    },
    message = ''
  } = city;

  const { name, country, countryCode, type, population, region, regionCode, timezone, wikiDataId } =
    data;

  const loadMore = (): void =>
    setCurrentState(({ loadMoreCounter }) => ({
      detailsCode: id,
      loadMoreCounter: ++loadMoreCounter
    }));

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {name && <h1 className={styles.title}>{name}</h1>}
          <div className={styles.info}>
            {type && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Type:</span>
                {type}
              </div>
            )}
            {population > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Population:</span>
                {population}
              </div>
            )}
            {country && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Country:</span>
                <b>{country}</b>
              </div>
            )}
            {countryCode && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Country Code:</span>
                {countryCode}
              </div>
            )}
            {region && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Region:</span>
                {region}
              </div>
            )}
            {regionCode && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Region Code:</span>
                {regionCode}
              </div>
            )}
            {timezone && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Timezone:</span>
                {timezone}
              </div>
            )}
            {wikiDataId && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Wikidata:</span>
                <a
                  href={`https://www.wikidata.org/wiki/${wikiDataId}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  link
                </a>
              </div>
            )}
            {name && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Google Map:</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${name}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  link
                </a>
              </div>
            )}
            {message && (
              <div>
                <Button onClick={loadMore}>{'Load Again'}</Button>
                <div className={styles.message}>{message}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityDetails;
