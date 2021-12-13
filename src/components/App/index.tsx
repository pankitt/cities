import React from 'react';
import Header from 'components/Header';
import Main from 'components/Main';
import styles from './index.module.css';

const App = (): JSX.Element => (
  <div className={styles.wrapper}>
    <div className={styles.main}>
      <Header />
      <Main />
    </div>
  </div>
);

export default App;
