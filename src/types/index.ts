export interface ICountry {
  code: string;
  currencyCodes: Array<string>;
  name: string;
  wikiDataId: string;
}
export type IMetaData = {
  currentOffset: number;
  totalCount: number;
};

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
