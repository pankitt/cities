import { Types, LanguageActionType } from './types';

export const setLanguageAction = (payload: { language: string }): LanguageActionType =>
  <LanguageActionType>{
    type: Types.SET_LANGUAGE,
    payload
  };
