import { useContext, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
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
    setIsLoadingMore(true);

    const fetchData = async () => {
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

    const loadData = debounce(
      () =>
        fetchData()
          .then(() => setIsLoading(false))
          .then(() => setIsLoadingMore(false))
          .catch(console.error),
      500
    );
    loadData();

    return () => {
      cleanup = true;
      loadData.cancel();
    };
  }, [limit, offset, languageCode, namePrefix, loadMoreCounter, dispatch]);

  useEffect(() => {
    setCountries(state.countries);
  }, [state.countries]);

  return [countries, isLoading, isLoadingMore] as const;
};
