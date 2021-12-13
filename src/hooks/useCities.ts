import { useEffect, useState } from 'react';
import { ICity } from 'types';
import { getCities } from 'api';

export const useCities = (): readonly [ICity[], boolean] => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCities();
      if (!cleanup) {
        setIsLoading(false);
        setCities(result.data);
      }
    };

    fetchData().catch(console.error);

    return () => {
      cleanup = true;
    };
  }, []);

  return [cities, isLoading] as const;
};
