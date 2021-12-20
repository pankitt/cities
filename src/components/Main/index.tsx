import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page } from 'common/constants';
import Home from 'components/Home';
import Countries from 'components/Countries';
import Cities from 'components/Cities';
import styles from './index.module.css';

const Main = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Routes>
          <Route path={Page.HOME} element={<Home />} />
          <Route path={Page.COUNTRIES} element={<Countries />} />
          <Route path={Page.CITIES} element={<Cities />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
