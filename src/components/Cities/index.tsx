import React from 'react';
import City from 'components/Cities/City';
import { useCities } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const Cities = (): JSX.Element => {
  const [cities, isLoading] = useCities();

  // Todo::
  const loadFetch = (): void => {
    console.log('Under development');
  };

  // useEffect(() => {
  //   setIsLoadingLoad(isLoading);
  // }, [cities, isLoading]);

  return (
    <div className={styles.wrapper}>
      <div>{isLoading ? <Loader /> : <City cities={cities} loadFetch={loadFetch} />}</div>
    </div>
  );
};

export default Cities;
