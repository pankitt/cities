import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SiWikidata, SiWikipedia, SiGooglemaps } from 'react-icons/si';
import { I18nContext } from 'store/i18n';
import { useCityDetails, useI18n } from 'hooks';
import { Button, Loader } from 'common';
import styles from 'components/geodb/index.module.css';

const CityDetails = (): JSX.Element => {
  const params = useParams();
  const { id = '' } = params;

  const { t } = useI18n();
  const { state: i18n } = useContext(I18nContext);
  const { language } = i18n;

  const [currentState, setCurrentState] = useState({
    detailsCode: id,
    loadMoreCounter: 0,
    languageCode: language
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
    setCurrentState((prevState) => ({
      ...prevState,
      loadMoreCounter: ++prevState.loadMoreCounter
    }));

  useEffect(() => {
    setCurrentState((prevState) => ({
      ...prevState,
      languageCode: language
    }));
  }, [language]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {name && <h1 className={styles.titleDetails}>{name}</h1>}
          <div className={styles.info}>
            {type && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.type')}:</span>
                {type}
              </div>
            )}
            {population > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.population')}:</span>
                {population}
              </div>
            )}
            {country && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.country')}:</span>
                <b>{country}</b>
              </div>
            )}
            {countryCode && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.countryCode')}:</span>
                {countryCode}
              </div>
            )}
            {region && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.region')}:</span>
                {region}
              </div>
            )}
            {regionCode && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.regionCode')}:</span>
                {regionCode}
              </div>
            )}
            {timezone && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.timezone')}:</span>
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
    </div>
  );
};

export default CityDetails;
