export interface ICountry {
  code: string;
  currencyCodes: Array<string>;
  name: string;
  wikiDataId: string;
}

export interface ICity {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: number;
  latitude: number;
  longitude: number;
  population: number;
}

export interface ILink {
  href: string;
  rel: 'first' | 'prev' | 'next' | 'last';
}

export type IMetaData = {
  currentOffset: number;
  totalCount: number;
};

export interface IListGeoDB {
  links: Array<ILink>;
  metadata: IMetaData;
  message: string;
}
export interface IListCountries extends IListGeoDB {
  data: Array<ICountry>;
}
export interface IListCities extends IListGeoDB {
  data: Array<ICity>;
}

export interface IGeoParams {
  limit?: number | undefined;
  offset?: number | undefined;
  languageCode?: string;
  detailsCode?: string;
  namePrefix?: string;
}
export interface IGeoParamsApi extends IGeoParams {
  name: string;
}
export interface IGeoParamsHook extends IGeoParams {
  loadMoreCounter: number;
}

export interface ICountryDetails {
  capital: string | null;
  code: string;
  callingCode: string;
  currencyCodes: Array<string>;
  flagImageUri: string;
  name: string;
  numRegions: number;
  wikiDataId: string;
}
export interface ICountryDetailsFetch {
  data: ICountryDetails;
  message?: string;
}

export interface ICityDetails {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  elevationMeters: number;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  distance: null;
  deleted: boolean;
}
export interface ICityDetailsFetch {
  data: ICityDetails;
  message?: string;
}

export type ISearchData = {
  name: string;
};
