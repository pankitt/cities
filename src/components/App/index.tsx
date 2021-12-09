import React from 'react';
import Navigation from 'components/Navigation';
import Header from 'components/Header';
import Main from 'components/Main';
import styles from './index.module.css';

const App = (): JSX.Element => (
  <div className={styles.wrapper}>
    <Navigation />
    <Header />
    <Main />
  </div>
);

export default App;
