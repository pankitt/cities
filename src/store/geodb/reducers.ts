import { Types } from './types';
import { InitialStateType, Actions } from './types';

export const initialState: InitialStateType = {
  countries: {
    data: [],
    links: [],
    metadata: {
      currentOffset: 0,
      totalCount: 0
    },
    message: ''
  },
  cities: {
    data: [],
    links: [],
    metadata: {
      currentOffset: 0,
      totalCount: 0
    },
    message: ''
  }
};

export const reducer = (
  state: typeof initialState = initialState,
  action: Actions
): InitialStateType => {
  const { type, payload } = action;

  switch (type) {
    case Types.FETCH_COUNTRIES:
      return <InitialStateType>{
        ...state,
        countries: payload?.data
          ? {
              ...payload,
              data: [...state.countries.data, ...payload.data],
              message: ''
            }
          : {
              ...state.countries,
              message: payload.message
            }
      };
    case Types.FETCH_CITIES:
      return <InitialStateType>{
        ...state,
        cities: payload?.data
          ? {
              ...payload,
              data: [...state.cities.data, ...payload.data],
              message: ''
            }
          : {
              ...state.cities,
              message: payload.message
            }
      };
    default:
      return state;
  }
};
