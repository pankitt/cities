import { Ilink } from 'types';

export const geoSearchParams = (link: Array<Ilink>) => {
  const findCurrentQuantity = link.find(({ rel }) => rel === 'next');
  const findLastQuantity = link.find(({ rel }) => rel === 'last');

  const currentLink = new URLSearchParams(findCurrentQuantity?.href.replace('?', '?&'));
  const lastLink = new URLSearchParams(findLastQuantity?.href.replace('?', '?&'));
  const limit = currentLink.get('limit');
  const offsetCurrent = currentLink.get('offset');
  const offsetLast = lastLink.get('offset');

  return { limit, offsetCurrent, offsetLast };
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
