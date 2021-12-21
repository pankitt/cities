import { useEffect, useState } from 'react';
import { ICityDetails, IGeoParams } from 'types';
import { getCityDetails } from 'api';

export const useCityDetails = ({
  languageCode,
  detailsCode
}: IGeoParams): readonly [ICityDetails, boolean] => {
  const [city, setCity] = useState<ICityDetails>({} as ICityDetails);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCityDetails({
        languageCode,
        detailsCode
      });
      if (!cleanup) {
        setCity(result.data);
      }
    };

    fetchData()
      .then(() => setIsLoading(false))
      .catch(console.error);

    return () => {
      cleanup = true;
    };
  }, [languageCode]);

  return [city, isLoading] as const;
};
