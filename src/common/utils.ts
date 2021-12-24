import { ILink } from 'types';

export const geoSearchParams = (link: Array<ILink> = []) => {
  const findCurrentQuantity = link.find(({ rel }) => rel === 'next');
  const findLastQuantity = link.find(({ rel }) => rel === 'last');
  const isRegions = findLastQuantity?.href.search('regions') !== -1;

  const currentLink = new URLSearchParams(findCurrentQuantity?.href.replace('?', '?&'));
  const lastLink = new URLSearchParams(findLastQuantity?.href.replace('?', '?&'));
  const limit = Number(lastLink.get('limit'));
  const offsetLast = isRegions
    ? Number(lastLink.get('offset')) + limit * 2
    : Number(lastLink.get('offset')) + limit;
  const offsetCurrent = findCurrentQuantity ? Number(currentLink.get('offset')) : offsetLast;

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
