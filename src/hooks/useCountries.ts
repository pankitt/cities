import { useContext, useEffect, useState } from 'react';
import { IListCountries, IGeoSearchParams } from 'types';
import { getCountries } from 'api';
import { GeoContext, setCountriesAction } from 'store/geodb';

export const useCountries = ({
  limit,
  offset,
  languageCode,
  loadMoreCounter
}: IGeoSearchParams): readonly [IListCountries, boolean] => {
  const [countries, setCountries] = useState<IListCountries>({} as IListCountries);
  const [isLoading, setIsLoading] = useState(true);

  const { state, dispatch } = useContext(GeoContext);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCountries({
        limit,
        offset,
        languageCode
      });
      if (!cleanup) {
        dispatch(setCountriesAction(result));
      }
    };

    fetchData()
      .then(() => setIsLoading(false))
      .catch(console.error);

    return () => {
      cleanup = true;
    };
  }, [limit, offset, languageCode, loadMoreCounter]);

  useEffect(() => {
    setCountries(state.countries);
  }, [state.countries]);

  return [countries, isLoading] as const;
};
