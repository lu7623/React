import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: string;
  //country: string;
  accept: NonNullable<boolean | undefined>;
}

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your name')
    .uppercase('Name should be uppercase'),
  age: yup
    .number()
    .positive('Age is not valid')
    .integer('Age is not valid')
    .required('Please enter your age'),
  email: yup
    .string()
    .email('E-mail is not valid')
    .required('Please enter your email'),
  password: yup
    .string()
    .required()
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('special charcter'))
    .matches(/[\W|_/g]/, getCharacterValidationError('special caracter')),
  confirm: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  gender: yup
    .string()
    .required('Please select your gender')
    .oneOf(['male', 'female', 'other']),
  // country: yup.string().oneOf(countriesArr).required('Please select your country'),
  accept: yup
    .bool()
    .required('You have to accept terms and conditions to coninue')
    .oneOf([true], 'You must accept the terms and conditions'),
});

export default function HookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log({ data });
  };

  return (
    <>
      {' '}
      <div className="flex justify-center items-center flex-col w-screen">
        <h2 className=" text-2xl">React hook form</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label>Name:</label>
          <input {...register('name')} className=" bg-slate-200" />
          {errors.name && (
            <p className=" text-red-700 text-xs">{errors.name.message}</p>
          )}

          <label>Age:</label>
          <input {...register('age')} className=" bg-slate-200" />
          {errors.age && (
            <p className=" text-red-700 text-xs">{errors.age.message}</p>
          )}

          <label>Email:</label>
          <input {...register('email')} className=" bg-slate-200" />
          {errors.email && (
            <p className=" text-red-700 text-xs">{errors.email.message}</p>
          )}

          <label>Password:</label>
          <input {...register('password')} className=" bg-slate-200" />
          {errors.password && (
            <p className=" text-red-700 text-xs">{errors.password.message}</p>
          )}

          <label>Confirm password:</label>
          <input {...register('confirm')} className=" bg-slate-200" />
          {errors.confirm && (
            <p className=" text-red-700 text-xs">{errors.confirm.message}</p>
          )}

          <label>Gender Selection</label>
          <select {...register('gender')}>
            <option value="female" className=" bg-slate-200">
              female
            </option>
            <option value="male" className=" bg-slate-200">
              male
            </option>
            <option value="other" className=" bg-slate-200">
              other
            </option>
          </select>
          {errors.gender && (
            <p className=" text-red-700 text-xs">{errors.gender.message}</p>
          )}

          <div className="flex">
            <label htmlFor="acceptTerms">Accept terms and conditions</label>
            <input type="checkbox" id="acceptTerms" {...register('accept')} />
            {errors.accept && (
              <p className=" text-red-700 text-xs">{errors.accept.message}</p>
            )}
          </div>

          <input
            type="submit"
            className=" disabled:bg-gray-500 bg-green-900 text-white"
            value="Submit"
          />
        </form>
      </div>
    </>
  );
}
