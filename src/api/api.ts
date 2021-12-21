import {
  IListCountries,
  IListCities,
  ICountryDetailsFetch,
  ICityDetailsFetch,
  IGeoParams,
  IGeoParamsApi
} from 'types';

const makeRequest = async (url: string, method?: 'get' | 'post', params?: []) => {
  const options = {
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': '22c953082emsha514076bb452b74p1b64aejsn1dfc41e5ca42'
    },
    method,
    body:
      params &&
      JSON.stringify({
        ...params
      })
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    const { error } = json;

    if (error) {
      const { message, code } = error;
      throw new Error(message || code);
    }

    return json;
  } catch (error: any) {
    throw new Error(error);
  }
};

const makeGeoParams = ({ name, detailsCode, ...props }: IGeoParamsApi) => {
  const stringifyPayload = Object.entries(props).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    },
    {}
  );
  const isDetailsCode = detailsCode ? `/${detailsCode}` : '';
  const formattedData = new URLSearchParams(stringifyPayload).toString();
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/${name}${isDetailsCode}?${formattedData}`;

  return makeRequest(url, 'get');
};

export const getCountries = ({
  limit = 10,
  offset = 0,
  languageCode = 'en'
}: IGeoParams): Promise<IListCountries> =>
  makeGeoParams({ name: 'countries', limit, offset, languageCode });

export const getCities = ({
  limit = 10,
  offset = 0,
  languageCode = 'en'
}: IGeoParams): Promise<IListCities> =>
  makeGeoParams({ name: 'cities', limit, offset, languageCode });

export const getCountryDetails = ({
  languageCode = 'en',
  detailsCode = ''
}: IGeoParams): Promise<ICountryDetailsFetch> =>
  makeGeoParams({ name: 'countries', detailsCode, languageCode });

export const getCityDetails = ({
  languageCode = 'en',
  detailsCode = ''
}: IGeoParams): Promise<ICityDetailsFetch> =>
  makeGeoParams({ name: 'cities', detailsCode, languageCode });
