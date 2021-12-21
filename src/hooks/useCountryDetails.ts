import { useEffect, useState } from 'react';
import { ICountryDetails, IGeoParams } from 'types';
import { getCountryDetails } from 'api';

export const useCountryDetails = ({
  languageCode,
  detailsCode
}: IGeoParams): readonly [ICountryDetails, boolean] => {
  const [country, setCountry] = useState<ICountryDetails>({} as ICountryDetails);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cleanup = false;

    const fetchData = async () => {
      const result = await getCountryDetails({
        languageCode,
        detailsCode
      });
      if (!cleanup) {
        setCountry(result.data);
      }
    };

    fetchData()
      .then(() => setIsLoading(false))
      .catch(console.error);

    return () => {
      cleanup = true;
    };
  }, [languageCode]);

  return [country, isLoading] as const;
};
