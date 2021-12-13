import { useEffect, useState } from 'react';
import { ICountry, IMetaData } from 'types';
import { getCountries } from 'api';

export const useCountries = (): readonly [ICountry[], IMetaData, boolean] => {
  const [countriesList, setCountriesList] = useState<ICountry[]>([]);
  const [metaData, setMetaData] = useState<IMetaData>({} as IMetaData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCountries();
      if (!cleanup) {
        setIsLoading(false);
        setCountriesList(result.data);
        setMetaData(result.metadata);
      }
    };

    fetchData().catch(console.error);

    return () => {
      cleanup = true;
    };
  }, []);

  return [countriesList, metaData, isLoading] as const;
};
