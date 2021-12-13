import React, { useState, useEffect } from 'react';
import City from 'components/Cities/City';
import { useCities } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const Cities = (): JSX.Element => {
  const [cities, metaData, isLoading] = useCities();
  const [citiesLoad, setCitiesLoad] = useState(cities);
  const [metaDataLoad, setMetaDataLoad] = useState(metaData);
  const [isLoadingLoad, setIsLoadingLoad] = useState(isLoading);

  // Todo::
  const loadFetch = (): void => {
    console.log('Under development');
  };

  useEffect(() => {
    setCitiesLoad(cities);
    setMetaDataLoad(metaData);
    setIsLoadingLoad(isLoading);
  }, [cities, metaData, isLoading]);

  return (
    <div className={styles.wrapper}>
      <div>
        {isLoadingLoad ? (
          <Loader />
        ) : (
          <City cities={citiesLoad} metadata={metaDataLoad} loadFetch={loadFetch} />
        )}
      </div>
    </div>
  );
};

export default Cities;
