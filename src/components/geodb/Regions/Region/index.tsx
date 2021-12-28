import React, { FC } from 'react';
import { IListRegions } from 'types';
import { geoSearchParams } from 'common/utils';
import { Button, Loader } from 'common';
import styles from 'components/geodb/index.module.css';

interface Props {
  regions: IListRegions;
  loadMore: (offsetCurrent: number) => void;
  isLoadingMore: boolean;
}

const Region: FC<Props> = ({ regions = {}, loadMore, isLoadingMore }) => {
  const { data = [], links = [], metadata, message = '' } = regions;
  const { offsetCurrent, offsetLast } = geoSearchParams(links);
  const lastElement = offsetLast <= offsetCurrent;
  const isShowButton = (lastElement && message.length > 0) || !lastElement;

  return (
    <div>
      <h3 className={styles.titleRegion}>Regions</h3>
      <div className={styles.itemsList}>
        {data.map(({ wikiDataId, name }, index: number) => (
          <div key={wikiDataId} className={styles.itemRegion}>
            <span className={styles.index}>{++index}.</span> {name}
          </div>
        ))}
      </div>
      {isLoadingMore && <Loader />}
      <div className={styles.listInfo}>
        {offsetLast > 0 && (
          <div className={styles.total}>
            <span className={styles.quantity}>Quantity:</span>
            <b>{!lastElement ? offsetCurrent : metadata?.totalCount}</b>/{metadata?.totalCount}
          </div>
        )}
        {isShowButton && (
          <div>
            <Button disabled={isLoadingMore} onClick={() => loadMore(offsetCurrent)}>
              {'Load more'}
            </Button>
          </div>
        )}
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default Region;
