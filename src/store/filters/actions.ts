import { Types, CountriesActionFilterType } from './types';

export const setCountriesFilterAction = (payload: string): CountriesActionFilterType => ({
  type: Types.SET_COUNTRIES,
  payload
});
