import { useForm, SubmitHandler } from 'react-hook-form';
import { Countries } from 'utils/types';

export enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

export interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: GenderEnum;
  country: Countries;
  acceptTerms: boolean;
  picture: File;
}

export default function HookForm() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    console.log('file img' + returnFileSize(data.picture.size));
  };
  function returnFileSize(number: number) {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register('name')} />
      <label>Age:</label>
      <input {...register('age')} />
      <label>Email:</label>
      <input {...register('email')} />
      <label>Password:</label>
      <input {...register('password')} />
      <label>Confirm password:</label>
      <input {...register('password')} />
      <label>Gender Selection</label>
      <select {...register('gender')}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="checkbox" id="acceptTerms" {...register('acceptTerms')} />
      <label htmlFor="acceptTerms">Accept terms and conditions</label>
      <label htmlFor="picture">Choose image to upload (PNG, JPG)</label>
      <input
        type="file"
        id="picture"
        {...register('picture')}
        accept="image/png, image/jpeg, image/jpg"
      />
      <input type="submit" />
    </form>
  );
}
