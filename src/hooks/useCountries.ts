import { useContext, useEffect, useState } from 'react';
import { IListCountries } from 'types';
import { getCountries } from 'api';
import { GeoContext, setCountriesAction } from 'store/geodb';

export const useCountries = (
  limit?: number,
  offset?: number,
  languageCode?: string
): readonly [IListCountries, boolean] => {
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
        setIsLoading(false);
      }
    };

    fetchData().catch(console.error);

    return () => {
      cleanup = true;
    };
  }, []);

  useEffect(() => {
    setCountries(state.countries);
  }, [state.countries]);

  return [countries, isLoading] as const;
};
