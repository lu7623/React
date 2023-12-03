import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IData } from '../../utils/types';

export interface FormData {
  data: IData | null;
}

export const formDataSlice = createSlice({
  name: 'formData',
  initialState: [] as IData[],
  reducers: {
    newData(state, action: PayloadAction<IData>) {
      state.push(action.payload);
    },
  },
});

export default formDataSlice.reducer;
