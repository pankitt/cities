import React from 'react';
import styles from './index.module.css';

const Header = (): JSX.Element => (
  <div className={styles.wrapper}>
    <nav className={styles.nav}>
      <span className={styles.link}>Countries</span>
      <span className={styles.link}>Cities</span>
    </nav>
    <div className={styles.settings}>settings</div>
  </div>
);

export default Header;
