import React, { FC } from 'react';
import { IMetaData } from 'types';
import { Button, Loader } from 'common';
import styles from './index.module.css';

interface Props {
  isLoadingMore: boolean;
  offsetLast: number;
  offsetCurrent: number;
  message: string;
  loadMore: (offsetCurrent: number) => void;
  metadata: IMetaData;
}

const LoadingQuantity: FC<Props> = ({
  isLoadingMore,
  offsetLast,
  offsetCurrent,
  message,
  loadMore,
  metadata
}) => {
  const lastElement = offsetLast <= offsetCurrent;
  const isShowButton = (lastElement && message.length > 0) || !lastElement;

  return (
    <>
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
    </>
  );
};

export default LoadingQuantity;
