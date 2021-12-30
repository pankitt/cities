import React, { useContext, useEffect, useState } from 'react';
import { ISearchData } from 'types';
import { I18nContext } from 'store/i18n';
import City from 'components/geodb/Cities/City';
import Search from 'common/Search';
import { useCities } from 'hooks';
import { Loader } from 'common';

const Cities = (): JSX.Element => {
  const { state: i18n } = useContext(I18nContext);
  const { language } = i18n;

  const [currentState, setCurrentState] = useState({
    namePrefix: '',
    offset: 0,
    loadMoreCounter: 0,
    languageCode: language
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
          <City cities={cities} loadMore={loadMore} isLoadingMore={isLoadingMore} />
        </>
      )}
    </div>
  );
};

export default Cities;
