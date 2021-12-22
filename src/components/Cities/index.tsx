import React, { useContext, useState } from 'react';
import { geoSearchParams } from 'common/utils';
import { GeoContext } from 'store/geodb';
import City from 'components/Cities/City';
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

  const loadMore = (offsetCurrent: number): void =>
    setCurrentState((prevState) => ({
      ...prevState,
      offset: offsetCurrent,
      loadMoreCounter: ++prevState.loadMoreCounter
    }));

  return (
    <div className={styles.wrapper}>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <City cities={cities} loadMore={loadMore} isLoadingMore={isLoadingMore} />
        )}
      </div>
    </div>
  );
};

export default Cities;
