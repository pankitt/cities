import React, { FC } from 'react';
import { useI18n } from 'hooks';
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
  const { t } = useI18n();

  return (
    <>
      {isLoadingMore && <Loader />}
      <div className={styles.listInfo}>
        {offsetLast > 0 && (
          <div className={styles.total}>
            <span className={styles.quantity}>{t('main.quantity')}:</span>
            <b>{!lastElement ? offsetCurrent : metadata?.totalCount}</b>/{metadata?.totalCount}
          </div>
        )}
        {isShowButton && (
          <div>
            <Button disabled={isLoadingMore} onClick={() => loadMore(offsetCurrent)}>
              {t('main.load')}
            </Button>
          </div>
        )}
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </>
  );
};

export default LoadingQuantity;
