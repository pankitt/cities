import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SiWikidata, SiWikipedia, SiGooglemaps } from 'react-icons/si';
import { BsCurrencyExchange, BsPhoneVibrate } from 'react-icons/bs';
import { FaCity, FaAngleRight } from 'react-icons/fa';
import ReactCountryFlag from 'react-country-flag';
import { I18nContext } from 'store/i18n';
import { FiltersContext, setCountriesFilterAction } from 'store/filters';
import { useCountryDetails, useI18n } from 'hooks';
import { Button, Loader } from 'common';
import { Regions } from 'components/geodb';
import { Page } from 'common/constants';
import styles from 'components/geodb/index.module.css';

const CountryDetails = (): JSX.Element => {
  const params = useParams();
  const { id = '' } = params;

  const { t } = useI18n();
  const { state: i18n } = useContext(I18nContext);
  const { language } = i18n;

  const { dispatch } = useContext(FiltersContext);

  const [currentState, setCurrentState] = useState({
    detailsCode: id,
    loadMoreCounter: 0,
    languageCode: language
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

  const { name, code, capital, callingCode, wikiDataId, numRegions, currencyCodes } = data;

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
          {name && (
            <h1 className={styles.titleDetails}>
              {name}
              <span className={styles.flagBlock}>
                <ReactCountryFlag countryCode={code} className={styles.flag} title={name} svg />
              </span>
            </h1>
          )}
          {numRegions > 0 && code && (
            <Link
              to={Page.CITIES}
              className={styles.linkCities}
              onClick={() => dispatch(setCountriesFilterAction(code))}
            >
              <FaCity className={styles.iconCity} />
              {t('main.cities')}
              <FaAngleRight className={styles.iconRight} />
            </Link>
          )}
          <div className={styles.info}>
            {code && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.countryCode')}:</span>
                {code}
              </div>
            )}
            {capital && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.capital')}:</span>
                {capital}
              </div>
            )}
            {numRegions > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.regions')}:</span>
                {numRegions}
              </div>
            )}
            {callingCode && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.callingCode')}:</span>
                <BsPhoneVibrate className={styles.iconPhone} /> {callingCode}
              </div>
            )}
            {currencyCodes.length > 0 && (
              <div className={styles.infoItem}>
                <span className={styles.infoItemTitle}>{t('details.currency')}:</span>
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
      {numRegions > 0 && code && <Regions code={code} language={language} />}
    </div>
  );
};

export default CountryDetails;
