import React, { FC } from 'react';
import { useI18n } from 'hooks';
import { IListRegions } from 'types';
import { geoSearchParams } from 'common/utils';
import { LoadingQuantity } from 'components/geodb';
import styles from 'components/geodb/index.module.css';

interface Props {
  regions: IListRegions;
  loadMore: (offsetCurrent: number) => void;
  isLoadingMore: boolean;
}

const Region: FC<Props> = ({ regions, loadMore, isLoadingMore }) => {
  const { data = [], links = [], metadata, message = '' } = regions;
  const { offsetCurrent, offsetLast } = geoSearchParams(links);
  const { t } = useI18n();

  return (
    <div>
      <h3 className={styles.titleRegion}>{t('main.regions')}:</h3>
      <div className={styles.itemsList}>
        {data.map(({ wikiDataId, name }, index: number) => (
          <div key={wikiDataId} className={styles.itemRegion}>
            <span className={styles.index}>{++index}.</span> {name}
          </div>
        ))}
      </div>
      <LoadingQuantity
        isLoadingMore={isLoadingMore}
        offsetCurrent={offsetCurrent}
        offsetLast={offsetLast}
        loadMore={loadMore}
        message={message}
        metadata={metadata}
      />
    </div>
  );
};

export default Region;
