import React, { useContext } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useI18n } from 'hooks';
import { Dropdown } from 'common';
import { I18nContext, setLanguageAction } from 'store/i18n';
import { LANGUAGES } from 'components/Header/constants';
import styles from './index.module.css';

const Trigger = (): JSX.Element => {
  const { t } = useI18n();
  const { state } = useContext(I18nContext);
  const language = LANGUAGES.find((name: string) => name === state.language);

  return (
    <div className={styles.select}>
      <span className={styles.title}>{t(`language.${language}`)}</span>
      <AiOutlineSetting className={styles.iconSetting} />
    </div>
  );
};

const Content = (): JSX.Element => {
  const { t } = useI18n();
  const { state, dispatch } = useContext(I18nContext);

  return (
    <div className={styles.options}>
      {LANGUAGES.map((language: string) => (
        <div
          key={language}
          className={`${styles.item} ${language === state.language ? styles.active : ''}`}
          onClick={() => dispatch(setLanguageAction({ language }))}
          role="presentation"
        >
          {t(`language.${language}`)}
        </div>
      ))}
    </div>
  );
};

const Language = (): JSX.Element => <Dropdown Trigger={Trigger} Content={Content} />;

export default Language;
