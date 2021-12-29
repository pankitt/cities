import { ILanguage } from 'types';
import { Types, LanguageActionType } from './types';

export const setLanguageAction = (payload: ILanguage): LanguageActionType => ({
  type: Types.SET_LANGUAGE,
  payload
});
