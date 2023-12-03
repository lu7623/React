import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../utils/validationSchema';
import { IFormInput } from '../utils/types';
import { useAppDispatch } from '../redux/hooks';
import { formDataSlice } from '../redux/reducers/formDataSlice';

export default function HookForm() {
  const dispatch = useAppDispatch();
  const { newData } = formDataSlice.actions;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log({ data });
    dispatch(newData(data));
  };

  return (
    <>
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
