import { IListCountries, IListCities } from 'types';

export enum Types {
  FETCH_COUNTRIES = 'FETCH_COUNTRIES',
  FETCH_CITIES = 'FETCH_CITIES'
}

export type InitialStateType = {
  countries: IListCountries;
  cities: IListCities;
};

export type CountriesActionType = {
  type: Types.FETCH_COUNTRIES;
  payload: IListCountries;
};

export type CitiesActionType = {
  type: Types.FETCH_CITIES;
  payload: IListCities;
};

export type Actions = CountriesActionType | CitiesActionType;
