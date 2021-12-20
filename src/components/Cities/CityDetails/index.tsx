import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.css';

const CityDetails = (): JSX.Element => {
  const params = useParams();
  const { id = '' } = params;
  return <div className={styles.wrapper}>CityDetails {id}</div>;
};

export default CityDetails;
