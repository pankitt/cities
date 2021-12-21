import { useEffect, useState } from 'react';
import { ICountryDetailsFetch, IGeoParamsHook } from 'types';
import { getCountryDetails } from 'api';

export const useCountryDetails = ({
  languageCode,
  detailsCode,
  loadMoreCounter
}: IGeoParamsHook): readonly [ICountryDetailsFetch, boolean] => {
  const [country, setCountry] = useState<ICountryDetailsFetch>({} as ICountryDetailsFetch);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCountryDetails({
        languageCode,
        detailsCode
      });
      if (!cleanup) {
        setCountry(result);
      }
    };

    fetchData()
      .then(() => setIsLoading(false))
      .catch(console.error);

    return () => {
      cleanup = true;
    };
  }, [languageCode, detailsCode, loadMoreCounter]);

  return [country, isLoading] as const;
};
