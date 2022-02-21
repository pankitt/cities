export const enum Types {
  SET_COUNTRIES = 'SET_COUNTRIES'
}

export type InitialStateType = {
  countries: string;
};

export type CountriesActionFilterType = {
  type: Types.SET_COUNTRIES;
  payload: string;
};

export type Actions = CountriesActionFilterType;
