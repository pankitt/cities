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
