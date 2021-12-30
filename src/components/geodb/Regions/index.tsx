import React, { FC, useState, useEffect, useContext } from 'react';
import { ISearchData } from 'types';
import { I18nContext } from 'store/i18n';
import { useRegions } from 'hooks';
import Region from 'components/geodb/Regions/Region';
import Search from 'common/Search';
import { Loader } from 'common';
import styles from 'components/geodb/index.module.css';

interface Props {
  code: string;
}

const Regions: FC<Props> = ({ code = '' }) => {
  const { state: i18n } = useContext(I18nContext);
  const { language } = i18n;

  const [currentState, setCurrentState] = useState({
    detailsCode: '',
    namePrefix: '',
    offset: 0,
    loadMoreCounter: 0,
    languageCode: language
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
      detailsCode: code,
      languageCode: language
    }));
  }, [code, language]);

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
