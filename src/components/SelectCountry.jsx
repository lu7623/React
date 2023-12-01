
import { HiSearch, HiUser } from 'react-icons/hi'
import useAutoComplete from '../utils/autocomplete'
import {CountriesList} from '../utils/countries'

const Options =  CountriesList.split(/\r?\n/).map((p, i) => { return { value: i, label: p} })

export default function SelectCountry() {

     const { bindInput, bindOptions,  bindOption, isBusy, suggestions, selectedIndex} = useAutoComplete({
        onChange: value => console.log(value),
        source: (search) => Options.filter(option => new RegExp(`^${search}`, "i").test(option.label))
    })

       return (
        <div className="p-2 border" >
            <div className="flex items-center w-full">
                <HiSearch />
                <input
                    placeholder='Search'
                    className="flex-grow px-1 outline-none"
                    {...bindInput}
                />
                {isBusy && <div className="w-4 h-4 border-2 border-dashed rounded-full border-slate-500 animate-spin"></div>}
            </div>
            <ul {...bindOptions} className="w-[300px] scroll-smooth absolute max-h-[260px] overflow-x-hidden overflow-y-auto" >
                {
                    suggestions.map((_, index) => (
                        <li
                            className={`flex items-center h-[40px] p-1 hover:bg-slate-300 ` + (selectedIndex === index && "bg-slate-300")}
                            key={index}
                            {...bindOption}
                        >
                            <div className="flex items-center space-x-1">
                         
                                <div>{suggestions[index].label}</div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}