import { useContext, useEffect, useState } from 'react';
import { IListCities, IGeoParamsHook } from 'types';
import { getCities } from 'api';
import { GeoContext, setCitiesAction } from 'store/geodb';

export const useCities = ({
  limit,
  offset,
  languageCode,
  namePrefix,
  loadMoreCounter
}: IGeoParamsHook): readonly [IListCities, boolean, boolean] => {
  const [cities, setCities] = useState<IListCities>({} as IListCities);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { state, dispatch } = useContext(GeoContext);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      setIsLoadingMore(true);
      const result = await getCities({
        limit,
        offset,
        languageCode,
        namePrefix
      });
      if (!cleanup) {
        dispatch(setCitiesAction(result));
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
    setCities(state.cities);
  }, [state.cities]);

  return [cities, isLoading, isLoadingMore] as const;
};
