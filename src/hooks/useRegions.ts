import { useContext, useEffect, useState } from 'react';
import { IListRegions, IGeoParamsHook } from 'types';
import { getRegions } from 'api';
import { GeoContext, setRegionsAction } from 'store/geodb';

export const useRegions = ({
  limit,
  offset,
  languageCode,
  namePrefix,
  detailsCode,
  loadMoreCounter
}: IGeoParamsHook): readonly [IListRegions, boolean, boolean] => {
  const [regions, setRegions] = useState<IListRegions>({} as IListRegions);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { state, dispatch } = useContext(GeoContext);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      setIsLoadingMore(true);
      const result = await getRegions({
        limit,
        offset,
        languageCode,
        namePrefix,
        detailsCode
      });
      if (!cleanup) {
        dispatch(setRegionsAction(result));
      }
    };

    const timeoutId = setTimeout(() => {
      if (detailsCode) {
        fetchData()
          .then(() => setIsLoading(false))
          .then(() => setIsLoadingMore(false))
          .catch(console.error);
      }
    }, 1000);

    return () => {
      cleanup = true;
      clearTimeout(timeoutId);
    };
  }, [limit, offset, languageCode, namePrefix, detailsCode, loadMoreCounter]);

  useEffect(() => {
    setRegions(state.regions);
  }, [state.regions]);

  return [regions, isLoading, isLoadingMore] as const;
};
