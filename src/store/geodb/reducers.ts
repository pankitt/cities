import { Types } from './types';
import { InitialStateType, Actions } from './types';

const data = {
  data: [],
  links: [],
  metadata: {
    currentOffset: 0,
    totalCount: 0
  },
  message: ''
};

export const initialState: InitialStateType = {
  countries: data,
  regions: data,
  cities: data
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
        regions: data,
        countries: payload?.data
          ? {
              ...payload,
              data: payload.metadata.currentOffset
                ? [...state.countries.data, ...payload.data]
                : payload.data,
              message: ''
            }
          : {
              ...state.countries,
              message: payload.message
            }
      };
    case Types.FETCH_REGIONS:
      return <InitialStateType>{
        ...state,
        regions: payload?.data
          ? {
              ...payload,
              data: payload.metadata.currentOffset
                ? [...state.regions.data, ...payload.data]
                : payload.data,
              message: ''
            }
          : {
              ...state.regions,
              message: payload.message
            }
      };
    case Types.FETCH_CITIES:
      return <InitialStateType>{
        ...state,
        cities: payload?.data
          ? {
              ...payload,
              data: payload.metadata.currentOffset
                ? [...state.cities.data, ...payload.data]
                : payload.data,
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
