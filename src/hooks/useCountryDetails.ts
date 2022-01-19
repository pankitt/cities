import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
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

    const loadData = debounce(
      () =>
        fetchData()
          .then(() => setIsLoading(false))
          .catch(console.error),
      1000
    );
    loadData();

    return () => {
      cleanup = true;
      loadData.cancel();
    };
  }, [languageCode, detailsCode, loadMoreCounter]);

  return [country, isLoading] as const;
};
