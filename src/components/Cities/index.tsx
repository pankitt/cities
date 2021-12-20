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
    offset: offsetCurrent || 0,
    loadMoreCounter: 0
  });
  const [cities, isLoading] = useCities(currentState);

  const loadMore = (num: number): void =>
    setCurrentState(({ loadMoreCounter }) => ({
      offset: num,
      loadMoreCounter: ++loadMoreCounter
    }));

  return (
    <div className={styles.wrapper}>
      <div>{isLoading ? <Loader /> : <City cities={cities} loadMore={loadMore} />}</div>
    </div>
  );
};

export default Cities;
