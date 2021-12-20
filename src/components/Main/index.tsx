import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Page } from 'common/constants';
import Home from 'components/Home';
import Countries from 'components/Countries';
import CountryDetails from 'components/Countries/CountryDetails';
import Cities from 'components/Cities';
import CityDetails from 'components/Cities/CityDetails';
import styles from './index.module.css';

const Main = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <Routes>
          <Route path={Page.HOME} element={<Home />} />
          <Route path={Page.COUNTRIES} element={<Countries />} />
          <Route path={`${Page.COUNTRIES}/:id`} element={<CountryDetails />} />
          <Route path={Page.CITIES} element={<Cities />} />
          <Route path={`${Page.CITIES}/:id`} element={<CityDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
