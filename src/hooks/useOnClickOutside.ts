import { MutableRefObject, useEffect } from 'react';

export const useOnClickOutside = (
  ref: MutableRefObject<HTMLDivElement | null>,
  icon: MutableRefObject<HTMLDivElement | null>,
  handler: { (): void; (arg0: Event): void }
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const { target } = event;

      if (
        icon.current?.contains(target as Node) ||
        !ref.current ||
        ref.current.contains(target as Node)
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, icon, handler]);
};
