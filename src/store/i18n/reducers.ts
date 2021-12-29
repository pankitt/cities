import { Types, InitialStateType, Actions } from './types';
import * as translationsList from './translationsList';

export const initialState: InitialStateType = {
  language: 'en',
  translations: {}
};

export const reducer = (
  state: typeof initialState = initialState,
  action: Actions
): InitialStateType => {
  const { type, payload } = action;

  switch (type) {
    case Types.SET_LANGUAGE: {
      const { language } = payload;
      const translations = translationsList[language];

      if (!translations) {
        return state;
      }

      return {
        language,
        translations
      };
    }

    default:
      return state;
  }
};
