import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styles from './index.module.css';

const Loader = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <AiOutlineLoading3Quarters className={styles.icon} />
    </div>
  );
};

export default Loader;
