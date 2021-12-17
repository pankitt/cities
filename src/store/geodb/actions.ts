import { IListCountries, IListCities } from 'types';
import { Types, CountriesActionType, CitiesActionType } from './types';

export const setCountriesAction = (payload: IListCountries): CountriesActionType => ({
  type: Types.FETCH_COUNTRIES,
  payload
});

export const setCitiesAction = (payload: IListCities): CitiesActionType => ({
  type: Types.FETCH_CITIES,
  payload
});
