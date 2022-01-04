import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineHomeWork } from 'react-icons/md';
import { useI18n } from 'hooks';
import Language from './Language';
import { Page } from 'common/constants';
import styles from './index.module.css';

const Header = (): JSX.Element => {
  const { t } = useI18n();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <nav>
          <Link to={Page.HOME} className={styles.link}>
            <MdOutlineHomeWork className={styles.icon} />
          </Link>
          <NavLink
            to={Page.COUNTRIES}
            className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
          >
            {t('main.countries')}
          </NavLink>
          <NavLink
            to={Page.CITIES}
            className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
          >
            {t('main.cities')}
          </NavLink>
        </nav>
        <Language />
      </div>
    </div>
  );
};

export default Header;
