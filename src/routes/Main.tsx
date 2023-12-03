import { Link } from 'react-router-dom';
import SelectCountry from '../components/SelectCountry';
import { useAppSelector } from '../redux/hooks';

export default function Main() {
  const data = useAppSelector((state) => state.formDataReducer);
  return (
    <>
      <div className="flex">
        {data.map((d, i) => {
          return (
            <div
              key={d.name}
              style={
                i === data.length - 1
                  ? { border: '2px solid green' }
                  : { border: 'none' }
              }
              className=" bg-slate-200 m-4 rounded-sm p-2 "
            >
              <p>Name: {d.name}</p>
              <p>Age: {d.age}</p>
              <p>Email: {d.email}</p>
              <p>Password: {d.password}</p>
              <p>Gender: {d.gender}</p>
            </div>
          );
        })}
      </div>
      <h1>Main</h1>
      <Link to="/uncontrolled/">To Uncontrolled form</Link>
      <Link to="/hook-form/">To React Hook form</Link>
      <SelectCountry />
    </>
  );
}
