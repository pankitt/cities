import React, { useReducer, createContext, FC, Dispatch, ReactNode } from 'react';
import { initialState, reducer } from './reducers';
import { InitialStateType, Actions } from './types';

export const FiltersContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

interface Props {
  children: ReactNode;
}

export const FiltersProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <FiltersContext.Provider value={{ state, dispatch }}>{children}</FiltersContext.Provider>;
};
