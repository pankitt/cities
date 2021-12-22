import React, { useState } from 'react';
import { ISearchData } from 'types';
import Country from 'components/Countries/Country';
import Search from 'common/Search';
import { useCountries } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const Countries = (): JSX.Element => {
  const [currentState, setCurrentState] = useState({
    namePrefix: '',
    offset: 0,
    loadMoreCounter: 0
  });
  const [countries, isLoading, isLoadingMore] = useCountries(currentState);

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

  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default Countries;
