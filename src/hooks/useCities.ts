import { useContext, useEffect, useState } from 'react';
import { IListCities } from 'types';
import { getCities } from 'api';
import { GeoContext, setCitiesAction } from 'store/geodb';

export const useCities = (): readonly [IListCities, boolean] => {
  const [cities, setCities] = useState<IListCities>({} as IListCities);
  const [isLoading, setIsLoading] = useState(true);

  const { state, dispatch } = useContext(GeoContext);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCities();
      console.log(result);
      if (!cleanup) {
        dispatch(setCitiesAction(result));
        setIsLoading(false);
      }
    };

    fetchData().catch(console.error);

    return () => {
      cleanup = true;
    };
  }, []);

  useEffect(() => {
    setCities(state.cities);
  }, [state.cities]);

  return [cities, isLoading] as const;
};
