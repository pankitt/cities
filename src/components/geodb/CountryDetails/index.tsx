import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SiWikidata, SiWikipedia, SiGooglemaps } from 'react-icons/si';
import { BsCurrencyExchange, BsPhoneVibrate } from 'react-icons/bs';
import { useCountryDetails } from 'hooks';
import { Button, Loader } from 'common';
import { Regions } from 'components/geodb';
import styles from 'components/geodb/index.module.css';

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
    setCurrentState((prevState) => ({
      ...prevState,
      loadMoreCounter: ++prevState.loadMoreCounter
    }));

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {name && (
            <h1 className={styles.titleDetails}>
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
            {numRegions > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Regions:</span>
                {numRegions}
              </div>
            )}
            {callingCode && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Calling Code:</span>
                <BsPhoneVibrate className={styles.iconPhone} /> {callingCode}
              </div>
            )}
            {currencyCodes.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Currency:</span>
                {currencyCodes.map((code) => (
                  <span key={code} className={styles.currencyCode}>
                    <BsCurrencyExchange className={styles.iconCurrency} /> {code}
                  </span>
                ))}
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
                  <SiWikidata className={styles.iconWikiData} />
                </a>
              </div>
            )}
            {name && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>Wikipedia:</span>
                <a href={`https://en.wikipedia.org/wiki/${name}`} rel="noreferrer" target="_blank">
                  <SiWikipedia className={styles.iconWiki} />
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
                  <SiGooglemaps className={styles.iconGoogleMaps} />
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
      {numRegions > 0 && code && <Regions code={code} />}
    </div>
  );
};

export default CountryDetails;
