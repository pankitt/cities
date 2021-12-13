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

export const getCountries = () => makeRequest('/v1/geo/countries?limit=10', 'get');
export const getCities = () => makeRequest('/v1/geo/cities?limit=10', 'get');
