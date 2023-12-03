import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormInput } from '../../utils/types';

export interface FormData {
  data: IFormInput | null;
}

export const formDataSlice = createSlice({
  name: 'formData',
  initialState: [] as IFormInput[],
  reducers: {
    newData(state, action: PayloadAction<IFormInput>) {
      state.push(action.payload);
    },
  },
});

export default formDataSlice.reducer;
