import { useMemo } from 'react';
// TODO:
const applyMiddleware = (dispatch: any) => (action: any) => {
  if (typeof action === 'function') {
    return action(dispatch);
  }

  return dispatch(action);
};

const getActionCreators = (actionCreators: [], dispatch: any) =>
  Object.entries(actionCreators).reduce(
    (memo, [type, action]) => ({
      ...memo,
      [type]:
        typeof action === 'function'
          ? dispatch(action)
          : (payload: any) => dispatch({ type, payload })
    }),
    {}
  );

export const useActions = (types: [], dispatch: any, customActionCreators: []) => {
  const enhancedDispatch = applyMiddleware(dispatch);
  const actionCreators = { ...types, ...(customActionCreators || {}) };

  return useMemo(
    () => getActionCreators(actionCreators, enhancedDispatch),
    [types, customActionCreators]
  );
};
