import { IListCountries, IListCities, IListRegions } from 'types';
import { Types, CountriesActionType, CitiesActionType, RegionsActionType } from './types';

export const setCountriesAction = (payload: IListCountries): CountriesActionType => ({
  type: Types.FETCH_COUNTRIES,
  payload
});

export const setRegionsAction = (payload: IListRegions): RegionsActionType => ({
  type: Types.FETCH_REGIONS,
  payload
});

export const setCitiesAction = (payload: IListCities): CitiesActionType => ({
  type: Types.FETCH_CITIES,
  payload
});
