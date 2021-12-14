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

export interface Ilink {
  href: string;
  rel: 'first' | 'next' | 'last';
}

export type IMetaData = {
  currentOffset: number;
  totalCount: number;
};

export interface IListGeoDB {
  links: Array<Ilink>;
  metadata: IMetaData;
}

export interface IListCountries extends IListGeoDB {
  data: Array<ICountry>;
}

export interface IListCities extends IListGeoDB {
  message: string;
  data: Array<ICity>;
}
