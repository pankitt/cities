import { ILanguage } from 'types';

export enum Types {
  SET_LANGUAGE = 'SET_LANGUAGE'
}

export type InitialStateType = {
  language: string;
  translations: object;
};

export type LanguageActionType = {
  type: Types.SET_LANGUAGE;
  payload: ILanguage;
};

export type Actions = LanguageActionType;
