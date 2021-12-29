import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from 'common/constants';
import svgIcon from 'assets/svgIcon';
import styles from './index.module.css';

const Home = (): JSX.Element => {
  return (
    <div>
      <div className={styles.globe}>{svgIcon.globe}</div>
      <ul className={styles.list}>
        <li>
          <Link to={Page.COUNTRIES} className={styles.link}>
            Countries <span className={styles.number}>(199)</span>
          </Link>
        </li>
        <li>
          <Link to={Page.CITIES} className={styles.link}>
            Cities <span className={styles.number}>(500k+)</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
