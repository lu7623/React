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
  gender: string;
  //country: string;
  accept: NonNullable<boolean | undefined>;
}

export const countriesArr = CountriesList.split(/\r?\n/);

export enum Countries {
  countriesArr,
}
