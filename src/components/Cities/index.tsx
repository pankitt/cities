import React from 'react';
import City from 'components/Cities/City';
import { useCities } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const Cities = (): JSX.Element => {
  const [cities, isLoading] = useCities();

  // Todo::
  const loadMore = (): void => undefined;

  // useEffect(() => {
  //   setIsLoadingLoad(isLoading);
  // }, [cities, isLoading]);

  return (
    <div className={styles.wrapper}>
      <div>{isLoading ? <Loader /> : <City cities={cities} loadMore={loadMore} />}</div>
    </div>
  );
};

export default Cities;
