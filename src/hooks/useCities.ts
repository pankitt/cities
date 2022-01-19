import { useContext, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { IListCities, IGeoParamsHook } from 'types';
import { getCities } from 'api';
import { GeoContext, setCitiesAction } from 'store/geodb';

export const useCities = ({
  limit,
  offset,
  languageCode,
  namePrefix,
  countryIds,
  loadMoreCounter
}: IGeoParamsHook): readonly [IListCities, boolean, boolean] => {
  const [cities, setCities] = useState<IListCities>({} as IListCities);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { state, dispatch } = useContext(GeoContext);

  useEffect(() => {
    let cleanup = false;
    setIsLoadingMore(true);

    const fetchData = async () => {
      const result = await getCities({
        limit,
        offset,
        languageCode,
        namePrefix,
        countryIds
      });
      if (!cleanup) {
        dispatch(setCitiesAction(result));
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
  }, [limit, offset, languageCode, namePrefix, countryIds, loadMoreCounter, dispatch]);

  useEffect(() => {
    setCities(state.cities);
  }, [state.cities]);

  return [cities, isLoading, isLoadingMore] as const;
};
