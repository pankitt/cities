import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from 'common/constants';
import styles from './index.module.css';

const Header = (): JSX.Element => (
  <div className={styles.wrapper}>
    <div className={styles.inner}>
      <nav className={styles.nav}>
        <Link to={Page.HOME} className={styles.link}>
          Home
        </Link>
        <Link to={Page.COUNTRIES} className={styles.link}>
          Countries
        </Link>
        <Link to={Page.CITIES} className={styles.link}>
          Cities
        </Link>
      </nav>
      <div className={styles.settings}>settings</div>
    </div>
  </div>
);

export default Header;
