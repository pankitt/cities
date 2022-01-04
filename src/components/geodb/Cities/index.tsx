import React, { useContext, useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { AiOutlineClose } from 'react-icons/ai';
import { ISearchData } from 'types';
import { I18nContext } from 'store/i18n';
import { FiltersContext, setCountriesFilterAction } from 'store/filters';
import City from 'components/geodb/Cities/City';
import Search from 'common/Search';
import { useCities } from 'hooks';
import { Loader } from 'common';
import styles from 'components/geodb/index.module.css';

const Cities = (): JSX.Element => {
  const { state: filters, dispatch } = useContext(FiltersContext);
  const { state: i18n } = useContext(I18nContext);
  const { language } = i18n;
  const { countries } = filters;

  const [currentState, setCurrentState] = useState({
    namePrefix: '',
    offset: 0,
    loadMoreCounter: 0,
    languageCode: language,
    countryIds: countries
  });
  const [cities, isLoading, isLoadingMore] = useCities(currentState);

  const loadMore = (offsetCurrent: number) =>
    setCurrentState((prevState) => ({
      ...prevState,
      offset: offsetCurrent,
      loadMoreCounter: ++prevState.loadMoreCounter
    }));

  const onSearch = (data: ISearchData) =>
    setCurrentState((prevState) => ({
      ...prevState,
      offset: 0,
      namePrefix: data.name
    }));

  useEffect(() => {
    setCurrentState((prevState) => ({
      ...prevState,
      offset: 0,
      languageCode: language,
      countryIds: countries
    }));
  }, [language, countries]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.filters}>
            <Search onSubmit={onSearch} />
            {countries && (
              <span
                role="presentation"
                className={styles.countryFilter}
                onClick={() => dispatch(setCountriesFilterAction(''))}
              >
                <ReactCountryFlag countryCode={countries} className={styles.flagFilter} svg />
                <AiOutlineClose className={styles.iconCloseFilter} />
              </span>
            )}
          </div>
          <City cities={cities} loadMore={loadMore} isLoadingMore={isLoadingMore} />
        </>
      )}
    </div>
  );
};

export default Cities;
