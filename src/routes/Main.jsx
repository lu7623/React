import { Link } from 'react-router-dom';
import SelectCountry from '../components/SelectCountry'

export default function Main() {
  return (
    <>
      <h1>Main</h1>
      <Link to="/uncontrolled/">To Uncontrolled form</Link>
      <Link to="/hook-form/">To React Hook form</Link>
      <SelectCountry/>
    </>
  );
}
