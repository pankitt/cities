import React, { useReducer, createContext, FC, Dispatch } from 'react';
import { initialState, reducer } from './reducers';
import { InitialStateType, Actions } from './types';

export const FiltersContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

export const FiltersProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <FiltersContext.Provider value={{ state, dispatch }}>{children}</FiltersContext.Provider>;
};
