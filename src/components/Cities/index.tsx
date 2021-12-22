import React, { useContext, useState } from 'react';
import { geoSearchParams } from 'common/utils';
import { ISearchData } from 'types';
import { GeoContext } from 'store/geodb';
import City from 'components/Cities/City';
import Search from 'common/Search';
import { useCities } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const Cities = (): JSX.Element => {
  const { state } = useContext(GeoContext);
  const { offsetCurrent } = geoSearchParams(state.cities.links);
  const [currentState, setCurrentState] = useState({
    namePrefix: '',
    offset: offsetCurrent || 0,
    loadMoreCounter: 0
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
            <City cities={cities} loadMore={loadMore} isLoadingMore={isLoadingMore} />
          </>
        )}
      </div>
    </div>
  );
};

export default Cities;
