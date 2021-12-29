import React, { useContext } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useI18n } from 'hooks';
import { I18nContext, setLanguageAction } from 'store/i18n';
import styles from './index.module.css';

const Language = (): JSX.Element => {
  const { t } = useI18n();
  const { state } = useContext(I18nContext);
  // TODO::
  console.log(state);

  return (
    <div>
      {t('language.name')} <AiOutlineSetting className={styles.iconSetting} />
    </div>
  );
};

export default Language;
