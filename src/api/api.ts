import { IListCountries, IListCities, IGeoSearchParams } from 'types';

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

const makeGeoParams = ({ name = '', limit = 10, offset = 0, languageCode = 'en' }) => {
  const formData = {
    limit: limit.toString(),
    offset: offset.toString(),
    languageCode
  };
  const formattedData = new URLSearchParams(formData).toString();
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/${name}?${formattedData}`;

  return makeRequest(url, 'get');
};

export const getCountries = ({
  limit,
  offset,
  languageCode
}: IGeoSearchParams): Promise<IListCountries> =>
  makeGeoParams({ name: 'countries', limit, offset, languageCode });
export const getCities = ({
  limit,
  offset,
  languageCode
}: IGeoSearchParams): Promise<IListCities> =>
  makeGeoParams({ name: 'cities', limit, offset, languageCode });