import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCityDetails } from 'hooks';
import { Loader } from 'common';
import styles from './index.module.css';

const CityDetails = (): JSX.Element => {
  const params = useParams();
  const { id = '' } = params;
  const [currentState, setCurrentState] = useState({
    detailsCode: id,
    loadMoreCounter: 0
  });
  const [city, isLoading] = useCityDetails(currentState);
  // TODO::
  console.log(city);
  return <div className={styles.wrapper}>{isLoading ? <Loader /> : <div>CityDetails</div>}</div>;
};

export default CityDetails;
