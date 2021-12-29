import React, { useReducer, createContext, useEffect, FC, Dispatch } from 'react';
import { useLocalStorage } from 'hooks';
import { initialState, reducer } from './reducers';
import { InitialStateType, Actions } from './types';
import { LanguageType } from 'types';
import * as translations from './translationsList';

export const I18nContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

export const I18nProvider: FC = ({ children }) => {
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const [state, dispatch] = useReducer(reducer, {
    language,
    translations: translations[language as LanguageType]
  });
  const { language: newLanguage } = state;

  useEffect(() => setLanguage(newLanguage), [newLanguage, setLanguage]);

  return <I18nContext.Provider value={{ state, dispatch }}>{children}</I18nContext.Provider>;
};
