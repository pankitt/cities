import { useEffect, useState } from 'react';
import { ICountry } from 'types';
import { getCountries } from 'api';

export const useCountries = (): readonly [ICountry[], boolean] => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCountries();
      if (!cleanup) {
        setIsLoading(false);
        setCountries(result.data);
      }
    };

    fetchData().catch(console.error);

    return () => {
      cleanup = true;
    };
  }, []);

  return [countries, isLoading] as const;
};
