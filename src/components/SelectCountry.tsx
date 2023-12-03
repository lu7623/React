import { HiSearch } from 'react-icons/hi';
import useAutoComplete from '../utils/autocomplete';
import { CountryOptions } from '../utils/types';
import { useAppSelector } from '../redux/hooks';

export default function SelectCountry() {
  const { allCountries } = useAppSelector((state) => state.countriesReducer);
  const Options: CountryOptions[] = allCountries.split(/\r?\n/).map((p, i) => {
    return { value: i, label: p };
  });

  const { bindInput, bindOptions, bindOption, suggestions, selectedIndex } =
    useAutoComplete({
      onChange: (value) => console.log(value),
      source: (search) =>
        Options.filter((option) =>
          new RegExp(`^${search}`, 'i').test(option.label)
        ),
    });

  return (
    <div className="p-2 border">
      <div className="flex items-center w-full">
        <HiSearch />
        <input
          placeholder="Search"
          className="flex-grow px-1 outline-none"
          {...bindInput}
        />
      </div>
      <ul
        {...bindOptions}
        className="w-[300px] scroll-smooth absolute max-h-[260px] overflow-x-hidden overflow-y-auto"
      >
        {suggestions.map((_: CountryOptions, index: number) => (
          <li
            className={
              `flex items-center h-[40px] p-1 hover:bg-slate-300 ` +
              (selectedIndex === index && 'bg-slate-300')
            }
            key={index}
            {...bindOption}
          >
            <div className="flex items-center space-x-1">
              <div>{suggestions[index].label}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
