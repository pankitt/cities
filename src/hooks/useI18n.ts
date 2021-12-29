import { useContext, useCallback } from 'react';
import { I18nContext } from 'store/i18n';

const translate =
  (translations: { [x: string]: any }) =>
  (tKey: string, ...replacers: { [p: string]: object }[]) => {
    if (!tKey) {
      return '';
    }

    const translation = translations[tKey] || tKey;
    return translation.replace(/{(\d+)}/g, (_: string, i: number) =>
      replacers[i] !== undefined ? replacers[i] : ''
    );
  };

export const useI18n = () => {
  const { state } = useContext(I18nContext);
  const { translations } = state;
  const t = useCallback(translate(translations), [translations]);

  return { t };
};
