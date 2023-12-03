import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../utils/validationSchema';
import { IFormInput } from '../utils/types';
import { useAppDispatch } from '../redux/hooks';
import { formDataSlice } from '../redux/reducers/formDataSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { countriesArr } from '../utils/countries';
import { convertBase64 } from '../utils/filesize';

export const getStrength = (n: number) => {
  if (n < 4) return <span className=" text-red-600 font-bold">weak</span>;
  else if (n < 8)
    return <span className=" text-yellow-600 font-bold">medium</span>;
  else return <span className=" text-green-600 font-bold">strong</span>;
};

export default function HookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>();
  const [countryInput, setCountryInput] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { newData } = formDataSlice.actions;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const fileStr = data.file
      ? ((await convertBase64(data.file[0])) as string)
      : '';
    const formData = Object.assign(
      {},
      {
        name: data.name,
        age: data.age,
        password: data.password,
        accept: data.accept,
        confirm: data.confirm,
        country: data.country,
        email: data.email,
        gender: data.gender,
        file: fileStr,
      }
    );
    dispatch(newData(formData));
    setTimeout(() => navigate('/'), 1000);
  };
  const searchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCountrySearch = e.target.value;
    setCountryInput(newCountrySearch);
    setCountrySuggestions(
      countriesArr.filter((c) =>
        c.toLowerCase().startsWith(newCountrySearch.trim().toLowerCase())
      )
    );
  };
  return (
    <>
      <div className="flex justify-center items-center flex-col w-screen">
        <h2 className=" text-2xl mb-5">React hook form</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-1/3 gap-6 mb-10"
        >
          <div className="w-full">
            <label className="mr-4">Name:</label>
            <input {...register('name')} className=" bg-slate-200 w-full" />
            {errors.name && (
              <p className=" text-red-700 text-xs">{errors.name.message}</p>
            )}
          </div>
          <div className=" w-full">
            <label>Age:</label>
            <input {...register('age')} className=" bg-slate-200 w-full" />
            {errors.age && (
              <p className=" text-red-700 text-xs">{errors.age.message}</p>
            )}
          </div>
          <div className=" w-full">
            <label className="mr-4">Email:</label>
            <input {...register('email')} className=" bg-slate-200 w-full" />
            {errors.email && (
              <p className=" text-red-700 text-xs">{errors.email.message}</p>
            )}
          </div>
          <div className=" w-full">
            <label className="mr-4">Password:</label>
            <input
              {...register('password')}
              onBlur={(e) => setPasswordStrength(e.target.value.length)}
              className=" bg-slate-200 w-full"
            />
            {errors.password && (
              <p className=" text-red-700 text-xs">{errors.password.message}</p>
            )}
          </div>
          {passwordStrength > 0 && (
            <p>Password strength: {getStrength(passwordStrength)}</p>
          )}
          <div className="w-full">
            <label className="mr-4">Confirm password:</label>
            <input {...register('confirm')} className=" bg-slate-200 w-full" />
            {errors.confirm && (
              <p className=" text-red-700 text-xs">{errors.confirm.message}</p>
            )}
          </div>
          <div className="w-full">
            <label className="mr-4">Gender Selection</label>
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
          </div>
          <div className="w-full">
            <label className="mr-4">Select country:</label>
            <input
              {...register('country')}
              className=" bg-slate-200 w-full"
              onChange={searchCountry}
              value={countryInput}
            />
            <ul>
              {countrySuggestions?.map((c) => (
                <li
                  className=" w-full bg-slate-200 hover:bg-slate-50 cursor-pointer"
                  key={c}
                  onClick={() => {
                    setCountryInput(c);
                    setCountrySuggestions([]);
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
            {errors.country && (
              <p className=" text-red-700 text-xs">{errors.country.message}</p>
            )}
          </div>
          <div>
            <label className="text-white " htmlFor="file">
              Load file:
            </label>
            <input
              type="file"
              id="file"
              accept=".png, .jpeg"
              {...register('file')}
            />

            <p>{errors.file?.message}</p>
          </div>
          <div className="w-full ">
            <div className="flex">
              <input type="checkbox" id="acceptTerms" {...register('accept')} />
              <label htmlFor="acceptTerms" className="ml-4">
                Accept terms and conditions
              </label>
            </div>
            {errors.accept && (
              <p className=" text-red-700 text-xs w-full">
                {errors.accept.message}
              </p>
            )}
          </div>
          <div className=" w-full flex justify-center">
            <input
              type="submit"
              className=" disabled:bg-gray-500 bg-slate-700 text-white w-32 rounded-md px-4 py-2"
              value="Submit"
            />
          </div>
        </form>
        <Link to="/">Go back</Link>
      </div>
    </>
  );
}
