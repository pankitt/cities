import React from 'react';
import svgIcon from 'assets/svgIcon';
import styles from './index.module.css';

const Loader = (): JSX.Element => {
  return <div className={styles.wrapper}>{svgIcon.loader}</div>;
};

export default Loader;
