import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ISearchData } from 'types';
import { I18nContext } from 'store/i18n';
import Country from 'components/geodb/Countries/Country';
import Search from 'common/Search';
import { useCountries } from 'hooks';
import { Loader } from 'common';

const Countries = (): JSX.Element => {
  const { state: i18n } = useContext(I18nContext);
  const { language } = i18n;

  const [currentState, setCurrentState] = useState({
    namePrefix: '',
    offset: 0,
    loadMoreCounter: 0,
    languageCode: language
  });
  const [countries, isLoading, isLoadingMore] = useCountries(currentState);

  const loadMore = (offsetCurrent: number) =>
    setCurrentState((prevState) => ({
      ...prevState,
      offset: offsetCurrent,
      loadMoreCounter: ++prevState.loadMoreCounter
    }));

  const onSearch = useCallback((data: ISearchData) => {
    setCurrentState((prevState) => ({
      ...prevState,
      offset: 0,
      namePrefix: data.name
    }));
  }, []);

  useEffect(() => {
    setCurrentState((prevState) => ({
      ...prevState,
      offset: 0,
      languageCode: language
    }));
  }, [language]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Search onSubmit={onSearch} />
          <Country countries={countries} loadMore={loadMore} isLoadingMore={isLoadingMore} />
        </>
      )}
    </div>
  );
};

export default Countries;
