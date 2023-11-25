import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/searchSlice';
import perPageReducer from './reducers/perPageSlice';
import { createWrapper } from 'next-redux-wrapper';
import { pokemonAPI } from '../api/PokemonApi';

const rootReducer = combineReducers({
  searchReducer,
  perPageReducer,
  [pokemonAPI.reducerPath]: pokemonAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(pokemonAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore);
