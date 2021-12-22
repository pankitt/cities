import React, { useContext, useState } from 'react';
import { geoSearchParams } from 'common/utils';
import { ISearchData } from 'types';
import { GeoContext } from 'store/geodb';
import Country from 'components/Countries/Country';
import Search from 'common/Search';
import { useCountries } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const Countries = (): JSX.Element => {
  const { state } = useContext(GeoContext);
  const { offsetCurrent } = geoSearchParams(state.countries.links);
  const [currentState, setCurrentState] = useState({
    namePrefix: '',
    offset: offsetCurrent || 0,
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
