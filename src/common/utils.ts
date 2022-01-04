import { ILink } from 'types';

export const geoSearchParams = (link: Array<ILink> = []) => {
  const findCurrentQuantity = link.find(({ rel }) => rel === 'next');
  const findLastQuantity = link.find(({ rel }) => rel === 'last');

  const currentLink = new URLSearchParams(findCurrentQuantity?.href.replace('?', '?&'));
  const lastLink = new URLSearchParams(findLastQuantity?.href.replace('?', '?&'));
  const limit = Number(lastLink.get('limit'));
  const offsetLast = Number(lastLink.get('offset')) + limit * 2;
  const offsetCurrent = findCurrentQuantity ? Number(currentLink.get('offset')) : offsetLast;

  return { limit, offsetCurrent, offsetLast };
};

export const setLocalisation = (localisation: string | undefined) => {
  switch (localisation) {
    case 'de':
      return 'DE';
    case 'es':
      return 'ES';
    case 'fr':
      return 'FR';
    case 'it':
      return 'IT';
    case 'pt':
      return 'PT';
    case 'pt_BR':
      return 'BR';
    case 'ru':
      return 'RU';
    default:
      return 'GB';
  }
};

// TODO:
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
