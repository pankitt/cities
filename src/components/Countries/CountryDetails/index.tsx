import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCountryDetails } from 'hooks';
import { Button, Loader } from 'common';
import styles from './index.module.css';

const CountryDetails = (): JSX.Element => {
  const params = useParams();
  const { id = '' } = params;
  const [currentState, setCurrentState] = useState({
    detailsCode: id,
    loadMoreCounter: 0
  });
  const [country, isLoading] = useCountryDetails(currentState);
  const {
    data = {
      name: '',
      code: '',
      capital: '',
      flagImageUri: '',
      callingCode: '',
      wikiDataId: '',
      numRegions: 0,
      currencyCodes: []
    },
    message = ''
  } = country;

  const { name, code, capital, flagImageUri, callingCode, wikiDataId, numRegions, currencyCodes } =
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
          {name && (
            <h1 className={styles.title}>
              {name} <img alt="flag" src={flagImageUri} className={styles.flag} />
            </h1>
          )}
          <div className={styles.info}>
            {code && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Code:</span>
                {code}
              </div>
            )}
            {capital && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Capital:</span>
                {capital}
              </div>
            )}
            {callingCode && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Calling Code:</span>
                {callingCode}
              </div>
            )}
            {numRegions > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Regions:</span>
                {numRegions}
              </div>
            )}
            {currencyCodes.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Currency:</span>
                {currencyCodes.map((code) => code)}
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

export default CountryDetails;
