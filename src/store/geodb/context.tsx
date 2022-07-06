import React, { useReducer, createContext, FC, Dispatch, ReactNode } from 'react';
import { initialState, reducer } from './reducers';
import { InitialStateType, Actions } from './types';

export const GeoContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

interface Props {
  children: ReactNode;
}

export const GeoProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GeoContext.Provider value={{ state, dispatch }}>{children}</GeoContext.Provider>;
};
