import { useRef, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { formDataSlice } from '../redux/reducers/formDataSlice';
import { IFormInput } from '../utils/types';
import { schema } from '../utils/validationSchema';
import { ValidationError } from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { countriesArr } from '../utils/countries';
import { getStrength } from './HookForm';

type FormElements = {
  age: HTMLInputElement;
  email: HTMLInputElement;
  gender: HTMLInputElement;
  name: HTMLInputElement;
  password: HTMLInputElement;
  confirm: HTMLInputElement;
  accept: HTMLInputElement;
  country: HTMLInputElement;
};

export default function Uncontrolled() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);
  const { newData } = formDataSlice.actions;
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validErrs, setValidErrs] = useState<string[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElements = e.target as unknown as FormElements;
    const formData: IFormInput = {
      age: Number(formElements.age.value),
      email: formElements.email.value,
      gender: formElements.gender.value,
      name: formElements.name.value,
      password: formElements.password.value,
      confirm: formElements.confirm.value,
      country: formElements.country.value,
      accept: formElements.accept.checked,
    };
    let result;
    try {
      result = schema.validateSync(formData, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        error.errors.forEach((x) => console.log(x));
        setValidErrs(error.errors);
      }
    }
    if (result) {
      dispatch(newData(formData));
      setTimeout(() => navigate('/'), 1000);
    }
  };
  const searchCountry = () => {
    setCountrySuggestions(
      countriesArr.filter((c) =>
        c
          .toLowerCase()
          .startsWith(ref.current ? ref.current.value.trim().toLowerCase() : '')
      )
    );
  };
  return (
    <div className="flex justify-center items-center flex-col w-screen">
      <h2 className=" text-2xl mb-5">Uncontrolled component</h2>

      <form onSubmit={handleSubmit} className="flex flex-col w-1/3 gap-6 mb-10">
        <div className=" w-full">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className=" bg-slate-200 w-full"
          />
          {validErrs.find((x) => x.includes('name')) && (
            <p className=" text-red-700 text-xs">
              {validErrs.find((x) => x.includes('name'))}
            </p>
          )}
        </div>
        <div className=" w-full">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            name="age"
            id="age"
            className=" bg-slate-200 w-full"
          />
          {validErrs.find((x) => x.includes('age')) && (
            <p className=" text-red-700 text-xs">
              {validErrs.find((x) => x.includes('age'))}
            </p>
          )}
        </div>{' '}
        <div className=" w-full">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            className=" bg-slate-200 w-full"
          />
          {validErrs.find((x) => x.includes('email')) && (
            <p className=" text-red-700 text-xs">
              {validErrs.find((x) => x.includes('email'))}
            </p>
          )}
        </div>
        <div className=" w-full">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            className=" bg-slate-200 w-full"
            onBlur={(e) => setPasswordStrength(e.target.value.length)}
          />
          {validErrs.find((x) => x.includes('password')) && (
            <p className=" text-red-700 text-xs">
              {validErrs.find((x) => x.includes('password'))}
            </p>
          )}
        </div>
        {passwordStrength > 0 && (
          <p>Password strength: {getStrength(passwordStrength)}</p>
        )}
        <div className=" w-full">
          <label htmlFor="confirm">Confirm password:</label>
          <input
            type="text"
            id="confirm"
            name="confirm"
            className=" bg-slate-200 w-full"
          />
          {validErrs.find((x) => x.includes('confirm')) && (
            <p className=" text-red-700 text-xs">
              {validErrs.find((x) => x.includes('confirm'))}
            </p>
          )}
        </div>
        <div className=" w-full">
          <label htmlFor="gender" className="mr-4">
            Gender Selection
          </label>
          <select id="gender">
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
          {validErrs.find((x) => x.includes('gender')) && (
            <p className=" text-red-700 text-xs">
              {validErrs.find((x) => x.includes('gender'))}
            </p>
          )}
        </div>
        <div className="w-full">
          <label className="mr-4">Select country:</label>
          <input
            ref={ref}
            className=" bg-slate-200 w-full"
            onChange={searchCountry}
            name="country"
          />
          <ul>
            {countrySuggestions?.map((c) => (
              <li
                className=" w-full bg-slate-200 hover:bg-slate-50 cursor-pointer"
                key={c}
                onClick={() => {
                  if (!ref.current) throw Error('ref is not assigned');
                  ref.current.value = c;
                  setCountrySuggestions([]);
                }}
              >
                {c}
              </li>
            ))}
          </ul>
          {validErrs.find((x) => x.includes('country')) && (
            <p className=" text-red-700 text-xs">
              {validErrs.find((x) => x.includes('country'))}
            </p>
          )}
        </div>
        <div className=" w-full">
          <div className="flex">
            <input
              type="checkbox"
              id="accept"
              name="accept"
              className=" mr-5"
            />
            <label htmlFor="accept">Accept terms and conditions</label>
          </div>
          {validErrs.find((x) => x.includes('accept')) && (
            <p className=" text-red-700 text-xs">
              {validErrs.find((x) => x.includes('accept'))}
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
  );
}
