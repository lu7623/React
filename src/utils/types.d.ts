import { CountriesList } from './countries';

export enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}
export type CountryOptions = {
  value: number;
  label: string;
};

export interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: GenderEnum;
  country: Countries;
  accept: boolean;
}

export const countriesArr = CountriesList.split(/\r?\n/);

export enum Countries {
  countriesArr,
}
