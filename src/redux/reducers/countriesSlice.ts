import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CountriesList } from '../../utils/countries';

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    allCountries: CountriesList,
  },
  reducers: {
    newCountries(state, action: PayloadAction<string>) {
      state.allCountries = action.payload;
    },
  },
});

export default countriesSlice.reducer;
