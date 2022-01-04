import { Types, InitialStateType, Actions } from './types';

export const initialState: InitialStateType = {
  countries: ''
};

export const reducer = (
  state: typeof initialState = initialState,
  action: Actions
): InitialStateType => {
  const { type, payload } = action;

  switch (type) {
    case Types.SET_COUNTRIES:
      return {
        ...state,
        countries: payload
      };
    default:
      return state;
  }
};
