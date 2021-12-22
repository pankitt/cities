import { useContext, useEffect, useState } from 'react';
import { IListCountries, IGeoParamsHook } from 'types';
import { getCountries } from 'api';
import { GeoContext, setCountriesAction } from 'store/geodb';

export const useCountries = ({
  limit,
  offset,
  languageCode,
  namePrefix,
  loadMoreCounter
}: IGeoParamsHook): readonly [IListCountries, boolean, boolean] => {
  const [countries, setCountries] = useState<IListCountries>({} as IListCountries);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { state, dispatch } = useContext(GeoContext);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      setIsLoadingMore(true);
      const result = await getCountries({
        limit,
        offset,
        languageCode,
        namePrefix
      });
      if (!cleanup) {
        dispatch(setCountriesAction(result));
      }
    };

    fetchData()
      .then(() => setIsLoading(false))
      .then(() => setIsLoadingMore(false))
      .catch(console.error);

    return () => {
      cleanup = true;
    };
  }, [limit, offset, languageCode, loadMoreCounter]);

  useEffect(() => {
    setCountries(state.countries);
  }, [state.countries]);

  return [countries, isLoading, isLoadingMore] as const;
};
