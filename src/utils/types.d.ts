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
  country: string;
  file?: FileList;
  accept: NonNullable<boolean | undefined>;
}

export interface IData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: string;
  country: string;
  file: string;
  accept: NonNullable<boolean | undefined>;
}
