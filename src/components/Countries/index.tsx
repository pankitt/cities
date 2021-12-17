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
    offset: offsetCurrent || 0
  });
  const [countries, isLoading] = useCountries(currentState);

  const loadMore = (num: number): void =>
    setCurrentState({
      offset: num
    });

  return (
    <div className={styles.wrapper}>
      <div>{isLoading ? <Loader /> : <Country countries={countries} loadMore={loadMore} />}</div>
    </div>
  );
};

export default Cities;
