import { useEffect, useState } from 'react';
import { ICity, IMetaData } from 'types';
import { getCities } from 'api';

export const useCities = (): readonly [ICity[] | string, IMetaData, boolean] => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [metaData, setMetaData] = useState<IMetaData>({} as IMetaData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCities();
      if (!cleanup) {
        setIsLoading(false);
        setCities(result.data || result.message);
        setMetaData(result.metadata);
      }
    };

    fetchData().catch(console.error);

    return () => {
      cleanup = true;
    };
  }, []);

  return [cities, metaData, isLoading] as const;
};
