import { IListCountries, IListCities, IListRegions } from 'types';

export enum Types {
  FETCH_COUNTRIES = 'FETCH_COUNTRIES',
  FETCH_REGIONS = 'FETCH_REGIONS',
  FETCH_CITIES = 'FETCH_CITIES'
}

export type InitialStateType = {
  countries: IListCountries;
  regions: IListRegions;
  cities: IListCities;
};

export type CountriesActionType = {
  type: Types.FETCH_COUNTRIES;
  payload: IListCountries;
};
export type RegionsActionType = {
  type: Types.FETCH_REGIONS;
  payload: IListRegions;
};
export type CitiesActionType = {
  type: Types.FETCH_CITIES;
  payload: IListCities;
};

export type Actions = CountriesActionType | RegionsActionType | CitiesActionType;
