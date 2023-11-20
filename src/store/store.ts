import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/searchSlice';
import perPageReducer from './reducers/perPageSlice';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  searchReducer,
  perPageReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore);
