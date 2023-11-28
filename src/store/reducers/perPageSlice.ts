import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const perPageSlice = createSlice({
  name: 'limit',
  initialState: {
    qty: '20',
  },
  reducers: {
    newLimit(state, action: PayloadAction<string>) {
      state.qty = action.payload;
    },
  },
});

export default perPageSlice.reducer;
