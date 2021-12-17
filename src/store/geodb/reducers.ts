import { Types } from './types';
import { InitialStateType, Actions } from './types';

export const initialState: InitialStateType = {
  countries: {
    data: [],
    links: [],
    metadata: {
      currentOffset: 0,
      totalCount: 0
    }
  },
  cities: {
    data: [],
    links: [],
    metadata: {
      currentOffset: 0,
      totalCount: 0
    }
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
        countries: {
          ...payload,
          data: [...state.countries.data, ...payload.data]
        }
      };
    case Types.FETCH_CITIES:
      return <InitialStateType>{
        ...state,
        cities: {
          ...payload,
          data: [...state.cities.data, ...payload.data]
        }
      };
    default:
      return state;
  }
};
