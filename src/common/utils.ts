import { ILink } from 'types';

export const geoSearchParams = (link: Array<ILink>) => {
  const findCurrentQuantity = link.find(({ rel }) => rel === 'next');
  const findLastQuantity = link.find(({ rel }) => rel === 'last');

  const currentLink = new URLSearchParams(findCurrentQuantity?.href.replace('?', '?&'));
  const lastLink = new URLSearchParams(findLastQuantity?.href.replace('?', '?&'));
  const limit = Number(lastLink.get('limit'));
  const offsetLast = Number(lastLink.get('offset'));
  const offsetCurrent = findCurrentQuantity
    ? Number(currentLink.get('offset'))
    : offsetLast + limit;

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
