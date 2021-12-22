import React, { useContext, useState } from 'react';
import { geoSearchParams } from 'common/utils';
import { GeoContext } from 'store/geodb';
import Country from 'components/Countries/Country';
import { useCountries } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const Cities = (): JSX.Element => {
  const { state } = useContext(GeoContext);
  const { offsetCurrent } = geoSearchParams(state.countries.links);
  const [currentState, setCurrentState] = useState({
    namePrefix: '',
    offset: offsetCurrent || 0,
    loadMoreCounter: 0
  });
  const [countries, isLoading, isLoadingMore] = useCountries(currentState);

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
          <Country countries={countries} loadMore={loadMore} isLoadingMore={isLoadingMore} />
        )}
      </div>
    </div>
  );
};

export default Cities;
