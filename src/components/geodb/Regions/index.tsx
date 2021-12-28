import React, { FC, useState, useEffect } from 'react';
import { ISearchData } from 'types';
import { useRegions } from 'hooks';
import Region from 'components/geodb/Regions/Region';
import Search from 'common/Search';
import { Loader } from 'common';
import styles from 'components/geodb/index.module.css';

interface Props {
  code: string;
}

const Regions: FC<Props> = ({ code = '' }) => {
  const [currentState, setCurrentState] = useState({
    detailsCode: '',
    namePrefix: '',
    offset: 0,
    loadMoreCounter: 0
  });
  const [regions, isLoading, isLoadingMore] = useRegions(currentState);

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

  useEffect(() => {
    setCurrentState((prevState) => ({
      ...prevState,
      offset: 0,
      detailsCode: code
    }));
  }, [code]);

  return (
    <div className={styles.wrapperRegions}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Search onSubmit={onSearch} />
          <Region regions={regions} loadMore={loadMore} isLoadingMore={isLoadingMore} />
        </>
      )}
    </div>
  );
};

export default Regions;
