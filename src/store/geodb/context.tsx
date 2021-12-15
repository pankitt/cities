import React, { useReducer, createContext, FC, Dispatch } from 'react';
import { initialState, reducer } from './reducers';
import { InitialStateType, Actions } from './types';

export const GeoContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

export const GeoProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GeoContext.Provider value={{ state, dispatch }}>{children}</GeoContext.Provider>;
};
