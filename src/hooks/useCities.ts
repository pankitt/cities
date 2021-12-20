import { useContext, useEffect, useState } from 'react';
import { IListCities, IGeoSearchParams } from 'types';
import { getCities } from 'api';
import { GeoContext, setCitiesAction } from 'store/geodb';

export const useCities = ({
  limit,
  offset,
  languageCode
}: IGeoSearchParams): readonly [IListCities, boolean] => {
  const [cities, setCities] = useState<IListCities>({} as IListCities);
  const [isLoading, setIsLoading] = useState(true);

  const { state, dispatch } = useContext(GeoContext);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCities({
        limit,
        offset,
        languageCode
      });
      if (!cleanup) {
        dispatch(setCitiesAction(result));
      }
    };

    fetchData()
      .then(() => setIsLoading(false))
      .catch(console.error);

    return () => {
      cleanup = true;
    };
  }, [limit, offset, languageCode]);

  useEffect(() => {
    setCities(state.cities);
  }, [state.cities]);

  return [cities, isLoading] as const;
};
