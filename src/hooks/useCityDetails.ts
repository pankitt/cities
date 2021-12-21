import { useEffect, useState } from 'react';
import { ICityDetailsFetch, IGeoParamsHook } from 'types';
import { getCityDetails } from 'api';

export const useCityDetails = ({
  languageCode,
  detailsCode,
  loadMoreCounter
}: IGeoParamsHook): readonly [ICityDetailsFetch, boolean] => {
  const [city, setCity] = useState<ICityDetailsFetch>({} as ICityDetailsFetch);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCityDetails({
        languageCode,
        detailsCode
      });
      if (!cleanup) {
        setCity(result);
      }
    };

    fetchData()
      .then(() => setIsLoading(false))
      .catch(console.error);

    return () => {
      cleanup = true;
    };
  }, [languageCode, detailsCode, loadMoreCounter]);

  return [city, isLoading] as const;
};
